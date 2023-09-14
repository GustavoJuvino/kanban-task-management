'use client'

import React, { useState } from 'react'
import { VisibilityOff, VisibilityOn } from '../../../public/svgs'
import { Form } from '../Components/form'
import { z } from 'zod'
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LoginFormSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .email('Email format is invalid'),
  password: z.string().nonempty('Password is required'),
})

type LoginFormProps = z.infer<typeof LoginFormSchema>

const LoginForm = () => {
  const [visibility, setVisibility] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const createLoginForm = useForm<LoginFormProps>({
    resolver: zodResolver(LoginFormSchema),
  })

  const {
    handleSubmit,
    formState: { errors },
  } = createLoginForm

  const onSubmit: SubmitHandler<LoginFormProps> = (data) => {
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (!callback?.error) {
        router.push('/')
      } else if (callback?.error) {
        setError(callback.error)
      }
    })
  }

  return (
    <FormProvider {...createLoginForm}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-16 flex flex-col gap-y-10"
      >
        <Form.Field>
          <Form.Error>{errors.email?.message}</Form.Error>
          {error && <Form.Error>{error}</Form.Error>}
          <Form.Input
            type="text"
            name="email"
            error={errors.email?.message || error || ''}
            placeholder="Email"
          />
        </Form.Field>
        <Form.Field className="relative">
          <Form.Error>{errors.password?.message}</Form.Error>
          <div className="relative">
            <Form.Input
              type={visibility ? 'text' : 'password'}
              name="password"
              error={errors.password?.message || error || ''}
              placeholder="Password"
            />
            {visibility ? (
              <VisibilityOn
                id="visibility"
                onClick={() => setVisibility(!visibility)}
              />
            ) : (
              <VisibilityOff
                id="visibility"
                onClick={() => setVisibility(!visibility)}
              />
            )}
          </div>
        </Form.Field>

        <button className="h-14 w-full rounded-lg bg-very-dark-gray text-heading-xl text-white">
          Sign In
        </button>
      </form>
    </FormProvider>
  )
}

export default LoginForm
