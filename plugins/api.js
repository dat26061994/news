export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  })

  // Set baseURL to something different
  const BASE_URL = process.env.VUE_APP_API
  api.setBaseURL(BASE_URL)

  // Inject to context as $api
  inject('api', api)
}