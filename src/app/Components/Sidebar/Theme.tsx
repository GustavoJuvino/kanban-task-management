import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { DarkTheme, LightTheme } from '../../../../public/sidebar'

const Theme = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <section className="flex h-auto w-full justify-center">
      <div
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="
          flex
          h-12
          w-[235px]
          items-center
          justify-center
          gap-x-[23px]
          rounded-md 
          bg-light-grey
          dark:bg-very-dark-gray 
          lg:w-[251px]
        "
      >
        <LightTheme />

        <div
          className={`
            flex 
            h-5 
            w-10 
            cursor-pointer 
            items-center 
            rounded-full 
            bg-main-purple 
            px-[3px]
            ${theme === 'dark' ? 'justify-end ' : 'justify-start'}
          `}
        >
          <span className="h-[14px] w-[14px] rounded-full bg-white" />
        </div>

        <DarkTheme />
      </div>
    </section>
  )
}

export default Theme
