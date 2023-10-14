type ModalTypeProps = 'add' | 'edit'

interface BoardFormInputs {
  board: { name: string; currentBoard: string }
  boardColumns: {
    id: string
    boardID: string
    oldName: string
    itemID: number
    color: string
    fromBoard: string
    columnName: string
  }[]
  tasks: {
    id: string
    title: string
    status: string
    itemID: string
  }[]
}

interface TaskFormInputs {
  task: { title: string; description: string; status: string }
  subtasks: { name: string; subtaskID: number; complete: boolean }[]
  columns: { itemID: string; columnName: string }[]
}
