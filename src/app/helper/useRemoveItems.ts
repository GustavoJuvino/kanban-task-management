import { useCallback } from 'react'

export const useRemoveItems = (type: any) => {
  const removeItem = useCallback((index: number, arr: typeof type) => {
    const updateArray = [...arr]

    updateArray.splice(index, 1)

    return updateArray
  }, [])
  return { removeItem }
}
