import React, { useEffect, useState } from 'react'
import ShowMenu from './ShowMenu'
import HideMenu from './HideMenu'
import { NoSsr } from '@mui/material'
import Theme from './Theme'
import ModalBackground from '../ModalBackground'
import CreateNewBoard from '../Board/CreateNewBoard'
import { Cross } from '../../../../public/modal'
import { IconAccount, LogoDark, LogoLight } from '../../../../public/svgs'
import { useWindowSize } from '@uidotdev/usehooks'
import { useHideSidebar } from '@/app/helper/useHideSidebar'
import SidebarColumns from './SideBarBoards'
import { useGlobalContext } from '@/app/context/store'
import useGetCurrentURL from '@/app/hooks/useGetCurrentURL'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import useSaveCurrentUser from '@/app/hooks/useSaveCurrentUser'
import { motion, AnimatePresence } from 'framer-motion'

const Sidebar = () => {
  const size = useWindowSize()
  const { hidden, setHidden } = useHideSidebar()
  const { boards } = useGlobalContext()
  const { setURL } = useGetCurrentURL()
  const { theme } = useTheme()
  const router = useRouter()
  const { currentUser } = useSaveCurrentUser()
  const { URL } = useGetCurrentURL()

  useEffect(() => {
    if (size.width && size.width <= 640) setHidden(true)
  }, [size, setHidden])
  const [HTML, setHTML] = useState<string>()

  useEffect(() => {
    setHTML(document.getElementById('HTML')?.className)
  }, [HTML])

  return (
    <>
      <NoSsr>
        {!hidden && size.width && size.width <= 640 && <ModalBackground />}
        <AnimatePresence>
          {hidden === false && (
            <motion.article
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2, type: 'tween' }}
              className={`
                z-40
                flex
                h-auto
                w-[264px] 
                flex-col 
                justify-between 
                border-lines-white
                bg-white 
                dark:border-lines-dark
                dark:bg-dark-gray 
                max-sm:absolute 
                max-sm:top-40 
                max-sm:rounded-lg
                max-sm:drop-shadow-custom
                sm:h-full
                sm:w-[260px]
                sm:border-r-[1px]
                lg:w-[300px]
              `}
            >
              <section>
                {(theme === 'system' && HTML === 'dark') || theme === 'dark' ? (
                  <LogoLight
                    onClick={() => {
                      router.push('/')
                      setURL('/')
                    }}
                    className="
                      ml-6 
                      mt-8
                      cursor-pointer 
                      max-sm:hidden 
                      sm:ml-[26px] 
                      lg:ml-[34px]
                    "
                  />
                ) : (
                  <LogoDark
                    onClick={() => {
                      router.push('/')
                      setURL('/')
                    }}
                    className="
                      ml-6 
                      mt-8 
                      cursor-pointer 
                      max-sm:hidden 
                      sm:ml-[26px] 
                      lg:ml-[34px]
                    "
                  />
                )}

                {URL && (
                  <span className="ml-[15px] mt-6 flex gap-x-[15px] ">
                    <IconAccount className="fill-medium-gray" />
                    <h3 className="font-bold text-medium-gray">
                      {currentUser && currentUser.username}
                    </h3>
                  </span>
                )}

                <div className="mt-4 sm:mt-[54px]">
                  <div className="flex items-center justify-between max-sm:pr-6">
                    {boards.length > 0 && (
                      <span className="ml-6 text-heading-s uppercase text-medium-gray lg:ml-8">
                        all boards {`(${boards.length})`}
                      </span>
                    )}

                    <Cross
                      onClick={() => setHidden(true)}
                      className="
                        cursor-pointer 
                        fill-medium-gray 
                        duration-300 
                        hover:fill-red
                        sm:hidden
                      "
                    />
                  </div>

                  <SidebarColumns />
                  <CreateNewBoard />
                </div>
              </section>

              <section className="mb-4 max-sm:mt-8 sm:mb-8">
                <Theme />
                <HideMenu />
              </section>
            </motion.article>
          )}
        </AnimatePresence>

        {hidden && (
          <section className="z-40 max-sm:hidden">
            <ShowMenu />
          </section>
        )}
      </NoSsr>
    </>
  )
}

export default Sidebar
