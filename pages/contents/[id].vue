<template>
  <div class="container">
    <div class="detail__container">
      <img :src="`https://image.tmdb.org/t/p/w300${info?.posterPath}`" alt="">
      <div class="content__info">
        <h1>{{ info?.title }}</h1>
        <h3>{{ info?.originalTitle }}</h3>
        <el-progress type="circle" :percentage="info?.voteAverage ? info.voteAverage * 10 : 0" />
        <p>{{ info?.overview }}</p>
      </div>
    </div>
    <div class="similar__container">유사한 작품</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import type { Detail } from '@/types/tmdb'

const info = ref<Detail | undefined>(undefined)
const id = ref<string | undefined>(undefined) // 콘텐츠 고유 id 값
const route = useRoute()

onMounted(async () => {
  id.value = route.params.id as string
  console.log('id .... ', id.value)
  const { $tmdb } = useNuxtApp()
  try {
    const res = await $tmdb.get<Detail>(`/movie/${id.value}`)
    console.log('상세 : ', res)
    info.value = res.data
  } catch (error) {
    console.error('상세정보 error : ', error)
  }
})

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  border: 3px solid blue;
}

.detail__container {
  padding: 10px 20px 10px 10px;
  display: flex;
  gap: 30px;
  border: 3px solid red
}
</style>


