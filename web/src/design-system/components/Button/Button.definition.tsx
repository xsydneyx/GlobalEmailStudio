import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

export const definition: Pick<Meta<typeof Button>, 'title' | 'tags' | 'argTypes'> = {
  title: 'Forms/Button',
  tags: ['autodocs'],
  argTypes: {
    $variant: {
      control: 'select',
      options: ['primary', 'ghost'],
      description: 'Visual variant',
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
}

export type Story = StoryObj<typeof Button>
