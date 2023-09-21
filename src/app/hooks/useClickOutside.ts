import { useCallback } from 'react'

const useClickOutside = () => {
  // ref = the element
  const clickOutside = useCallback(
    (ref: React.MutableRefObject<any>, method: any) => {
      const handler = (e: MouseEvent) => {
        if (!ref.current?.contains(e.target as Node)) {
          return method(false)
        }
      }

      document.addEventListener('mousedown', (e: MouseEvent) => handler(e))

      return () => {
        document.removeEventListener('mousedown', (e: MouseEvent) => handler(e))
      }
    },
    [],
  )

  return {
    clickOutside,
  }
}

export default useClickOutside
