import styled from 'styled-components'

/** Vertical stack with consistent gap (default: space[3]). */
export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
`
