import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './Label'

export const definition: Pick<Meta<typeof Label>, 'title' | 'tags' | 'argTypes'> = {
  title: 'Forms/Label',
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
  },
}

export type Story = StoryObj<typeof Label>
