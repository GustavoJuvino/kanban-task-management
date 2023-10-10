'use client'

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'

interface ContextProps {
  boards: BoardProps[]
  setBoards: Dispatch<SetStateAction<BoardProps[]>>

  columns: ColumnsProps[]
  setColumns: Dispatch<SetStateAction<ColumnsProps[]>>
}

const GlobalContext = createContext<ContextProps>({
  boards: [],
  setBoards: (): BoardProps[] => [],

  columns: [],
  setColumns: (): ColumnsProps[] => [],
})

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [boards, setBoards] = useState<BoardProps[]>([])
  const [columns, setColumns] = useState<ColumnsProps[]>([])

  return (
    <GlobalContext.Provider value={{ boards, setBoards, columns, setColumns }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
