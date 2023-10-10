import { redirect } from 'next/navigation'
import getCurrentUser from './actions/getCurrentUser'
import HomePage from './Components/HomePage'
import getBoard from './actions/getBoard'

export default async function Home() {
  const currentUser = await getCurrentUser()
  const boards = await getBoard()

  if (currentUser)
    return (
      <HomePage
        // currentBoards={boards.map((board) =>
        //   board.boardName ? board.boardName : '',
        // )}
        currentBoards={boards}
      />
    )
  else redirect('/login')
}
