import getBoard from '../actions/getBoard'
import Main from './Main'

// import { signOut } from 'next-auth/react'
// import TaskModal from '../Modals/TaskModal/TaskModal'

export default async function Page({ params }: { params: { board: string } }) {
  // const { openEditTask } = useOpenTaskModal()
  // const { openEditBoard } = useOpenBoardModal()
  // const { openDeleteBoard, openDeleteTask } = useOpenDeleteModal()

  const boards = await getBoard()

  console.log(boards.map((board) => board.boardName))

  return (
    <Main
      boards={boards.map((board) => (board.boardName ? board.boardName : ''))}
    />
  )
}
