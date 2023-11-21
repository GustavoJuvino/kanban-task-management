import { redirect } from 'next/navigation'
import getCurrentUser from './actions/getCurrentUser'
import HomePage from './Components/HomePage'
import getBoard from './actions/getBoard'

export default async function Home() {
  const boards = await getBoard()
  const currentUser = await getCurrentUser()

  if (currentUser) return <HomePage currentBoards={boards} />
  else redirect('/login')
}
