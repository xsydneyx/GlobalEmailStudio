import type { Meta, StoryObj } from '@storybook/react'
import { Tab } from './Tab'

export const definition: Pick<Meta<typeof Tab>, 'title' | 'tags' | 'argTypes'> = {
  title: 'Navigation/Tab',
  tags: ['autodocs'],
  argTypes: {
    $active: { control: 'boolean', description: 'Active tab state' },
  },
}

export type Story = StoryObj<typeof Tab>
