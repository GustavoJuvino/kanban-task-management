import { ComponentProps } from 'react'

type FieldProps = ComponentProps<'fieldset'>

export function Field({ ...props }: FieldProps) {
  return <fieldset {...props} />
}
