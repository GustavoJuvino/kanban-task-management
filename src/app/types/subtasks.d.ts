interface SubtaskProps {
  id: string
  name: string
  fromTask: string
  subtaskID: string
  taskID?: string
  completed: boolean
  fromBoard: string
  fromColumn: string
}
