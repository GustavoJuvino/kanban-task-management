import { redirect } from 'next/navigation'
import getCurrentUser from './actions/getCurrentUser'
import HomePage from './Components/HomePage'

export default async function Home() {
  const currentUser = await getCurrentUser()

  if (currentUser) return <HomePage />
  else redirect('/login')
}
