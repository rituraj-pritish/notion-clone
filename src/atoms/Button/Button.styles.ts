import styled, { css } from 'styled-components'

type StyledButtonProps = {
	bold?: boolean
	isIcon?: boolean
}
export const StyledButton = styled.button<StyledButtonProps>`
	cursor: pointer;
	background: transparent;
	border: none;
	border-radius: 4px;
	padding: 6px 8px;
	font-weight: ${({ bold }) => bold && 600};
	&:hover {
		background: #efefef;
	}
  &:active {
    background: #37352f29;
  }

  ${({isIcon}) => isIcon && css`
    display: flex;
    align-items: center;
    padding: 0;
    justify-content: center;
    font-size: 18px;
    height: 27px;
    width: 27px;
  `};
`
