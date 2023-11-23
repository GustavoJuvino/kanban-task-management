import { create } from 'zustand'

interface OpenDeleteModalStore {
  openTask: boolean
  onOpenTask: (open: boolean) => void
}

const useOpenTask = create<OpenDeleteModalStore>()((set) => ({
  openTask: false,
  onOpenTask: (open) => set((state) => ({ openTask: (state.openTask = open) })),
}))

export default useOpenTask
