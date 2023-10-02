import getBoard from '../actions/getBoard'
import Main from './Main'

// import { signOut } from 'next-auth/react'
// import TaskModal from '../Modals/TaskModal/TaskModal'

export default async function Page({ params }: { params: { board: string } }) {
  const { board } = params
  const boards = await getBoard()

  return (
    <Main
      currentBoards={boards.map((board) =>
        board.boardName ? board.boardName : '',
      )}
      boardURL={board}
    />
  )
}
