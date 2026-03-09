import styled from 'styled-components'

export const Card = styled.article<{ $selected?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  background: ${({ theme }) => theme.colors.surfaceOverlay};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space[3]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
  outline: ${({ $selected, theme }) =>
    $selected ? `2px solid ${theme.colors.accent}` : 'none'};
  outline-offset: 1px;
  min-width: 0;
`
