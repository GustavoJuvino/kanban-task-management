import { create } from 'zustand'

interface CurrentURL {
  currentColumn: string
  setCurrentColumn: (status: string) => void
}

const useSaveCurrentColumn = create<CurrentURL>()((set) => ({
  currentColumn: '',
  setCurrentColumn: (status) =>
    set((state) => ({ currentColumn: (state.currentColumn = status) })),
}))

export default useSaveCurrentColumn
