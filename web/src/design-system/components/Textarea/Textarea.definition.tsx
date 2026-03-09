import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './Textarea'

export const definition: Pick<Meta<typeof Textarea>, 'title' | 'tags' | 'argTypes'> = {
  title: 'Forms/Textarea',
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    rows: { control: 'number' },
  },
}

export type Story = StoryObj<typeof Textarea>
