import styled from 'styled-components'

export const PanelTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.space[3]};
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`
