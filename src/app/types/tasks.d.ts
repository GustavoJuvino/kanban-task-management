interface TaskProps {
  id: string
  itemID: string
  taskItemID: string
  columnID: string
  title: string
  status: string | null
  fromBoard: string
  fromColumn: string
  description: string
  updateTitle: string
  updateColumn: string
  subtasksIDS?: string[]
}
