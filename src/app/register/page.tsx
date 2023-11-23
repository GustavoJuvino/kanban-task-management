'use client'

import React, { useEffect, useState } from 'react'
import { LogoDark, LogoLight } from '../../../public/svgs'
import RegisterForm from './RegisterForm'

const RegisterPage = () => {
  const [HTML, setHTML] = useState<string>()

  useEffect(() => {
    setHTML(document.getElementById('HTML')?.className)
  }, [])

  return (
    <main
      className="
        flex 
        h-screen 
        w-full 
        items-center 
        justify-center 
        bg-white
        px-7 
        dark:bg-very-dark-gray
      "
    >
      <section
        id="form-page"
        className="
          h-auto 
          w-full 
          rounded-lg 
          bg-light-grey
          p-7 
          dark:bg-lines-dark 
          sm:w-[550px] 
          sm:px-[50px]
          sm:py-7
        "
      >
        <span className="flex justify-center">
          {HTML === 'light' ? <LogoDark /> : <LogoLight />}
        </span>

        <div className="mt-8">
          <h1
            className="
              text-[12px] 
              text-black
              dark:text-white 
              small-mobile:text-heading-l 
              sm:text-heading-xl
            "
          >
            Register Account
          </h1>
          <p
            className="
              mt-5
              font-bold 
              text-medium-gray
              max-sm:text-sm
              max-small-mobile:text-[12px] 
              sm:mt-7 
              sm:text-heading-m
            "
          >
            Register your account to enjoy kanban services right now!
          </p>
        </div>

        <RegisterForm />

        <p
          className="
            mt-6 
            text-center 
            font-bold 
            text-medium-gray 
            max-sm:text-[14px]
            max-small-mobile:text-[12px]
            sm:text-heading-m
          "
        >
          Already have an account?
          <a
            href="/login"
            className="
              cursor-pointer 
              duration-300 
              hover:text-main-purple 
              dark:text-white
            "
          >
            Sign in right now!
          </a>
        </p>
      </section>
    </main>
  )
}

export default RegisterPage
