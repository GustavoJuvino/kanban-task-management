import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

type ColumnsErrorsProps =
  | Merge<
      FieldError,
      (
        | Merge<
            FieldError,
            FieldErrorsImpl<{
              columnName: string
              id: number
              color: string
              updateColumnName: string
            }>
          >
        | undefined
      )[]
    >
  | undefined

type SubtasksErrorsProps =
  | Merge<
      FieldError,
      (
        | Merge<
            FieldError,
            FieldErrorsImpl<{
              name: string
              subtaskID: number
              completed: boolean
            }>
          >
        | undefined
      )[]
    >
  | undefined
