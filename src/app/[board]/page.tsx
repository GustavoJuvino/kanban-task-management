import getBoard from '../actions/getBoard'
import Main from './Main'

// import { signOut } from 'next-auth/react'
// import TaskModal from '../Modals/TaskModal/TaskModal'

export default async function Page({ params }: { params: { board: string } }) {
  const { board } = params

  const boards = await getBoard()

  const currentBoards = ['WebDesign', 'Webdesign2'] as const
  type Board = (typeof currentBoards)[number]

  // // user-defined guard
  const isBoard = (value: any): value is Board => currentBoards.includes(value)

  if (isBoard(board))
    return (
      <Main
        currentBoards={boards.map((board) =>
          board.boardName ? board.boardName : '',
        )}
      />
    )
  else return <h1>Page not Founded</h1>
}
