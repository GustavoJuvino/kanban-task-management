import { create } from 'zustand'

interface CurrentURL {
  URL: string
  setURL: (url: string) => void
}

const useGetCurrentURL = create<CurrentURL>()((set) => ({
  URL: '',
  setURL: (url) => set((state) => ({ URL: (state.URL = url) })),
}))

export default useGetCurrentURL
