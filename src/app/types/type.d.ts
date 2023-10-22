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
}

interface TaskFormInputs {
  task: { id: string; title: string; description: string; fromColumn: string }
  subtasks: {
    name: string
    subtaskID: number
    completed: boolean
    fromColumn: string
  }[]
  columns: { itemID: string; columnName: string }[]
}
