import styled from 'styled-components'

export const Button = styled.button<{ $variant?: 'primary' | 'ghost' }>`
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  background: ${({ $variant, theme }) =>
    $variant === 'primary' ? theme.colors.accent : theme.colors.inputBg};
  color: ${({ $variant, theme }) =>
    $variant === 'primary' ? theme.colors.accentText : theme.colors.text};
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    filter: brightness(0.98);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`
