import styled from 'styled-components'

export const Chip = styled.span<{ $tone?: 'default' | 'warn' }>`
  border: 1px solid
    ${({ $tone, theme }) =>
      $tone === 'warn' ? theme.colors.warnBorder : theme.colors.inputBorder};
  background: ${({ $tone, theme }) =>
    $tone === 'warn' ? theme.colors.warnBg : theme.colors.inputBg};
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 4px 8px;
  font-size: 11px;
  white-space: nowrap;
`
