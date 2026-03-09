import styled from 'styled-components'

export const TabStepArrow = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0 10px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.subtle};
  opacity: 0.85;
  user-select: none;
  line-height: 1;
  letter-spacing: -0.02em;
`
