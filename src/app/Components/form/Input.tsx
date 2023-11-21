import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'
import { useFormContext } from 'react-hook-form'
import { useWindowSize } from '@uidotdev/usehooks'

const input = tv({
  base: `
        h-10
        w-full
        rounded-[4px]
        border-[1px]
        border-[#828FA3]
        border-opacity-25
        bg-transparent
        py-2
        pl-4
        small-mobile:text-[13px]
        text-[10px]
        font-medium
        leading-[23px]
        dark:text-white
        text-black
        outline-none
        duration-300
        focus:border-main-purple
    `,
})

type InputStyleProps = ComponentProps<'input'> & VariantProps<typeof input>

interface InputProps extends InputStyleProps {
  name: string
  error?: string | 0 | undefined | false
}

export function Input({ name, error, className, ...props }: InputProps) {
  const size = useWindowSize()
  const { register } = useFormContext()

  return (
    <div className="relative flex w-full">
      <input
        {...register(name, { required: "Can't be empty" })}
        {...props}
        className={`
          ${input({ className })}
          ${error && 'border-red focus:border-red'}
        `}
      />
      {error && (
        <div className="absolute right-4 flex h-full items-center text-[12px] text-red sm:text-body-l">
          {size.width && size.width >= 365 && <span>{error}</span>}
        </div>
      )}
    </div>
  )
}
