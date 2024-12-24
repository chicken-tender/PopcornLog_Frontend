<template>
  <div class="container">
    <div class="detail__container">
      <img :src="`https://image.tmdb.org/t/p/w300${info?.posterPath}`" alt="" />
      <div class="content__info">
        <h1>{{ info?.title || info?.name }}</h1>
        <h3 style="margin: 0;">{{ info?.originalTitle || info?.originalName }}</h3>
        <div class="rate__group">
          <el-rate v-model="score" allow-half clearable size="large" />
          <el-progress 
            style="margin: 20px 0"
            type="circle"
            :percentage="info?.voteAverage ? Math.ceil(info.voteAverage * 10) : 0"
          />
        </div>
        <h2 style="margin: 0 0 5px 0">줄거리</h2>
        <p style="margin: 0">{{ info?.overview }}</p>
        <el-tag 
          style="margin: 15px 5px;" 
          v-if="info?.genres" 
          v-for="item in info?.genres" type="info">
            {{ item.name }}
        </el-tag>
      </div>
    </div>
    <div class="rate__container">
      <RateCard :rates="rate?.data || []" />
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
import type { Rate, RateParams } from "@/types/rate"
import Carousel from '@/components/Carousel.vue'
import RateCard from '@/components/RateCard.vue'

const info = ref<Detail | undefined>(undefined)
const similar = ref<Content[]>([])
const score = ref()

const route = useRoute()

const id = route.params.id as string
const type = route.query.type as string

let detailRes: { data: Detail } | null = null
let similarRes: { data: ContentResponse } | null = null
const rate = ref<{ data: Rate[] } | null>({ data: [] }) // 초기값 빈 배열로 설정

const params: RateParams = {
  contentId: parseInt(id, 10)
}
const { $tmdb, $axios } = useNuxtApp()

const getRateList = async (params: RateParams) => {
  try {
    const response = await $axios.post('/rates/inqRatesByContentId', params)
    rate.value = { data: response.data?.extraData?.result || [] }
    console.log('콘텐츠 리뷰 ::: ', rate.value)
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {

  getRateList(params);

  if (type === "m") {
    try {
      detailRes = await $tmdb.get<Detail>(`/movie/${id}`)
      info.value = detailRes.data

      similarRes = await $tmdb.get<ContentResponse>(`/movie/${id}/similar`)
      if (similarRes) {
        similar.value = similarRes.data.results
        // console.log('similar res : ', similar.value)
      }
    } catch (error) {
      console.error("영화 상세정보 error : ", error)
    }
  } else if (type === "s") {
    detailRes = await $tmdb.get<Detail>(`/tv/${id}`)
    info.value = detailRes.data

    similarRes = await $tmdb.get<ContentResponse>(`/tv/${id}/similar`)
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
  margin-top: 10px;
}

.detail__container {
  padding: 20px;
  display: flex;
  gap: 30px;
  border-radius: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.similar__container {
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.rate__container {
  padding: 20px;
  border-radius: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.rate__group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.el-progress--circle .el-progress__text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 원의 정중앙으로 텍스트를 배치 */
  font-size: 20px; /* 텍스트 크기 조정 (필요시) */
  font-weight: bold; /* 텍스트 두껍게 (필요시) */
}

.el-rate {
    --el-rate-icon-size: 30px;
}

h1 {
  margin: 0;
}
</style>
