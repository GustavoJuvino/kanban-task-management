import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const input = tv({
  base: `
        h-14
        w-full
        rounded-lg
        border-[1px]
        border-medium-gray
        bg-transparent
        pl-4
        text-[18px]
        font-bold
        text-white
        outline-none
        duration-300
        focus:border-main-purple
    `,
})

type InputStyleProps = ComponentProps<'input'> & VariantProps<typeof input>

export function Input({ className, ...props }: InputStyleProps) {
  return <input {...props} className={input({ className })} />
}
