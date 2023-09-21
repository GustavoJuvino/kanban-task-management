import { create } from 'zustand'

interface OpenEditBoardStore {
  openNewBoard: boolean
  onOpenNewBoard: (open: boolean) => void

  openEditBoard: boolean
  onOpenEditBoard: (open: boolean) => void
}

const useOpenBoardModal = create<OpenEditBoardStore>()((set) => ({
  openEditBoard: false,
  onOpenEditBoard: (open) =>
    set((state) => ({ openEditBoard: (state.openEditBoard = open) })),

  openNewBoard: false,
  onOpenNewBoard: (open) =>
    set((state) => ({ openNewBoard: (state.openNewBoard = open) })),
}))

export default useOpenBoardModal
