import { NuxtApp } from 'nuxt/app';
import { AxiosInstance } from 'axios';

declare module 'nuxt/app' {
  interface NuxtApp {
    $tmdb: AxiosInstance;
    $axios: AxiosInstance;
  }
}

declare module '#app' {
  interface NuxtApp {
    $tmdb: AxiosInstance;
    $axios: AxiosInstance;
  }
}

export {}