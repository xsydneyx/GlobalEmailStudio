import styled from 'styled-components'

/** Inline muted label text (e.g. next to selects in a control row). */
export const InlineMuted = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`
