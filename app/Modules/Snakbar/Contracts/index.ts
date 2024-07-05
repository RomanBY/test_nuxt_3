export enum SnackbarStatus {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
  SIMPLE = 'simple'
}

export interface SnackbarItem {
  status: SnackbarStatus
  message: string
  timestamp?: number
  isPermanent?: boolean
}
