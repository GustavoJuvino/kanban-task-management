import getBoard from '../actions/getBoard'
import getColumns from '../actions/getColumns'
import Main from './Main'

// import { signOut } from 'next-auth/react'
// import TaskModal from '../Modals/TaskModal/TaskModal'

export default async function Page({ params }: { params: { board: string } }) {
  const { board } = params
  const boards = await getBoard()
  const columns = await getColumns(board)

  return (
    <Main
      // currentBoards={boards.map((board) =>
      //   board.boardName ? board.boardName : '',
      // )}
      currentBoards={boards}
      boardURL={board}
      currentColumns={columns}
    />
  )
}
