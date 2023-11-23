import { create } from 'zustand'

type currentUser = {
  id: string
  username: string
  email: string
  hashedPassword: string
} | null

interface CurrentUser {
  currentUser: currentUser
  setCurrentUser: (user: currentUser) => void
}

const useSaveCurrentUser = create<CurrentUser>()((set) => ({
  currentUser: {
    id: '',
    username: '',
    email: '',
    hashedPassword: '',
  },
  setCurrentUser: (user) =>
    set((state) => ({ currentUser: (state.currentUser = user) })),
}))

export default useSaveCurrentUser
