import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button'
import EditMenu from './EditMenu'
import { EditMenuIcon, IconAdd } from '../../../../public/svgs'
import { useWindowSize } from '@uidotdev/usehooks'
import { useGlobalContext } from '@/app/context/store'
import useClickOutside from '@/app/hooks/useClickOutside'
import useSaveCurrentColumn from '@/app/hooks/useSaveCurrentColumn'
import useOpenTaskModal from '@/app/helper/ModalHooks/useOpenTaskModal'
import useGetCurrentURL from '@/app/hooks/useGetCurrentURL'

const HeaderOptions = () => {
  const [openMenu, setOpenMenu] = useState(false)

  const { URL } = useGetCurrentURL()
  const { columns } = useGlobalContext()
  const { clickOutside } = useClickOutside()
  const { onOpenNewTask } = useOpenTaskModal()
  const { setCurrentColumn } = useSaveCurrentColumn()

  const size = useWindowSize()
  const editMenuRef = useRef(null)

  useEffect(() => {
    if (editMenuRef) clickOutside(editMenuRef, setOpenMenu)
  }, [clickOutside])

  return (
    <section className="flex items-center gap-x-4 sm:gap-x-6">
      <Button
        disabled={!!(!(columns.length > 0) || URL === '/')}
        onClick={() => {
          onOpenNewTask(true)
          setCurrentColumn(columns[0].columnName)
        }}
        className={`
          flex
          w-12
          items-center
          justify-center
          max-sm:h-8
          sm:w-[164px]
          ${columns.length < 1 || (URL === '/' && 'bg-light-purple')}
        `}
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
