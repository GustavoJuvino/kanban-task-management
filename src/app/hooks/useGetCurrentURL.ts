// import { create } from 'zustand'

// interface OpenEditBoardStore {
//   openNewBoard: boolean
//   onOpenNewBoard: (open: boolean) => void

//   openEditBoard: boolean
//   onOpenEditBoard: (open: boolean) => void
// }

// const useOpenBoardModal = create<OpenEditBoardStore>()((set) => ({
//   openEditBoard: false,
//   onOpenEditBoard: (open) =>
//     set((state) => ({ openEditBoard: (state.openEditBoard = open) })),

//   openNewBoard: false,
//   onOpenNewBoard: (open) =>
//     set((state) => ({ openNewBoard: (state.openNewBoard = open) })),
// }))

// export default useOpenBoardModal

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
