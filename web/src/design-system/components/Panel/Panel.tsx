import styled from 'styled-components'

export const Panel = styled.section`
  background: ${({ theme }) => theme.colors.panelBg};
  border: 1px solid ${({ theme }) => theme.colors.panelBorder};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadow.panel};
  padding: ${({ theme }) => theme.space[4]};
  min-width: 0;
`
