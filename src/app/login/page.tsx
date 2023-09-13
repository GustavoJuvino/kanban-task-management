import React from 'react'
import { LogoLight } from '../../../public/svgs'
import LoginForm from './LoginForm'

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

        <LoginForm />

        <p className="mt-10 text-center text-heading-m text-medium-gray">
          Doesn’t have an account yet?
          <a
            href="/register"
            className="cursor-pointer text-white duration-300 hover:text-main-purple"
          >
            {' '}
            Register right now!
          </a>
        </p>
      </section>
    </main>
  )
}

export default page
