import styled from 'styled-components'

export const Tab = styled.button<{ $active?: boolean }>`
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ $active, theme }) => ($active ? theme.colors.accent : theme.colors.muted)};
  background: none;
  border: none;
  border-bottom: 2px solid ${({ $active, theme }) => ($active ? theme.colors.accent : 'transparent')};
  margin-bottom: -1px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`
