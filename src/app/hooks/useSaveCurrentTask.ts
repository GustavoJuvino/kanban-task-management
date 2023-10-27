import { create } from 'zustand'

type currentTaskProps = {
  id: string
  taskBoard: string
  taskTitle: string
  taskColumn: string
  taskDescription: string
}

interface CurrentURL {
  currentTask: currentTaskProps
  setCurrentTask: (status: currentTaskProps) => void
}

const useSaveCurrentTask = create<CurrentURL>()((set) => ({
  currentTask: {
    id: '',
    taskBoard: '',
    taskTitle: '',
    taskColumn: '',
    taskDescription: '',
  },
  setCurrentTask: (status) =>
    set((state) => ({ currentTask: (state.currentTask = status) })),
}))

export default useSaveCurrentTask
