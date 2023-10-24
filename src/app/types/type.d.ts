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
  }[]
  tasks: {
    id: string
    title: string
    itemID: string
    fromColumn: string
  }[]
  subtasks: {
    id: string
    name: string
    fromTask: string
    fromColumn: string
  }[]
}

interface TaskFormInputs {
  task: {
    id: string
    columnID: string
    title: string
    description: string
    fromColumn: string
    updateColumn: string
  }
  subtasks: {
    id: string
    name: string
    fromTask: string
    subtaskID: number
    completed: boolean
    fromColumn: string
  }[]
  columns: { itemID: string; columnName: string }[]
}
