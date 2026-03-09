import styled from 'styled-components'

export const TabBar = styled.nav`
  display: flex;
  align-items: center;
  gap: 0;
  margin-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.inputBorder};
`
