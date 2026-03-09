import styled from 'styled-components'

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
`

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
`

export const Row = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
`

export const H3 = styled.h3`
  margin: 0;
  font-size: 14px;
`

export const Count = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const ListItem = styled.li`
  margin: 0;
  padding: 0;
`

export const TemplateButton = styled.button<{ $active: boolean }>`
  width: 100%;
  text-align: left;
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  background: ${({ $active, theme }) => ($active ? theme.colors.inputBg : 'transparent')};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 10px 12px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.inputBg};
  }
`

export const TemplateId = styled.div`
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 700;
`

export const TemplateName = styled.div`
  margin-top: 2px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

export const DetailsCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceOverlay};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space[3]};
`

export const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[3]};

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

export const Cell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const Mono = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceOverlay};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.space[3]};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 12px;
  overflow: auto;
`

export const MonoPre = styled(Mono).attrs({ as: 'pre' })`
  white-space: pre-wrap;
  max-height: 16rem;
`

export const Muted = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`

export const SaveSuccessMessage = styled.p`
  margin: 0;
  font-size: 12px;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  background: ${({ theme }) => theme.colors.successBg};
  border: 1px solid ${({ theme }) => theme.colors.successBorder};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text};
`

export const DefaultNote = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  background: ${({ theme }) => theme.colors.accentMuted};
  border: 1px solid ${({ theme }) => theme.colors.accentMutedBorder};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 12px;
`

export const DefaultLabel = styled.span`
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`

export const DefaultTag = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`
