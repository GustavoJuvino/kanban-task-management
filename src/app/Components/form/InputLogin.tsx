import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'
import { useFormContext } from 'react-hook-form'

const input = tv({
  base: `
    h-12
    w-full
    rounded-lg
    border-[1px]
    border-medium-gray
    bg-transparent
    pl-4
    sm:text-[18px]
    small-mobile:text-sm
    text-[12px]
    font-bold
    text-white
    outline-none
    duration-300
    focus:border-main-purple
  `,
})

type InputStyleProps = ComponentProps<'input'> & VariantProps<typeof input>

interface InputProps extends InputStyleProps {
  name: string
  error?: string | undefined
}

export function InputLogin({ name, error, className, ...props }: InputProps) {
  const { register } = useFormContext()

  return (
    <input
      {...register(name)}
      {...props}
      className={`
        ${input({ className })}
        ${error ? 'border-red' : ''}
      `}
    />
  )
}
