'use client'

import React, { useState } from 'react'
import { Form } from '../Components/form'
import Button from '../Components/Button'
import { VisibilityOff, VisibilityOn } from '../../../public/svgs'
import { z } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

const RegisterFormSchema = z.object({
  username: z.string().nonempty('Username is required'),
  email: z
    .string()
    .nonempty('Email is required')
    .email('Email format is invalid'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(8, 'Minimum eight characters')
    .regex(/.*[A-Z].*/, 'One uppercase character')
    .regex(/.*[a-z].*/, 'One lowercase character')
    .regex(/^(?=.*[@#$%^&+=-]).*$/, 'One special  character'),

  confirmPswrd: z.string().nonempty('Confirm password is required'),
})

type RegisterForm = z.infer<typeof RegisterFormSchema>

const RegisterForm = () => {
  const [visibility, setVisibility] = useState(false)
  const [visibilityCheck, setVisibilityCheck] = useState(false)
  const [error, setError] = useState<string | null>()

  const createRegisterForm = useForm<RegisterForm>({
    resolver: zodResolver(RegisterFormSchema),
  })

  const {
    handleSubmit,
    formState: { errors },
  } = createRegisterForm

  const onSubmit: SubmitHandler<RegisterForm> = (data) => {
    axios
      .post('/api/register', data)
      .then(() => setError(null))
      .catch((error) => {
        setError(error.response.data.message)
      })
      .finally(() => {
        console.log('finished')
      })
  }

  return (
    <FormProvider {...createRegisterForm}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-16 flex flex-col gap-y-10"
      >
        <Form.Field>
          <Form.Error>{errors.username?.message}</Form.Error>
          <Form.Input
            type="text"
            name="username"
            error={errors.username?.message}
            placeholder="Username"
          />
        </Form.Field>

        <Form.Field>
          <Form.Error>{errors.email?.message}</Form.Error>
          {error && <Form.Error>{error}</Form.Error>}
          <Form.Input
            type="email"
            name="email"
            error={errors.email?.message}
            placeholder="Email"
          />
        </Form.Field>

        <Form.Field>
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

        <Form.Field>
          <Form.Error>{errors.confirmPswrd?.message}</Form.Error>
          <div className="relative">
            <Form.Input
              type={visibilityCheck ? 'text' : 'password'}
              name="confirmPswrd"
              error={errors.confirmPswrd?.message}
              placeholder="Confirm Password"
            />
            {visibilityCheck ? (
              <VisibilityOn
                id="visibility"
                onClick={() => setVisibilityCheck(!visibilityCheck)}
              />
            ) : (
              <VisibilityOff
                id="visibility"
                onClick={() => setVisibilityCheck(!visibilityCheck)}
              />
            )}
          </div>
        </Form.Field>

        <Button style={'form'}> Register </Button>
      </form>
    </FormProvider>
  )
}

export default RegisterForm
