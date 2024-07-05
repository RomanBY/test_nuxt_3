import { AxiosInstance } from 'axios'
import BaseApi from '~/app/Modules/Api/BaseApi'

export default defineNuxtPlugin((nuxtApp) => {
  BaseApi.setClient(nuxtApp.$axios as AxiosInstance)
})
