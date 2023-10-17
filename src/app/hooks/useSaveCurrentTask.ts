import { create } from 'zustand'

interface CurrentURL {
  currentTask: string
  setCurrentTask: (status: string) => void
}

const useSaveCurrentTask = create<CurrentURL>()((set) => ({
  currentTask: '',
  setCurrentTask: (status) =>
    set((state) => ({ currentTask: (state.currentTask = status) })),
}))

export default useSaveCurrentTask
