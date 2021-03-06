import { useState } from 'react'
import { BsPencilSquare, BsStar } from 'react-icons/bs'
import { IoTrashOutline } from 'react-icons/io5'
import { useMutation } from 'react-query'

import { deletePage as deletePageEndpoint, updatePage } from '@/api/endpoints'
import { Modal } from '@/atoms'
import { Menu } from '@/components'
import onPageUpdate from '@/helpers/queryUpdaters/onPageUpdate'
import CreatedAndEditedMenuItem from '@/shared/CreatedAndEditedMenuItem'
import RenamePage from '@/shared/RenamePage'
import { Page } from '@/types/page'

interface Props extends Page {
	isInsideFavoritesGroup?: boolean
}

const SidebarPageMoreOptions = (props: Props) => {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

	const {
		id,
		hierarchy,
		favorite,
		isInsideFavoritesGroup,
		lastEdited,
		created
	} = props

	const { mutateAsync: deletePage } = useMutation(
		() => deletePageEndpoint(id),
		{
			onSuccess: ({ archived }) => onPageUpdate(id, hierarchy, { archived })
		}
	)

	const { mutateAsync: toggleFavorite } = useMutation(
		() =>
			updatePage({
				id,
				favorite: !favorite
			}),
		{
			onSuccess: () => onPageUpdate(id, hierarchy, { favorite: !favorite })
		}
	)

	const onDelete = async () => {
		await deletePage()
	}

	return (
		<>
			<Menu
				tooltip='Delete, duplicate and more...'
				placement='auto-end'
				offset={[8, -4]}
			>
				{!isInsideFavoritesGroup ? (
					<Menu.MenuItem icon={<IoTrashOutline size={20} />} onClick={onDelete}>
						Delete
					</Menu.MenuItem>
				) : (
					<></>
				)}
				<Menu.MenuItem
					onClick={() => {
						setIsModalVisible(true)
					}}
					icon={<BsPencilSquare />}
				>
					Rename
				</Menu.MenuItem>
				<Menu.MenuItem icon={<BsStar />} onClick={() => toggleFavorite()}>
					{favorite ? 'Remove from' : 'Add to'} Favorites
				</Menu.MenuItem>
				<CreatedAndEditedMenuItem created={created} lastEdited={lastEdited} />
			</Menu>
			<Modal
				onRequestClose={() => setIsModalVisible(false)}
				visible={isModalVisible}
				styles={{
					overflow: 'visible'
				}}
			>
				<Modal.ModalPopover>
					<RenamePage onEnter={() => setIsModalVisible(false)} {...props} />
				</Modal.ModalPopover>
			</Modal>
		</>
	)
}

export default SidebarPageMoreOptions
