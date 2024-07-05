import BaseApiResponse from '~/app/Models/Response/BaseApiResponse'
import { SnackbarItem, SnackbarStatus } from '~/app/Modules/Snakbar/Contracts'

export default class ApiFailedResponse<T> extends BaseApiResponse<T> {
  constructor (private data: any) {
    super(data)
    console.error(data.error)
  }

  public getSnackbarInfo (): SnackbarItem {
    return {
      status: SnackbarStatus.ERROR,
      message: 'Error'
    }
  }
}
