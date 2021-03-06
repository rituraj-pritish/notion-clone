import { GraphQLClient, RequestDocument } from 'graphql-request'

const URL = process.env.API_URL

export default async <T, V = Record<string, unknown>>(
	graphQlRequest: RequestDocument,
	variables?: V,
	token?: string
): Promise<T> => {
	const graphQLClient = new GraphQLClient(URL!, {
		credentials: 'include'
	})

	const requestHeaders: HeadersInit = {}

	if (token && typeof token === 'string') requestHeaders.authorization = token

	try {
		const data = await graphQLClient.request<T>(
			graphQlRequest,
			variables,
			requestHeaders
		)
		return Object.values(data)[0]
	} catch (error) {
		// @ts-expect-error todo
		const errorMessage = Object.values(error)[0].errors[0].message
		throw errorMessage
	}
}
