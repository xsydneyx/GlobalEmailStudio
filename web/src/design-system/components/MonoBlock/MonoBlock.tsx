import styled from 'styled-components'

export const MonoBlock = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceOverlay};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.space[3]};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 12px;
  overflow: auto;
`
