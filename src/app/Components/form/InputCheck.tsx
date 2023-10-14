import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'
import { useFormContext } from 'react-hook-form'

const inputCheck = tv({
  base: `
        h-4 
        w-4 
        appearance-none 
        rounded-sm 
        border-[1px] 
        border-[#828FA3] 
        border-opacity-25 
        bg-dark-gray
    `,
})

type InputCheckStyleProps = ComponentProps<'input'> &
  VariantProps<typeof inputCheck>

interface InputProps extends InputCheckStyleProps {
  name: string
}

export function InputCheck({ name, className, ...props }: InputProps) {
  const { register } = useFormContext()

  return (
    <div className="relative flex w-full">
      <input
        {...register(name)}
        {...props}
        className={`
          ${inputCheck({ className })}
        `}
      />
    </div>
  )
}
