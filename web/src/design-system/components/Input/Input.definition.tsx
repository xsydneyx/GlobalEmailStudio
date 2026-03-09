import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

export const definition: Pick<Meta<typeof Input>, 'title' | 'tags' | 'argTypes'> = {
  title: 'Forms/Input',
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    type: { control: 'text' },
  },
}

export type Story = StoryObj<typeof Input>
