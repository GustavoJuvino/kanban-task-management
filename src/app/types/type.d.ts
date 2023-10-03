type ModalTypeProps = 'add' | 'edit'

interface BoardFormInputs {
  boardName: string
  boardColumns: {
    columnName: string
    id: number
  }[]
}
