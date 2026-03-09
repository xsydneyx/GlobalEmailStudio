import type { Meta, StoryObj } from '@storybook/react'
import { Panel } from './Panel'

export const definition: Pick<Meta<typeof Panel>, 'title' | 'tags'> = {
  title: 'Surfaces/Panel',
  tags: ['autodocs'],
}

export type Story = StoryObj<typeof Panel>
