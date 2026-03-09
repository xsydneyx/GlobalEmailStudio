import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1152px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space[6]};

  @media (max-width: 640px) {
    padding: ${({ theme }) => theme.space[4]};
  }
`
