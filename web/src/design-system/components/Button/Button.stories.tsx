import type { Meta } from '@storybook/react'
import { Button } from './Button'
import { definition, type Story } from './Button.definition'

export default {
  ...definition,
  component: Button,
} satisfies Meta<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Save',
    $variant: 'primary',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Use translated default',
    $variant: 'ghost',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Send',
    $variant: 'primary',
    disabled: true,
  },
}
