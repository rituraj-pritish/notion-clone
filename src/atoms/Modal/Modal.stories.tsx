import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button, Space } from '..'
import Modal from './index'

export default {
	title: 'Atoms/modal',
	component: Modal
} as ComponentMeta<typeof Modal>

const { ModalTrigger, ModalContent, ModalPopover } = Modal

export const modal: ComponentStory<typeof Modal> = () => {
	return (
		<>
			<Modal>
				<ModalTrigger>
					<Button variant='primary' size='small'>
						Trigger
					</Button>
				</ModalTrigger>
				<ModalContent>
					<div>Content</div>
				</ModalContent>
			</Modal>
			<Space direction='vertical' />
			<Modal showOverlay={false}>
				<ModalTrigger>
					<Button variant='primary' size='small'>
						Without overlay
					</Button>
				</ModalTrigger>
				<ModalContent>
					<div>Content</div>
				</ModalContent>
			</Modal>
			<Space direction='vertical' />
			<Modal>
				<ModalTrigger>
					<Button variant='primary' size='small'>
						As popover
					</Button>
				</ModalTrigger>
				<ModalPopover>
					<div>Content</div>
				</ModalPopover>
			</Modal>
		</>
	)
}
