import { redirect } from 'next/navigation'
import getCurrentUser from './actions/getCurrentUser'
import Dashboard from './Components/Dashboard'

export default async function Home() {
  const currentUser = await getCurrentUser()

  if (currentUser) return <Dashboard />
  else redirect('/login')
}
