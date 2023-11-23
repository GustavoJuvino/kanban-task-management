import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { DarkTheme, LightTheme } from '../../../../public/sidebar'

const Theme = () => {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const [HTML, setHTML] = useState<string>()

  useEffect(() => {
    setHTML(document.getElementById('HTML')?.className)
  }, [HTML])

  if (!mounted) {
    return null
  }

  return (
    <section className="flex h-auto w-full justify-center">
      <div
        onClick={() => {
          if (theme === 'system') {
            router.refresh()
            setTheme(HTML === 'dark' ? 'light' : 'dark')
          } else {
            router.refresh()
            setTheme(theme === 'dark' ? 'light' : 'dark')
          }
        }}
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

        <motion.div
          layout
          className={`
            flex 
            h-5 
            w-10 
            cursor-pointer 
            items-center 
            rounded-full 
            bg-main-purple 
            px-[3px]
            ${
              (theme === 'system' && HTML === 'dark') || theme === 'dark'
                ? 'justify-end '
                : 'justify-start'
            }
          `}
        >
          <motion.span
            layout
            className="h-[14px] w-[14px] rounded-full bg-white"
          />
        </motion.div>

        <DarkTheme />
      </div>
    </section>
  )
}

export default Theme
