<template>
  <div class="container">
    <div class="detail__container">
      <img :src="`https://image.tmdb.org/t/p/w300${info?.posterPath}`" alt="" />
      <div class="content__info">
        <h1>{{ info?.title || info?.name }}</h1>
        <h3 style="margin: 0;">{{ info?.originalTitle || info?.originalName }}</h3>
        <el-progress style="margin: 30px 0"
          type="circle"
          :percentage="info?.voteAverage ? Math.ceil(info.voteAverage * 10) : 0"
        />
        <h2 style="margin: 0 0 5px 0">줄거리</h2>
        <p style="margin: 0">{{ info?.overview }}</p>
        <el-tag style="margin: 15px 5px;" v-if="info?.genres" v-for="item in info?.genres" type="info">{{ item.name }}</el-tag>
      </div>
    </div>
    <div class="similar__container">
      <Carousel :title="'비슷한 작품'" :contents="similar" :type="type" :img-width="150" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import type { Content, Detail, ContentResponse } from "@/types/tmdb"
import Carousel from '@/components/Carousel.vue'

const info = ref<Detail | undefined>(undefined)
const similar = ref<Content[]>([])

const id = ref<string | undefined>(undefined) // 콘텐츠 고유 id 값
const route = useRoute()
const type = route.query.type as string

let detailRes: { data: Detail } | null = null
let similarRes: { data: ContentResponse } | null = null

onMounted(async () => {
  id.value = route.params.id as string
  const { $tmdb } = useNuxtApp()

  if (type === "m") {
    try {
      detailRes = await $tmdb.get<Detail>(`/movie/${id.value}`)
      info.value = detailRes.data

      similarRes = await $tmdb.get<ContentResponse>(`/movie/${id.value}/similar`)
      if (similarRes) {
        similar.value = similarRes.data.results
        console.log('similar res : ', similar.value)
      }
    } catch (error) {
      console.error("영화 상세정보 error : ", error)
    }
  } else if (type === "s") {
    detailRes = await $tmdb.get<Detail>(`/tv/${id.value}`)
    info.value = detailRes.data

    similarRes = await $tmdb.get<ContentResponse>(`/tv/${id.value}/similar`)
    if (similarRes) {
      similar.value = similarRes.data.results
    }
  }
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detail__container {
  padding: 20px;
  display: flex;
  gap: 30px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.similar__container {
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

h1 {
  margin: 0;
}
</style>
