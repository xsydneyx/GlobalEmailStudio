import styled from 'styled-components'

export const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  flex-wrap: wrap;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 12px;
`
