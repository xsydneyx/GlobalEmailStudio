import type { Meta } from '@storybook/react'
import { Select } from './Select'
import { Label } from '../..'
import { definition, type Story } from './Select.definition'

export default {
  ...definition,
  component: Select,
} satisfies Meta<typeof Select>

export const Default: Story = {
  args: {
    children: (
      <>
        <option value="en">EN</option>
        <option value="de">DE</option>
        <option value="da">DA</option>
      </>
    ),
    defaultValue: 'en',
  },
}

export const WithLabel: Story = {
  render: (args) => (
    <div>
      <Label>Default template language</Label>
      <Select {...args} />
    </div>
  ),
  args: {
    children: (
      <>
        <option value="en">EN</option>
        <option value="de">DE</option>
        <option value="da">DA</option>
      </>
    ),
    defaultValue: 'en',
  },
}
