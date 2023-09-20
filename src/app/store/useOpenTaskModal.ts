import { create } from 'zustand'

interface OpenTaskModal {
  openModal: boolean
  setOpenModal: (open: boolean) => void
}

export const useOpenTaskModal = create<OpenTaskModal>()((set) => ({
  openModal: false,
  setOpenModal: (open) =>
    set((state) => ({ openModal: (state.openModal = open) })),
}))
