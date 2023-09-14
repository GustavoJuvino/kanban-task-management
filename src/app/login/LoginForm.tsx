'use client'
import React, { useState } from 'react'
import { VisibilityOff, VisibilityOn } from '../../../public/svgs'
import { Form } from '../Components/form'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const LoginFormSchema = z.object({
  email: z.string().nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
})

type LoginForm = z.infer<typeof LoginFormSchema>

const LoginForm = () => {
  const [visibility, setVisibility] = useState(false)

  const createLoginForm = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema),
  })

  const {
    handleSubmit,
    formState: { errors },
  } = createLoginForm

  return (
    <FormProvider {...createLoginForm}>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="mt-16 flex flex-col gap-y-10"
      >
        <Form.Field>
          <Form.Error>{errors.email?.message}</Form.Error>
          <Form.Input
            type="text"
            name="email"
            error={errors.email?.message}
            placeholder="Email"
          />
        </Form.Field>
        <Form.Field className="relative">
          <Form.Error>{errors.password?.message}</Form.Error>
          <div className="relative">
            <Form.Input
              type={visibility ? 'text' : 'password'}
              name="password"
              error={errors.password?.message}
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
