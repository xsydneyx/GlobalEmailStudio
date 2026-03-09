import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

export const definition: Pick<Meta<typeof Card>, 'title' | 'tags' | 'argTypes'> = {
  title: 'Surfaces/Card',
  tags: ['autodocs'],
  argTypes: {
    $selected: { control: 'boolean', description: 'Selected state (e.g. market card)' },
  },
}

export type Story = StoryObj<typeof Card>
