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

  columns: string[]
  setColumns: Dispatch<SetStateAction<string[]>>
}

const GlobalContext = createContext<ContextProps>({
  boards: [],
  setBoards: (): string[] => [],

  columns: [],
  setColumns: (): string[] => [],
})

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [boards, setBoards] = useState<string[]>([])
  const [columns, setColumns] = useState<string[]>([])

  return (
    <GlobalContext.Provider value={{ boards, setBoards, columns, setColumns }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
