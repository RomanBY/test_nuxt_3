import { SnackbarItem } from '~/app/Modules/Snakbar/Contracts'

export interface IResponse<T> {
  getMessage (): string
  getSnackbarInfo (): SnackbarItem
  getValidationErrors (): any
  isSuccess (): boolean
  getData (): T
  getMeta (): any
  getRawResponse(): any
}

export type TValidationErrors = Record<string, string[]>

export type TApiResponse<T> = {
  data?: T,
  meta?: any,
  message?: string
  errors?: TValidationErrors
}
