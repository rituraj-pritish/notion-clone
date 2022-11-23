import React, { useEffect, useState } from 'react'
import ReactModal, { Props as ModalProps, Styles } from 'react-modal'

import useMousePosition from '@/hooks/useMousePosition'
import theme from '@/theme'

type ChildrenProp = { children: React.ReactElement }

export interface Props extends Omit<ModalProps, 'isOpen' | 'style'> {
	onOpen?: () => void
	onClose?: () => void
	visible?: boolean
	showOverlay?: boolean
	styles?: React.CSSProperties
}

const baseStyles: Styles = {
	overlay: {
		background: 'rgba(0, 0, 0, 0.4)'
	},
	content: {
		border: 'none',
		borderRadius: theme.borderRadius,
		padding: 0
	}
}
const noOverlayStyles: Styles = {
	...baseStyles,
	overlay: {
		background: 'transparent'
	},
	content: {
		...baseStyles.content,
		boxShadow: theme.boxShadow
	}
}
const popoverStyles: Styles = {
	...noOverlayStyles,
	content: {
		...noOverlayStyles.content,
		width: 'fit-content',
		height: 'fit-content'
	}
}
const getStyles = (
	{
		showOverlay,
		useAsPopover
	}: {
		showOverlay?: boolean
		useAsPopover?: boolean
	},
	override: React.CSSProperties | undefined
) => {
	let styles = baseStyles
	if (useAsPopover === true) styles = popoverStyles
	if (showOverlay === false) styles = noOverlayStyles
	if (override) {
		styles = { ...styles, content: { ...styles.content, ...override } }
	}
	return styles
}

const ModalContent = ({ isVisible, closeModal, children, ...props }: ChildrenProp) => {
	return (
		<ReactModal
			isOpen={isVisible}
			shouldCloseOnEsc
			shouldCloseOnOverlayClick
			onRequestClose={closeModal}
			style={getStyles(
				{
					showOverlay: props.showOverlay
				},
				props.styles
			)}
			{...props}
		>
			{children}
		</ReactModal>
	)
}

const ModalPopover = ({ isVisible, children, closeModal, ...props }: ChildrenProp) => {
	const mousePosition = useMousePosition()
	const [modalPosition, setModalPosition] = useState({})

	const styles = React.useMemo(
		() =>
			getStyles(
				{
					useAsPopover: true
				},
				{ ...props.styles, ...modalPosition }
			),
		[modalPosition]
	)


	return (
		<ReactModal
			isOpen={isVisible}
			shouldCloseOnEsc
			shouldCloseOnOverlayClick
			onRequestClose={closeModal}
			onAfterOpen={() => {
				setModalPosition({ top: mousePosition.y, left: mousePosition.x })
				if (props.onOpen) props.onOpen()
			}}
			{...props}
			style={styles}
		>
			{children}
		</ReactModal>
	)
}

const Modal = ({ render, children, visible, ...otherProps }: Props) => {
	const [isVisible, setIsVisible] = useState(() =>
		typeof visible === 'boolean' ? visible : false
	)

	useEffect(() => {
		if (typeof visible === 'boolean') setIsVisible(visible)
	}, [visible])

	const closeModal = () => setIsVisible(false)
	const openModal = () => setIsVisible(true)

	return (
		<div onClick={(e) => e.stopPropagation()}>
			{React.cloneElement(render, {
				onClick: () => {
					if (typeof render.props.onClick === 'function') render.props.onClick()
					if (isVisible) return closeModal()
					openModal()
				}
	})}
			{children}
		</div>
	)
}

export default Modal
