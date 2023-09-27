import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button'
import EditMenu from './EditMenu'
import { usePathname } from 'next/navigation'
import { useWindowSize } from '@uidotdev/usehooks'
import useOpenTaskModal from '@/app/hooks/useOpenTaskModal'
import useClickOutside from '@/app/hooks/useClickOutside'
import { EditMenuIcon, IconAdd } from '../../../../public/svgs'

const HeaderOptions = () => {
  const size = useWindowSize()
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState(false)
  const { onOpenNewTask } = useOpenTaskModal()

  const { clickOutside } = useClickOutside()
  const editMenuRef = useRef(null)

  useEffect(() => {
    if (editMenuRef) clickOutside(editMenuRef, setOpenMenu)
  }, [clickOutside])

  if (pathname !== '/')
    return (
      <section className="flex items-center gap-x-4 sm:gap-x-6">
        <Button
          onClick={() => onOpenNewTask(true)}
          className="
            flex
            w-12
            items-center
            justify-center
            max-sm:h-8
            sm:w-[164px]
          "
        >
          {size.width && size.width <= 640 ? <IconAdd /> : '+ Add new task'}
        </Button>
        <div ref={editMenuRef}>
          <EditMenuIcon
            onClick={() => setOpenMenu(!openMenu)}
            className="
              cursor-pointer
              fill-medium-gray
              hover:fill-main-purple
            "
          />
          <EditMenu open={openMenu} menuType="board" />
        </div>
      </section>
    )
}

export default HeaderOptions
