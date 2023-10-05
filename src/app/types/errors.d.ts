import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

type InputErrorProps =
  | Merge<
      FieldError,
      (
        | Merge<
            FieldError,
            FieldErrorsImpl<{
              columnName: string
              id: number
              color: string
            }>
          >
        | undefined
      )[]
    >
  | undefined
