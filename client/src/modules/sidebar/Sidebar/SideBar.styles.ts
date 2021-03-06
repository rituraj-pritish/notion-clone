import { darken } from 'polished'
import { ResizableBox } from 'react-resizable'
import styled, { css } from 'styled-components'

import theme from '@/theme'

const greyHoverBg = '#efefef'
const hoverBg = darken(0.05, '#F7F6F3')
const color = '#8A8883'

interface RootWrapperProps {
	isCollapsed?: boolean
	width: number
	isHovering?: boolean
}

export const RootWrapper = styled(ResizableBox)<RootWrapperProps>`
	min-height: 100vh;
	background: #f7f6f3;
	position: relative;
	transition: width 0.3s ease-in-out;
`

export const Content = styled.div<RootWrapperProps>`
	height: 100%;
	display: flex;
	flex-direction: column;
	background: transparent;
	transition: all 0.2s;

	${({ isCollapsed, width, isHovering }) =>
		isCollapsed &&
		css`
			background: white;
			width: ${width + 'px'};
			position: absolute;
			height: 80%;
			box-shadow: ${theme.boxShadow};
			bottom: 50%;
			transform: ${`translate(${isHovering ? 0 : '-100%'}, 50%)`};
		`};
`

export const Trigger = styled.div`
	content: '';
	background: transparent;
	height: calc(100% - 56px);
	position: absolute;
	right: 0;
	width: 50px;
	top: 56px;
	transform: translateX(100%);
`

export const Handle = styled.div`
	position: absolute;
	cursor: col-resize;
	background: transparent;
	right: 0;
	top: 0;
	height: 100%;
	width: 2px;

	&:hover {
		background: #deddd9;
	}
`

export const SidebarHeaderWrapper = styled.div`
	padding: 12px 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: black;

	button {
		background: inherit;
		color: ${color};

		&:hover {
			background: ${darken(0.05, hoverBg)};
		}
	}
`

interface SidebarItemProps {
	isCollapsed: boolean
	isActive?: boolean
}

export const SidebarItemWrapper = styled.div<SidebarItemProps>`
	color: ${color};
	cursor: pointer;

	& * {
		color: ${color};
	}

	button {
		&:hover {
			background: ${({ isCollapsed }) =>
				darken(0.05, isCollapsed ? greyHoverBg : hoverBg)};
		}
	}

	&:hover {
		background: ${({ isCollapsed }) => (isCollapsed ? greyHoverBg : hoverBg)};
	}

	${({ isActive, isCollapsed }) =>
		isActive &&
		css`
			background: ${isCollapsed ? greyHoverBg : hoverBg};
			font-weight: 500;
		`};
`

export const NewPage = styled.div`
	display: flex;
	align-items: center;
	padding: 8px 16px;
	border-top: 1px solid #e6e5e0;
	font-weight: 600;

	svg {
		font-size: 26px;
		margin-right: 12px;
	}
`

export const SidebarPagesWrapper = styled.div`
	height: calc(100% - 166px);
	overflow-y: auto;
`
