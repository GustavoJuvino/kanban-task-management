import { create } from 'zustand'

interface CurrentURL {
  status: string
  setStatus: (status: string) => void
}

const useSaveStatus = create<CurrentURL>()((set) => ({
  status: '',
  setStatus: (status) => set((state) => ({ status: (state.status = status) })),
}))

export default useSaveStatus
