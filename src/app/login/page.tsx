import React from 'react'
import { LogoLight, VisibilityOff } from '../../../public/svgs'
import { Form } from '../Components/form'

const page = () => {
  return (
    <main className="flex h-[100vh] w-full items-center justify-center bg-very-dark-gray">
      <section className="h-auto w-[550px] rounded-lg bg-lines-dark px-[50px] py-14">
        <span className="flex justify-center">
          <LogoLight />
        </span>

        <div className="mt-[50px]">
          <h1 className="text-heading-xl text-white">Login Account</h1>
          <p className="mt-7 text-heading-m text-medium-gray">
            Log in to your account to enjoy Kanban services right now!
          </p>
        </div>

        <form className="mt-16 flex flex-col gap-y-10">
          <Form.Field>
            <Form.Input type="text" placeholder="Username" />
          </Form.Field>
          <Form.Field className="relative">
            <Form.Input type="password" placeholder="Password" />
            <VisibilityOff className="absolute right-[18px] top-[18px] cursor-pointer" />
          </Form.Field>

          <button className="h-14 w-full rounded-lg bg-very-dark-gray text-heading-xl text-white">
            Sign In
          </button>
        </form>

        <p className="mt-10 text-center text-heading-m text-medium-gray">
          Doesn’t have an account yet?
          <span className="cursor-pointer text-white duration-300 hover:text-main-purple">
            {' '}
            Register right now!
          </span>
        </p>
      </section>
    </main>
  )
}

export default page
