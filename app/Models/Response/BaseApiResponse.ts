import { TApiResponse } from '~/app/Models/Response/IResponse'

export default class BaseApiResponse<T> {
  protected message = ''
  protected rawResponse: any = null

  constructor (data: TApiResponse<T>) {
    this.rawResponse = data
    this.message = data.message || 'Error'
  }

  public getRawResponse () {
    return this.rawResponse
  }

  public isSuccess () {
    return false
  }

  public getValidationErrors () {
    return {}
  }

  public getMessage () {
    return this.message
  }

  public getData (): T {
    return null as T
  }

  public getMeta (): any {
    return null
  }
}
