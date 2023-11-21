import Main from './Main'
import { redirect } from 'next/navigation'
import getBoard from '../actions/getBoard'
import getColumns from '../actions/getColumns'
import getTasks from '../actions/getTasks'
import getSubtasks from '../actions/getSubtasks'
import getCurrentUser from '../actions/getCurrentUser'
import HomePage from '../Components/HomePage'

export default async function Page({ params }: { params: { board: string } }) {
  const { board } = params
  const boards = await getBoard()
  const columns = await getColumns(board)
  const tasks = await getTasks()
  const subtasks = await getSubtasks()
  const currentUser = await getCurrentUser()

  if (currentUser && board === '/login')
    return <HomePage currentBoards={boards} />
  else if (currentUser && board !== '/login') {
    return (
      <Main
        boardURL={board}
        currentBoards={boards}
        currentColumns={columns}
        currentTasks={tasks}
        currentSubtasks={subtasks}
        currentUser={currentUser}
      />
    )
  } else redirect('/login')
}
