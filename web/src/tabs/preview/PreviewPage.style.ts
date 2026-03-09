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

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
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

export const Placeholder = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceOverlay};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space[4]};
`

export const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[3]};

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`

export const CardHeader = styled.div`
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
  color: ${({ theme }) => theme.colors.text};
`

export const StoreCity = styled.span`
  font-weight: inherit;
`

export const Meta = styled.div`
  margin-top: 2px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`

export const Block = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceOverlay};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.space[3]};
`

export const EmailFieldBlock = styled.div`
  display: flex;
  flex-direction: column;
`

export const BodyFieldBlock = styled.div`
  margin-top: ${({ theme }) => theme.space[3]};
  display: flex;
  flex-direction: column;
`

export const Subject = styled.div`
  margin-top: 6px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

export const Body = styled.pre`
  margin-top: 6px;
  font-size: 12px;
  white-space: pre-wrap;
  overflow: auto;
  max-height: 220px;
  color: ${({ theme }) => theme.colors.text};
`

export const Success = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.successBorder};
  background: ${({ theme }) => theme.colors.successBg};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space[3]};
  font-size: 12px;
`

export const SuccessTitle = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

export const SuccessHint = styled.div`
  margin-top: ${({ theme }) => theme.space[2]};
  opacity: 0.85;
  color: ${({ theme }) => theme.colors.text};
`
