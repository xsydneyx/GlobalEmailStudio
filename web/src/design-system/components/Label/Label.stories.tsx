import type { Meta } from '@storybook/react'
import { Label } from './Label'
import { definition, type Story } from './Label.definition'

export default {
  ...definition,
  component: Label,
} satisfies Meta<typeof Label>

export const Default: Story = {
  args: {
    children: 'Subject',
  },
}

export const FieldLabel: Story = {
  args: {
    children: 'Body override',
  },
}

export const SectionLabel: Story = {
  args: {
    children: 'Template details',
  },
}
