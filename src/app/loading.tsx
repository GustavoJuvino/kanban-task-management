'use client'

import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar'
import useSaveCurrentUser from './hooks/useSaveCurrentUser'

export default function Loading() {
  const { currentUser } = useSaveCurrentUser()

  if (currentUser?.email)
    return (
      <>
        <section className="flex h-auto w-auto max-sm:justify-center">
          <Sidebar />
        </section>

        <section className="flex h-full w-full flex-col overflow-x-hidden">
          <Header />
          <div className="relative flex h-full w-full items-center justify-center">
            <article className="absolute top-[20%] flex flex-col items-center">
              <ClimbingBoxLoader color="#635FC7" size={15} />

              <h2 className="text-center text-heading-m text-medium-gray sm:text-heading-l">
                Loading Columns and Tasks...
              </h2>
            </article>
          </div>
        </section>
      </>
    )
  else
    return (
      <section className="flex h-full w-full flex-col overflow-x-hidden">
        <div className="relative flex h-full w-full items-center justify-center">
          <article className="absolute top-[20%] flex flex-col items-center">
            <ClimbingBoxLoader color="#635FC7" size={15} />

            <h2 className="text-center text-heading-m text-medium-gray sm:text-heading-l">
              Loading User Infos...
            </h2>
          </article>
        </div>
      </section>
    )
}
