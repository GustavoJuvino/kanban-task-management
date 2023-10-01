import { create } from 'zustand'

interface CurrentBoards {
  currentBoards: string[]
  setBoards: (boards: string[]) => void
}

const useGetAllBoards = create<CurrentBoards>()((set) => ({
  currentBoards: [],
  setBoards: () => set((state) => ({ currentBoards: state.currentBoards })),
}))

export default useGetAllBoards
