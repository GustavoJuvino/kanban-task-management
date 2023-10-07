type ModalTypeProps = 'add' | 'edit'

interface BoardFormInputs {
  board: { name: string; currentBoard: string }
  boardColumns: {
    columnName: string
    id: number
    color: string
  }[]
}
