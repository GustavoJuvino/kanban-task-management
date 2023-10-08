type ModalTypeProps = 'add' | 'edit'

interface BoardFormInputs {
  board: { name: string; currentBoard: string }
  boardColumns: {
    id: string
    boardID: string
    columnName: string
    itemID: number
    color: string
  }[]
}
