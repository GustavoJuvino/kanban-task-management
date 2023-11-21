import React, { useState } from 'react'
import { IconBoard } from '../../../../public/sidebar'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/app/context/store'
import useGetCurrentURL from '@/app/hooks/useGetCurrentURL'
import { useTheme } from 'next-themes'

const SidebarColumns = () => {
  const [liHover, setLiHover] = useState<number>()
  const router = useRouter()
  const { URL } = useGetCurrentURL()
  const { boards } = useGlobalContext()
  const { theme } = useTheme()

  return (
    <ul className="mt-5">
      {boards.map((board, index) =>
        board.boardName.replace(/\s/g, '') === URL ? (
          <li
            key={board.id}
            className="flex w-[240px] items-center gap-x-3 rounded-r-full bg-main-purple py-[15px] pl-6 lg:w-[276px] lg:gap-x-4 lg:pl-8"
          >
            <IconBoard className="fill-white" />
            <h3 className="text-heading-m text-white">{board.boardName}</h3>
          </li>
        ) : (
          <li
            onMouseEnter={() => setLiHover(index)}
            onMouseLeave={() => setLiHover(-1)}
            onClick={() =>
              router.push(`/${board.boardName.replace(/\s/g, '')}`)
            }
            key={board.id}
            className="
              flex
              w-[240px]
              cursor-pointer 
              items-center 
              gap-x-4 
              rounded-r-full 
              py-[15px] 
              pl-8 
              text-heading-m 
              text-medium-gray
              duration-300
              hover:bg-main-purple
              hover:text-white
              dark:hover:bg-white
              dark:hover:text-main-purple
              lg:w-[276px]
            "
          >
            <IconBoard
              className={`${
                liHover === index && theme !== 'dark'
                  ? 'fill-white'
                  : 'fill-medium-gray'
              }`}
            />
            <h3>{board.boardName}</h3>
          </li>
        ),
      )}
    </ul>
  )
}

export default SidebarColumns
