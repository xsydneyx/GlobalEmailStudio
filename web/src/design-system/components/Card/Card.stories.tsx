import type { Meta } from '@storybook/react'
import { Card } from './Card'
import { definition, type Story } from './Card.definition'

export default {
  ...definition,
  component: Card,
} satisfies Meta<typeof Card>

export const Default: Story = {
  args: {
    children: (
      <p style={{ margin: 0, fontSize: 14 }}>
        Card content. Used for market blocks, preview blocks, etc.
      </p>
    ),
  },
}

export const Selected: Story = {
  args: {
    $selected: true,
    children: (
      <p style={{ margin: 0, fontSize: 14 }}>
        This card is in a selected state (e.g. "Include" checked).
      </p>
    ),
  },
}

export const WithHeading: Story = {
  args: {
    children: (
      <>
        <div>
          <strong>Global Market Soho</strong> <span>(London)</span>
        </div>
        <p style={{ margin: 0, fontSize: 12, color: '#808249' }}>
          United Kingdom · EN · GBP · Europe/London
        </p>
      </>
    ),
  },
}
