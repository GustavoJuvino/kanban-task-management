import React from 'react'
import { LogoLight } from '../../../public/svgs'
import LoginForm from '../login/LoginForm'
import RegisterForm from '../register/RegisterForm'

interface AccountProps {
  description: string
  firstMessage: string
  secondMessage: string
  loginPage: boolean
}

const Account = ({
  description,
  firstMessage,
  secondMessage,
  loginPage,
}: AccountProps) => {
  return (
    <section
      className="
        h-auto 
        w-full 
        rounded-lg 
        bg-lines-dark 
        px-8 
        py-8 
        sm:w-[550px] 
        sm:px-[50px] 
        sm:py-14
      "
    >
      <span className="flex justify-center">
        <LogoLight />
      </span>

      <div className="mt-[50px]">
        <h1 className="text-heading-l text-white sm:text-heading-xl">
          {loginPage ? 'Loggin Acount' : 'Register Account'}
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
          {description}
        </p>
      </div>

      {loginPage ? <LoginForm /> : <RegisterForm />}

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
        {firstMessage}
        <a
          href={loginPage ? '/register' : '/login'}
          className="cursor-pointer text-white duration-300 hover:text-main-purple"
        >
          {' '}
          {secondMessage}
        </a>
      </p>
    </section>
  )
}

export default Account
