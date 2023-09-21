import React, { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const button = tv({
  base: `
        h-10
        rounded-3xl
        text-[13px]
        font-bold
        duration-300
    `,
  variants: {
    style: {
      default: `
            w-full
            text-white
            bg-main-purple
            hover:bg-light-purple
        `,
      light: `
            w-full
            h-10
            text-main-purple
            bg-white
            hover:text-light-purple
        `,
      destroyer: `
            w-[200px]
            h-10
            text-white
            bg-red
            hover:bg-light-red
        `,
      form: `
            sm:h-14
            h-12
            w-full
            rounded-lg
            bg-dark-gray
            small-mobile:text-[20px]
            text-[14px]
            font-bold
            text-medium-gray
            hover:bg-very-dark-gray
            hover:text-white
        `,
    },
  },
  defaultVariants: {
    style: 'default',
  },
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

const Button = ({ style, className, ...props }: ButtonProps) => {
  return (
    <button
      className={button({
        style,
        className,
      })}
      {...props}
    />
  )
}

export default Button
