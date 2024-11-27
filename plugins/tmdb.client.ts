import axios from 'axios';
import { toCamelCase } from '@/utils/caseConverter';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
      api_key: config.public.apiKey,
      language: 'ko-KR'
    }
  })

  // 응답 데이터 변환(snake -> camel)
  api.interceptors.response.use((res) => {
    res.data = toCamelCase(res.data)
    return res
  })

  nuxtApp.provide('tmdb', api)
})