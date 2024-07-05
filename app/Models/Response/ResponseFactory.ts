import { AxiosResponse } from 'axios'
import ApiSuccessResponse from '~/app/Models/Response/ApiSuccessResponse'
import ApiErrorResponse from '~/app/Models/Response/ApiErrorResponse'
import { IResponse } from '~/app/Models/Response/IResponse'
import ApiFailedResponse from '~/app/Models/Response/ApiFailedResponse'

export default class ResponseFactory {
  public static create<T> (response: AxiosResponse<any>): IResponse<T> {
    if (response) {
      switch (response.status) {
        case 200:
        case 201:
        case 204:
          return new ApiSuccessResponse<T>(response)
        case 400:
        case 401:
        case 404:
        case 422:
          return new ApiErrorResponse<T>(response)
        default:
          return new ApiFailedResponse<T>(response)
          break
      }
    }
    return new ApiFailedResponse<T>(response)
  }
}
