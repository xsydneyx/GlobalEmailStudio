import type { Meta, StoryObj } from '@storybook/react'
import { Chip } from './Chip'

export const definition: Pick<Meta<typeof Chip>, 'title' | 'tags' | 'argTypes'> = {
  title: 'Surfaces/Chip',
  tags: ['autodocs'],
  argTypes: {
    $tone: {
      control: 'select',
      options: ['default', 'warn'],
      description: 'Default (neutral) or warn (override/caution)',
    },
    children: { control: 'text' },
  },
}

export type Story = StoryObj<typeof Chip>
