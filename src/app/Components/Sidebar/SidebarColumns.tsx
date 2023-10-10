import React from 'react'
import { IconBoard } from '../../../../public/sidebar'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/app/context/store'
import useGetCurrentURL from '@/app/hooks/useGetCurrentURL'

const SidebarColumns = () => {
  const router = useRouter()
  const { boards } = useGlobalContext()
  const { URL } = useGetCurrentURL()

  return (
    <ul className="mt-5">
      {boards.map((board) =>
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
              hover:bg-white
              hover:text-main-purple
              lg:w-[276px]
            "
          >
            <IconBoard className="fill-medium-gray" />
            <h3>{board.boardName}</h3>
          </li>
        ),
      )}
    </ul>
  )
}

export default SidebarColumns
