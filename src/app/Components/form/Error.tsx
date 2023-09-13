import React, { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const error = tv({
  base: `
        text-red
        text-[13px]
        leading-[23px]
        font-medium
        mb-2
    `,
})

type ErrorProps = ComponentProps<'span'> & VariantProps<typeof error>

export const Error = ({ className, ...props }: ErrorProps) => {
  return <span {...props} className={error({ className })} />
}
