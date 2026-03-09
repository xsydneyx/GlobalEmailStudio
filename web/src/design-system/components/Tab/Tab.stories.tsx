import type { Meta } from '@storybook/react'
import { Tab, TabBar, TabStepArrow } from '../..'
import { definition, type Story } from './Tab.definition'

export default {
  ...definition,
  component: Tab,
} satisfies Meta<typeof Tab>

export const Inactive: Story = {
  args: {
    children: 'Markets & overrides',
    $active: false,
  },
}

export const Active: Story = {
  args: {
    children: 'Campaign template',
    $active: true,
  },
}

export const TabBarPattern: Story = {
  render: () => (
    <TabBar>
      <Tab type="button" $active>
        Campaign template
      </Tab>
      <TabStepArrow aria-hidden>›</TabStepArrow>
      <Tab type="button" $active={false}>
        Markets & overrides
      </Tab>
      <TabStepArrow aria-hidden>›</TabStepArrow>
      <Tab type="button" $active={false}>
        Localized preview & send
      </Tab>
    </TabBar>
  ),
}
