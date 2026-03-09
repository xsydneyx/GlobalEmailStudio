import { useState } from 'react'
import styled from 'styled-components'

const size = 18

const NativeInput = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  inset: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`

const Box = styled.span<{ $checked: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${size}px;
  height: ${size}px;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme, $checked }) =>
    $checked ? theme.colors.accent : theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.accentText};
  font-size: 12px;
  line-height: 1;
  transition: background 0.15s ease, border-color 0.15s ease;
`

const Wrapper = styled.label<{ $disabled?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  user-select: none;

  ${NativeInput}:focus-visible + ${Box} {
    outline: ${({ theme }) => theme.a11y.focusRingWidth} solid
      ${({ theme }) => theme.colors.focusRing};
    outline-offset: ${({ theme }) => theme.a11y.focusRingOffset};
  }

  ${NativeInput}:disabled + ${Box} {
    opacity: 0.6;
    cursor: default;
  }
`

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'size' | 'children'
  > {
  /** Optional label (rendered after the box). Use children or aria-label for a11y. */
  children?: React.ReactNode
}

export const Checkbox = ({
  children,
  className,
  style,
  checked: controlledChecked,
  defaultChecked,
  onChange,
  ...inputProps
}: CheckboxProps) => {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(
    defaultChecked ?? false,
  )
  const isControlled = controlledChecked !== undefined
  const checked = isControlled ? controlledChecked : uncontrolledChecked

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolledChecked(e.target.checked)
    onChange?.(e)
  }

  return (
    <Wrapper $disabled={inputProps.disabled} className={className} style={style}>
      <NativeInput
        checked={isControlled ? controlledChecked : undefined}
        defaultChecked={isControlled ? undefined : defaultChecked}
        onChange={handleChange}
        {...inputProps}
      />
      <Box $checked={!!checked} aria-hidden>
        {checked ? '✓' : null}
      </Box>
      {children}
    </Wrapper>
  )
}
