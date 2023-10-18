import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'
import { useFormContext } from 'react-hook-form'
import { useWindowSize } from '@uidotdev/usehooks'

const textArea = tv({
  base: `
        mt-2
        h-[112px]
        w-full
        resize-none
        rounded-[4px]
        border-[1px]
        border-[#828FA3]
        bg-transparent
        py-2
        pl-4
        text-[13px]
        font-medium
        text-white
        outline-none
        duration-300
        focus:border-main-purple
    `,
})

type TextAreaStyleProps = ComponentProps<'textarea'> &
  VariantProps<typeof textArea>

interface TextAreaProps extends TextAreaStyleProps {
  name: string
  error?: string | 0 | undefined | false
}

export function TextArea({ name, error, className, ...props }: TextAreaProps) {
  const size = useWindowSize()
  const { register } = useFormContext()

  return (
    <div className="relative flex w-full text-body-l">
      <textarea
        {...register(name, { required: "Can't be empty" })}
        {...props}
        placeholder="e.g. It’s always good to take a break. This 15 minute
        break will recharge the batteries a little."
        className={`
          ${textArea({ className })}
          ${
            error
              ? 'border-red border-opacity-100 focus:border-red'
              : 'border-opacity-25'
          }
        `}
      />
    </div>
  )
}
