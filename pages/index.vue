<template>
  <div>
    <Carousel :title="'영화 TOP 20'" :contents="movies" />
    <Carousel :title="'시리즈 TOP 20'" :contents="series" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Content, ContentResponse } from '@/types/tmdb'
import Carousel from '@/components/Carousel.vue'

const movies = ref<Content[]>([])
const series = ref<Content[]>([])

onMounted(async () => {
  const { $tmdb } = useNuxtApp();
  try {
    const movieRes = await $tmdb.get<ContentResponse>('/movie/popular')
    movies.value = movieRes.data.results

    const seriesRes = await $tmdb.get<ContentResponse>('/tv/popular')
    series.value = seriesRes.data.results
    
    console.log('movieRes ::: ', movieRes.data.results)
    console.log('seriesRes ::: ', seriesRes.data.results)
  } catch (error) {
    console.error('Popular top 20 error : ', error)
  }
})
</script>

