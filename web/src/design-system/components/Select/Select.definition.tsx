import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

export const definition: Pick<Meta<typeof Select>, 'title' | 'tags' | 'argTypes'> = {
  title: 'Forms/Select',
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
  },
}

export type Story = StoryObj<typeof Select>
