import styled from 'styled-components'

export const Label = styled.div`
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 700;
  margin-bottom: 6px;
`
