'use client'

import React from 'react'
import { Form } from '../Components/form'
import Button from '../Components/Button'
import { VisibilityOff } from '../../../public/svgs'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const RegisterFormSchema = z.object({
  username: z.string().nonempty('Username is required'),
  email: z
    .string()
    .nonempty('Email is required')
    .email('Email format is invalid'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(8, 'Minimum eight characters,')
    .regex(/.*[A-Z].*/, 'One uppercase character'),
  confirmPswrd: z.string().nonempty('Confirm password is required'),
})

type RegisterForm = z.infer<typeof RegisterFormSchema>

// Heavy password regex: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"

const RegisterForm = () => {
  const createRegisterForm = useForm<RegisterForm>({
    resolver: zodResolver(RegisterFormSchema),
  })

  const {
    handleSubmit,
    formState: { errors },
  } = createRegisterForm

  if (errors) console.log(errors)

  return (
    <FormProvider {...createRegisterForm}>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="mt-16 flex flex-col gap-y-10"
      >
        <Form.Field>
          <Form.Input name="username" type="text" placeholder="Username" />
        </Form.Field>

        <Form.Field>
          <Form.Input name="email" type="text" placeholder="Email" />
        </Form.Field>

        <Form.Field className="relative">
          <Form.Input name="password" type="password" placeholder="Password" />
          <VisibilityOff className="absolute right-[18px] top-[18px] cursor-pointer" />
        </Form.Field>

        <Form.Field className="relative">
          <Form.Input
            name="confirmPswrd"
            type="password"
            placeholder="Confirm Password"
          />
          <VisibilityOff className="absolute right-[18px] top-[18px] cursor-pointer" />
        </Form.Field>

        <Button style={'form'}> Register </Button>
      </form>
    </FormProvider>
  )
}

export default RegisterForm
