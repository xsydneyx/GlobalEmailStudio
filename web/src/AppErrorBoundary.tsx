import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Container, Title, SmallMuted, Button, Stack } from './design-system'

type Props = { children: ReactNode }
type State = { hasError: boolean; error: Error | null }

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('AppErrorBoundary caught an error:', error, info.componentStack)
  }

  onRetry = (): void => {
    this.setState({ hasError: false, error: null })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Container>
          <Stack>
            <Title>Something went wrong</Title>
            <SmallMuted>
              An unexpected error occurred. You can try again or refresh the page.
            </SmallMuted>
            <Button type="button" onClick={this.onRetry}>
              Try again
            </Button>
          </Stack>
        </Container>
      )
    }
    return this.props.children
  }
}
