type ModalTypeProps = 'add' | 'edit'

interface BoardFormInputs {
  board: { id: string; name: string; currentBoard: string }
  boardColumns: {
    id: string
    boardID: string
    itemID: number
    color: string
    fromBoard: string
    columnName: string
    updateColumnName: string
  }[]
  tasks: {
    id: string
    title: string
    itemID: string
    fromBoard: string
    fromColumn: string
  }[]
  subtasks: {
    id: string
    name: string
    fromTask: string
    fromBoard: string
    fromColumn: string
  }[]
}

interface TaskFormInputs {
  task: {
    id: string
    columnID: string
    title: string
    itemID: string
    status?: string
    description: string
    fromColumn: string
    fromBoard: string
    updateTitle: string
    updateColumn: string
  }
  subtasks: {
    id: string
    name: string
    fromTask: string
    subtaskID: number
    completed: boolean
    fromBoard: string
    fromColumn: string
  }[]
  columns: { itemID: string; columnName: string }[]
}
