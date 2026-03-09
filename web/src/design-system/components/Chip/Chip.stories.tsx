import type { Meta } from '@storybook/react'
import { Chip } from './Chip'
import { definition, type Story } from './Chip.definition'

export default {
  ...definition,
  component: Chip,
} satisfies Meta<typeof Chip>

export const Default: Story = {
  args: {
    children: 'HQ default',
    $tone: 'default',
  },
}

export const Warn: Story = {
  args: {
    children: 'Override',
    $tone: 'warn',
  },
}

export const Count: Story = {
  args: {
    children: '3 of 5 selected',
    $tone: 'default',
  },
}
