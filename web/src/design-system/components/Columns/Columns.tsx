import styled from 'styled-components'

export const Columns = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1.65fr) minmax(0, 2fr);
  gap: ${({ theme }) => theme.space[4]};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`
