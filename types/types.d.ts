import { NuxtApp } from 'nuxt/app';
import { AxiosInstance } from 'axios';

declare module 'nuxt/app' {
  interface NuxtApp {
    $tmdb: AxiosInstance;
  }
}

declare module '#app' {
  interface NuxtApp {
    $tmdb: AxiosInstance;
  }
}

export {}