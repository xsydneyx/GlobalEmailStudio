import type { Meta } from '@storybook/react'
import { Panel, PanelTitle } from '../..'
import { definition, type Story } from './Panel.definition'

export default {
  ...definition,
  component: Panel,
} satisfies Meta<typeof Panel>

export const Default: Story = {
  args: {
    children: (
      <>
        <PanelTitle>Section title</PanelTitle>
        <p style={{ margin: 0, fontSize: 14 }}>
          Panel content goes here. Used for structured blocks with border and background.
        </p>
      </>
    ),
  },
}

export const WithForm: Story = {
  args: {
    children: (
      <>
        <PanelTitle>Settings</PanelTitle>
        <p style={{ margin: '0 0 12px', fontSize: 12, color: '#808249' }}>
          Optional description.
        </p>
        <input
          type="text"
          placeholder="Input inside panel"
          style={{
            width: '100%',
            padding: '8px 10px',
            border: '1px solid #321F12',
            borderRadius: 12,
            fontSize: 12,
          }}
        />
      </>
    ),
  },
}
