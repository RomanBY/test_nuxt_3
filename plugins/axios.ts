import axios from 'axios'
export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const defaultUrl = runtimeConfig.public.apiUrl as string
  const token = runtimeConfig.public.accessToken
  const api = axios.create({
    baseURL: defaultUrl,
    headers: {
      common: {}
      // Authorization: `Bearer ${token}`
    },
    // auth: {
    //   username: 'megatop',
    //   password: 'megatop'
    // },
    withCredentials: false
  })
  return {
    provide: {
      axios: api
    }
  }
})

