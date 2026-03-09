import styled from 'styled-components'

const chevronDownSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='currentColor' d='M2 5l4 3 4-3'/%3E%3C/svg%3E")`

export const Select = styled.select`
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  background-color: ${({ theme }) => theme.colors.inputBg};
  background-image: ${chevronDownSvg};
  background-repeat: no-repeat;
  background-size: 12px 12px;
  background-position: right 10px center;
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 6px 10px 6px 10px;
  padding-right: 32px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`
