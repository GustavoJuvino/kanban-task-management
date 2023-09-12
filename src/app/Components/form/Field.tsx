import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const field = tv({
  base: `
        flex
        flex-col
    `,
})

type FieldProps = ComponentProps<'fieldset'> & VariantProps<typeof field>

export function Field({ className, ...props }: FieldProps) {
  return <fieldset {...props} className={field({ className })} />
}
