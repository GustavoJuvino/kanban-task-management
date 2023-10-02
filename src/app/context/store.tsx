'use client'

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'

interface ContextProps {
  boards: string[]
  setBoards: Dispatch<SetStateAction<string[]>>
}

const GlobalContext = createContext<ContextProps>({
  boards: [],
  setBoards: (): string[] => [],
})

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [boards, setBoards] = useState<string[]>([])
  return (
    <GlobalContext.Provider value={{ boards, setBoards }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
