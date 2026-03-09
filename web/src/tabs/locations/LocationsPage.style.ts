import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
`

export const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
`

export const HeaderTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`

export const H3 = styled.h3`
  margin: 0;
  font-size: 14px;
`

export const Sub = styled.p`
  margin: 4px 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`

export const Badge = styled.span`
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceOverlay};
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 6px 10px;
  font-size: 12px;
  white-space: nowrap;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[3]};

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

export const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
`

export const CardTitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`

export const Store = styled.div`
  font-weight: 700;
`

export const StoreCity = styled.span`
  font-weight: inherit;
`

export const FieldBlock = styled.div`
  display: flex;
  flex-direction: column;
`

export const Meta = styled.div`
  margin-top: 2px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`

export const ErrorMessage = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.subtle};
`

export const UseLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  user-select: none;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`
