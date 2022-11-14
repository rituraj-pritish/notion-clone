import React, { ButtonHTMLAttributes, HTMLProps, ReactNode } from 'react'
import { StyledButton } from './Button.styles'

type IconButtonProps = {
  children?: never
  icon?: ReactNode
  bold?: never
} & ButtonHTMLAttributes<HTMLButtonElement>
type ButtonProps = {
  children?: ReactNode
  bold?: boolean
  icon?: never
} & ButtonHTMLAttributes<HTMLButtonElement>

type Props = IconButtonProps | ButtonProps

const Button = ({ children, bold, icon }: Props) => {
  if(icon) return (
    <StyledButton isIcon={!!icon}>{icon}</StyledButton>
  )
  return (
    <StyledButton bold={bold}>{children}</StyledButton>
  )
}

export default Button