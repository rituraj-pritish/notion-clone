import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { TbPlus } from 'react-icons/tb'

import Button from './Button';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Atoms/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const Buttons = () => (
  <>
    <Button>Button</Button>
    <Button bold>Bold</Button>
    <Button icon={<TbPlus />}/>
  </>
)