import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button } from '../index'
import Modal from './index'

export default {
	title: 'Atoms/modal',
	component: Modal
} as ComponentMeta<typeof Modal>

export const modal: ComponentStory<typeof Modal> = () => {
	return (
		<Modal
			render={(_, setVisibility) => <Button onClick={() => setVisibility(true)} >Modal</Button>}
		>
			<div>Content</div>
		</Modal>
	)
}
