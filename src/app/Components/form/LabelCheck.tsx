import { LabelHTMLAttributes } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const labelCheck = tv({
  base: `                  
        flex
        h-auto
        w-full
        select-none
        cursor-pointer
        gap-x-4
        rounded-[4px]
        bg-very-dark-gray
        py-3
        pl-4
        text-body-m
        text-[12px]
        leading-[15px]
        font-bold
        text-white
        text-opacity-50
        duration-300
        hover:bg-main-purple
        hover:bg-opacity-25
    `,
})

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> &
  VariantProps<typeof labelCheck>

export function LabelCheck({ className, ...props }: LabelProps) {
  return <label className={labelCheck({ className })} {...props} />
}
