import { AuthenticationError } from 'apollo-server-errors'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User, UserModel } from '../../models/user.model'
import { UserInput } from './user.types'
import Context from '../../types/Context'
import { WorkspaceModel } from '../../models/workspace.model'
import { PageModel } from '../../models/page.model'

const signToken = (user: User) => {
	return jwt.sign(
		{
			user: user.id,
			name: user.name,
			email: user.email,
			workspace: user.currentWorkspace
		},
		process.env.JWT_SECRET!,
		{ expiresIn: '10days' }
	)
}

@Resolver()
export class UsersResolver {
	@Query(() => User)
	async signin(
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Ctx() ctx: Context
	): Promise<User> {
		const user = await UserModel.findOne({ email })

		if (!user) throw new AuthenticationError('Invalid Credentials')

		const isPasswordCorrect = await bcrypt.compare(
			password.toString(),
			user.password
		)
		if (!isPasswordCorrect) throw new AuthenticationError('Invalid Credentials')
		const token = signToken(user)

		ctx.res.cookie('auth_token', token)

		return user
	}

	@Mutation(() => User)
	async signup(
		@Arg('newUserInput') { password, email, name }: UserInput,
		@Ctx() ctx: Context
	): Promise<User> {
		const existingUser = await UserModel.findOne({ email })

		if (existingUser) throw new AuthenticationError('User already exists')

		const hashed = await bcrypt.hash(password, 10)

		const user = await UserModel.create({
			email,
			name,
			password: hashed
		})

		const workspace = await WorkspaceModel.create({
			users: [
				{
					user: user.id,
					role: 'ADMIN'
				}
			]
		})

		await PageModel.create({
			properties: {
				title: 'Getting Started'
			},
			parent: {
				type: 'WORKSPACE',
				id: workspace.id
			}
		})

		await user.update({
			workspaces: [workspace.id],
			currentWorkspace: workspace.id
		})
		await user.save()

		const token = signToken(user)

		ctx.res.cookie('auth_token', token)

		return user
	}

	@Query(() => Boolean)
	async logout(@Ctx() ctx: Context): Promise<boolean> {
		ctx.res.clearCookie('auth_token')
		return true
	}
}
