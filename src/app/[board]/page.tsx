import Main from './Main'
import getBoard from '../actions/getBoard'
import getColumns from '../actions/getColumns'
import getTasks from '../actions/getTasks'
import getSubtasks from '../actions/getSubtasks'

// import { signOut } from 'next-auth/react'

export default async function Page({ params }: { params: { board: string } }) {
  const { board } = params

  const boards = await getBoard()
  const columns = await getColumns(board)

  const tasks = await getTasks()
  const subtasks = await getSubtasks()

  return (
    <Main
      boardURL={board}
      currentBoards={boards}
      currentColumns={columns}
      currentTasks={tasks}
      currentSubtasks={subtasks}
    />
  )
}
