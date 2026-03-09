import type { Meta } from '@storybook/react'
import { Checkbox } from './Checkbox'
import { definition, type Story } from './Checkbox.definition'

export default {
  ...definition,
  component: Checkbox,
} satisfies Meta<typeof Checkbox>

export const Unchecked: Story = {
  args: {},
}

export const Checked: Story = {
  args: {
    checked: true,
  },
}

export const WithLabel: Story = {
  args: {
    defaultChecked: true,
    children: 'Include this market',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
}
