import type { Meta } from '@storybook/react'
import { Input } from './Input'
import { Label } from '../..'
import { definition, type Story } from './Input.definition'

export default {
  ...definition,
  component: Input,
} satisfies Meta<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Enter subject…',
    type: 'text',
  },
}

export const WithLabel: Story = {
  render: (args) => (
    <div>
      <Label>Subject override</Label>
      <Input {...args} />
    </div>
  ),
  args: {
    placeholder: 'Leave empty to use default',
  },
}

export const ReadOnly: Story = {
  args: {
    defaultValue: 'Welcome to {storeName} in {city}',
    readOnly: true,
  },
}
