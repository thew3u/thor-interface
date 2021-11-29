import {styled} from '@mui/material'
import React from 'react'
import InputUnstyled, {InputUnstyledProps} from '@mui/base/InputUnstyled'

const StyledInputElement = styled('input')`
  width: 100%;
  background: rgb(244, 246, 248);
  border: 1px solid rgb(244, 246, 248);
  border-radius: 4px;
  padding: 12px 24px;
  color: #20262d;
  transition: width 300ms ease;
  font-size: 16px;

  &:hover {
    background: rgb(244, 246, 250);
  }

  &:focus {
    outline: none;
    transition: width 200ms ease-out;
  }
`

const CustomInput = React.forwardRef(function CustomInput(
  props: InputUnstyledProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return <InputUnstyled components={{Input: StyledInputElement}} {...props} ref={ref} />
})

export default function UnstyledInput(props: InputUnstyledProps) {
  return <CustomInput style={{flexGrow: 1, flexShrink: 0}} {...props} />
}
