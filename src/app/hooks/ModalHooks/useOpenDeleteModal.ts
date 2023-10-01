import { create } from 'zustand'

interface OpenDeleteModalStore {
  openDeleteBoard: boolean
  onOpenDeleteBoard: (open: boolean) => void

  openDeleteTask: boolean
  onOpenDeleteTask: (open: boolean) => void
}

const useOpenDeleteModal = create<OpenDeleteModalStore>()((set) => ({
  openDeleteBoard: false,
  onOpenDeleteBoard: (open) =>
    set((state) => ({ openDeleteBoard: (state.openDeleteBoard = open) })),

  openDeleteTask: false,
  onOpenDeleteTask: (open) =>
    set((state) => ({ openDeleteTask: (state.openDeleteTask = open) })),
}))

export default useOpenDeleteModal
