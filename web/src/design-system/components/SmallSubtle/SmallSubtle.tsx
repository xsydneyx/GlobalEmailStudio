import styled from 'styled-components'

/** Small body text in subtle color (e.g. error message, secondary hint). */
export const SmallSubtle = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.subtle};
`
