import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface HiddenSidebar {
  hidden: boolean
  setHidden: (hide: boolean) => void
}

export const useHideSidebar = create<HiddenSidebar>()(
  persist(
    (set) => ({
      hidden: false,
      setHidden: (hide) => set((state) => ({ hidden: (state.hidden = hide) })),
    }),
    { name: 'HiddenSidebar' },
  ),
)
