import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

export const definition: Pick<Meta<typeof Checkbox>, 'title' | 'tags' | 'argTypes'> = {
  title: 'Forms/Checkbox',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
}

export type Story = StoryObj<typeof Checkbox>
