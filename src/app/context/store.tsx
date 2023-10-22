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

  tasks: TaskProps[]
  setTasks: Dispatch<SetStateAction<TaskProps[]>>

  subtasks: SubtaskProps[]
  setSubTasks: Dispatch<SetStateAction<SubtaskProps[]>>
}

const GlobalContext = createContext<ContextProps>({
  boards: [],
  setBoards: (): BoardProps[] => [],

  columns: [],
  setColumns: (): ColumnsProps[] => [],

  tasks: [],
  setTasks: (): TaskProps[] => [],

  subtasks: [],
  setSubTasks: (): SubtaskProps[] => [],
})

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [boards, setBoards] = useState<BoardProps[]>([])
  const [columns, setColumns] = useState<ColumnsProps[]>([])

  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [subtasks, setSubTasks] = useState<SubtaskProps[]>([])

  return (
    <GlobalContext.Provider
      value={{
        boards,
        setBoards,
        columns,
        setColumns,
        tasks,
        setTasks,
        subtasks,
        setSubTasks,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
