import { IResponse, TApiResponse, TValidationErrors } from '~/app/Models/Response/IResponse'
import BaseApiResponse from '~/app/Models/Response/BaseApiResponse'
import { SnackbarItem, SnackbarStatus } from '~/app/Modules/Snakbar/Contracts'

export default class ApiErrorResponse<T> extends BaseApiResponse<T> implements IResponse<T> {
  protected validationErrors: TValidationErrors = {}

  constructor (data: TApiResponse<T>) {
    super(data)
    this.setValidationErrors(data)
  }

  protected setValidationErrors (data: TApiResponse<T>) {
    if (data.errors) {
      if (Object.keys(data.errors).length > 0) {
        this.validationErrors = data.errors
      }
    }
  }

  public getValidationErrors () {
    return this.validationErrors
  }

  public getMessage () {
    return this.message
  }

  public getSnackbarInfo (): SnackbarItem {
    return {
      status: SnackbarStatus.WARNING,
      message: this.message
    }
  }
}
