import styled from 'styled-components'

export const Input = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  background: ${({ theme }) => theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 8px 10px;
  font-size: 12px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`
