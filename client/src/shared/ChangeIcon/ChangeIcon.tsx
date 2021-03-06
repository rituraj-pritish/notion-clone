import { BaseEmoji, emojiIndex } from 'emoji-mart'
import _random from 'lodash/random'
import { useRouter } from 'next/router'
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { AiOutlineFile } from 'react-icons/ai'
import { FiFileText } from 'react-icons/fi'
import { VscSmiley } from 'react-icons/vsc'
import { useMutation } from 'react-query'

import { updatePage } from '@/api/endpoints'
import { Button, Flex, IconButton, Popover } from '@/atoms'
import { EmojiPicker } from '@/components'
import onPageUpdate from '@/helpers/queryUpdaters/onPageUpdate'
import { Page } from '@/types/page'

const getRandomEmoji = () => {
	const emojis = Object.values(emojiIndex.emojis)
	//@ts-expect-error type mismatch
	return emojis[_random(0, emojis.length - 1)].native
}

interface Props extends Page {
	iconSize?: 'small' | 'medium' | 'large'
	haveChildren?: boolean
	bordered?: boolean
}

interface Handle {
	setRandomEmoji: VoidFunction
}

const { Title, Trigger, Content } = Popover

const ChangeIcon = React.forwardRef(
	(
		{ icon, id, hierarchy, iconSize = 'small', haveChildren, bordered }: Props,
		ref?: React.Ref<Handle>
	) => {
		const [emoji, setEmoji] = useState<string | undefined>(() =>
			icon && 'emoji' in icon ? icon.emoji : undefined
		)
		const router = useRouter()
		const popoverRef = useRef<React.ElementRef<typeof Popover>>(null)

		useEffect(() => {
			if (icon && 'emoji' in icon) {
				setEmoji(icon.emoji)
			}
		}, [icon])

		const { mutateAsync } = useMutation(
			(newIcon?: string | undefined) =>
				updatePage({
					id,
					icon: newIcon
						? {
								type: 'EMOJI',
								emoji: newIcon
						  }
						: null
				}),
			{
				onSuccess: ({ icon }) => {
					// refresh server side props
					router.replace(router.asPath)
					onPageUpdate(id, hierarchy, { icon })
				}
			}
		)

		const onRandomClick = async () => {
			try {
				const randomEmoji = getRandomEmoji()
				await mutateAsync(randomEmoji)
				setEmoji(randomEmoji)
				popoverRef.current?.close()
			} catch (error) {
				console.log('e', error)
			}
		}

		const onRemoveClick = async () => {
			try {
				await mutateAsync(undefined)
				setEmoji('')
				popoverRef.current?.close()
			} catch (error) {
				console.log('e', error)
			}
		}

		const title = (
			<Flex justifyContent='flex-end' p={1}>
				<Button
					size='small'
					variant='tertiary'
					ghost
					leftIcon={VscSmiley}
					onClick={onRandomClick}
				>
					Random
				</Button>
				<Button size='small' variant='tertiary' ghost onClick={onRemoveClick}>
					Remove
				</Button>
			</Flex>
		)

		const renderIcon = () => {
			if (emoji) return emoji
			return haveChildren ? <FiFileText /> : <AiOutlineFile />
		}

		useImperativeHandle(ref, () => ({
			setRandomEmoji: onRandomClick
		}))

		return (
			<Popover ref={popoverRef} placement='bottom'>
				<Trigger>
					<IconButton size={iconSize} tooltip='Change icon' bordered={bordered}>
						{renderIcon()}
					</IconButton>
				</Trigger>
				<Title>{title}</Title>
				<Content>
					<EmojiPicker
						emojiTooltip
						onSelect={async ({ native }: BaseEmoji) => {
							await mutateAsync(native)
							setEmoji(native)
							popoverRef.current?.close()
						}}
						i18n={{
							search: 'Filter...'
						}}
						showPreview={false}
					/>
				</Content>
			</Popover>
		)
	}
)

export default ChangeIcon
