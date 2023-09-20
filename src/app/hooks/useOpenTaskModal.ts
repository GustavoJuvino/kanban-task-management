import { create } from 'zustand'

interface OpenTaskModalStore {
  openNewTask: boolean
  onOpenNewTask: (open: boolean) => void

  openEditTask: boolean
  onOpenEditTask: (open: boolean) => void
}

const useOpenTaskModal = create<OpenTaskModalStore>()((set) => ({
  openNewTask: false,
  onOpenNewTask: (open) =>
    set((state) => ({ openNewTask: (state.openNewTask = open) })),

  openEditTask: false,
  onOpenEditTask: (open) =>
    set((state) => ({ openEditTask: (state.openEditTask = open) })),
}))

export default useOpenTaskModal
