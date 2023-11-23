'use client'

import React, { useEffect, useState } from 'react'
import { LogoDark, LogoLight } from '../../../public/svgs'
import LoginForm from './LoginForm'

const LoginPage = () => {
  const [HTML, setHTML] = useState<string>()

  useEffect(() => {
    setHTML(document.getElementById('HTML')?.className)
  }, [])

  return (
    <main
      className="
        flex
        h-full
        w-full 
        items-center 
        justify-center 
        bg-light-grey
        dark:bg-very-dark-gray
        max-sm:px-7
      "
    >
      <section
        className="
          h-auto 
          w-full 
          rounded-lg 
          bg-white
          px-8 
          py-8 
          dark:bg-lines-dark 
          sm:w-[550px] 
          sm:px-[50px] 
          sm:py-14
        "
      >
        <span className="flex justify-center">
          {HTML === 'light' ? <LogoDark /> : <LogoLight />}
        </span>

        <div className="mt-[50px]">
          <h1 className="text-heading-l text-black dark:text-white sm:text-heading-xl">
            Loggin Acount
          </h1>
          <p
            className="
              mt-5 
              font-bold 
              text-medium-gray 
              max-sm:text-sm 
              sm:mt-7 
              sm:text-heading-m
            "
          >
            Log in to your account to enjoy Kanban services right now!
          </p>
        </div>

        <LoginForm />

        <p
          className="
            mt-8 
            text-center 
            font-bold 
            text-medium-gray 
            max-sm:text-[14px] 
            sm:mt-10 
            sm:text-heading-m
          "
        >
          Doesn’t have an account yet?
          <a
            href="/register"
            className="
              cursor-pointer 
              duration-300 
              hover:text-main-purple 
              dark:text-white     
            "
          >
            {' '}
            Register right now!
          </a>
        </p>
      </section>
    </main>
  )
}

export default LoginPage
