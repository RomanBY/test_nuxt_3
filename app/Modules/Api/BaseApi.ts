import { AxiosRequestConfig, AxiosInstance } from 'axios'
import ResponseFactory from '~/app/Models/Response/ResponseFactory'
import { IResponse } from '~/app/Models/Response/IResponse'

export default class BaseApi {
  constructor (protected customClient?: AxiosInstance) {
  }

  protected static defaultClient: AxiosInstance
  public static device = ''

  get client (): AxiosInstance {
    return this.customClient || BaseApi.defaultClient
  }

  public static setClient (client: AxiosInstance, device?: string) {
    if (device) {
      this.device = device
    }
    this.defaultClient = client
  }

  public static setClientToken (token: string) {
    BaseApi.defaultClient.defaults.headers.Authorization = `Bearer ${token}`
  }

  public async get<T> (url: string, options: any = null): Promise<IResponse<T>> {
    try {
      if (BaseApi.device) {
        if (!options) {
          options = {}
        }
        options.device = BaseApi.device
      }
      const response = await this.client.get(url, { params: options })
      return ResponseFactory.create<T>(response)
    } catch (error: any) {
      console.error(error)
      return ResponseFactory.create<T>(error.response)
    }
  }

  public async post<T> (url: string, data: any, config?: AxiosRequestConfig): Promise<IResponse<T>> {
    try {
      const response = await this.client.post(url, data, config)
      return ResponseFactory.create<T>(response)
    } catch (error: any) {
      console.error(error)
      return ResponseFactory.create<T>(error.response)
    }
  }

  public async put<T> (url: string, data: any): Promise<IResponse<T>> {
    try {
      const response = await this.client.put(url, data)
      return ResponseFactory.create<T>(response)
    } catch (error: any) {
      console.error(error)
      return ResponseFactory.create<T>(error.response)
    }
  }

  public async delete<T> (url: string, options: any = null): Promise<IResponse<T>> {
    try {
      const response = await this.client.delete(url, { params: options })
      return ResponseFactory.create<T>(response)
    } catch (error: any) {
      console.error(error)
      return ResponseFactory.create<T>(error.response)
    }
  }
}
