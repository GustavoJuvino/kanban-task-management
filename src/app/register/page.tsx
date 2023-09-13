import React from 'react'
import { LogoLight } from '../../../public/svgs'
import RegisterForm from './RegisterForm'

const page = () => {
  return (
    <main className="flex h-[100vh] w-full items-center justify-center bg-very-dark-gray">
      <section className="h-auto w-[550px] rounded-lg bg-lines-dark px-[50px] py-14">
        <span className="flex justify-center">
          <LogoLight />
        </span>

        <div className="mt-[50px]">
          <h1 className="text-heading-xl text-white">Register Account</h1>
          <p className="mt-7 text-heading-m text-medium-gray">
            Register your account to enjoy kanban services right now!
          </p>
        </div>

        <RegisterForm />

        <p className="mt-10 text-center text-heading-m text-medium-gray">
          Already have an account?
          <a
            href="/login"
            className="cursor-pointer text-white duration-300 hover:text-main-purple"
          >
            {' '}
            Sign in right now!
          </a>
        </p>
      </section>
    </main>
  )
}

export default page
