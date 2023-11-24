'use client'

import React, { useState } from 'react'
import { VisibilityOff, VisibilityOn } from '../../../public/svgs'
import { Form } from '../Components/form'
import { z } from 'zod'
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Button from '../Components/Button'
import HashLoader from 'react-spinners/HashLoader'

const LoginFormSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .email('Email format is invalid'),
  password: z.string().nonempty('Password is required'),
})

type LoginFormProps = z.infer<typeof LoginFormSchema>

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
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
    setLoading(true)

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (!callback?.error) {
        router.push('/')
        setTimeout(() => {
          setLoading(false)
        }, 1200)
      } else if (callback?.error) {
        setError(callback.error)
        setLoading(false)
      }
    })
  }

  return (
    <FormProvider {...createLoginForm}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 flex flex-col gap-y-10 sm:mt-16"
      >
        <Form.Field>
          <Form.Error>{errors.email?.message}</Form.Error>
          {error && <Form.Error>{error}</Form.Error>}
          <Form.InputLogin
            type="text"
            name="email"
            error={errors.email?.message || error || ''}
            placeholder="Email"
          />
        </Form.Field>
        <Form.Field className="relative">
          <Form.Error>{errors.password?.message}</Form.Error>
          <div className="relative">
            <Form.InputLogin
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

        {loading ? (
          <span className="flex w-full justify-center">
            <HashLoader color="#635FC7" />
          </span>
        ) : (
          <Button style={'form'} className="max-sm:text-lg">
            Sign In
          </Button>
        )}
      </form>
    </FormProvider>
  )
}

export default LoginForm
