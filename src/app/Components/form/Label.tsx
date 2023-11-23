import { LabelHTMLAttributes } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const label = tv({
  base: `text-medium-gray dark:text-white text-[12px] leading-[15px] font-bold`,
})

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> &
  VariantProps<typeof label>

export function Label({ className, ...props }: LabelProps) {
  return <label className={label({ className })} {...props} />
}
