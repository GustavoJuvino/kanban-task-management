import getBoard from '../actions/getBoard'
import getColumns from '../actions/getColumns'
import getTasks from '../actions/getTasks'
import Main from './Main'

// import { signOut } from 'next-auth/react'

export default async function Page({ params }: { params: { board: string } }) {
  const { board } = params
  const tasks = await getTasks()
  const boards = await getBoard()
  const columns = await getColumns(board)

  return (
    <Main
      boardURL={board}
      currentBoards={boards}
      currentColumns={columns}
      currentTasks={tasks}
    />
  )
}
