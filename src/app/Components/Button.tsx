import React, { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const button = tv({
  base: `
        h-12
        w-[255px]
        rounded-3xl
        text-[15px]
        font-bold
        duration-300
    `,
  variants: {
    style: {
      default: `
            text-white
            bg-main-purple
            hover:bg-light-purple
        `,
      light: `
            h-10
            text-main-purple
            bg-white
            hover:text-light-purple
        `,
      destroyer: `
            h-10
            text-white
            bg-red
            hover:bg-light-red
        `,
      form: `
            h-14
            w-full
            rounded-lg
            bg-dark-gray
            text-[24px]
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
