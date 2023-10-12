type ModalTypeProps = 'add' | 'edit'

interface BoardFormInputs {
  board: { name: string; currentBoard: string }
  boardColumns: {
    id: string
    boardID: string
    columnName: string
    itemID: number
    color: string
    fromBoard: string
  }[]
}

interface TaskFormInputs {
  task: { title: string; description: string; status: string }
  subtasks: { name: string; subtaskID: number }[]
}
