import type { Meta } from '@storybook/react'
import { Textarea } from './Textarea'
import { Label } from '../..'
import { definition, type Story } from './Textarea.definition'

export default {
  ...definition,
  component: Textarea,
} satisfies Meta<typeof Textarea>

export const Default: Story = {
  args: {
    placeholder: 'Enter body…',
    rows: 4,
  },
}

export const WithLabel: Story = {
  render: (args) => (
    <div>
      <Label>Body override</Label>
      <Textarea {...args} />
    </div>
  ),
  args: {
    placeholder: 'Leave empty to use default body',
    rows: 4,
  },
}
