type ModalTypeProps = 'add' | 'edit'

interface BoardFormInputs {
  boardName: string
  boardColumns: {
    columName: string
  }[]
}
