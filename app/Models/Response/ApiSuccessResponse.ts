import { IResponse, TApiResponse } from '~/app/Models/Response/IResponse'
import BaseApiResponse from '~/app/Models/Response/BaseApiResponse'
import { SnackbarItem, SnackbarStatus } from '~/app/Modules/Snakbar/Contracts'

export default class ApiSuccessResponse<T> extends BaseApiResponse<T> implements IResponse<T> {
  private responseData: T
  private responseMeta: any

  public constructor (rawResponse: TApiResponse<T>) {
    super(rawResponse)
    this.responseData = rawResponse.data!
    this.responseMeta = rawResponse.meta!
  }

  public getData (): T {
    return this.responseData
  }

  public getMeta (): any {
    return this.responseMeta
  }

  getSnackbarInfo (): SnackbarItem {
    return {
      message: this.getMessage(),
      status: SnackbarStatus.SUCCESS
    }
  }

  public getMessage () {
    return this.message || 'Success'
  }

  public isSuccess () {
    return true
  }
}
