<template>
  <div>
    <h2>{{ title }}</h2>
    <div class="carousel-container">
      <button v-if="!isLeftDisabled" class="arrow left" @click="scrollLeft">
        <p>◀</p>
      </button>
      <div class="carousel" ref="carouselRef">
        <ul>
          <li v-for="(item, index) in contents" :key="item.id" @click="goToDetail(item)">
            <img :src="`https://image.tmdb.org/t/p/w300${item.posterPath}`" :alt="item.title || item.name" />
            <p>{{ index+1 }}위 / {{ item.title || item.name }}</p>
          </li>
        </ul>
      </div>
      <button v-if="!isRightDisabled" class="arrow right" @click="scrollRight">
        <p>▶</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import type { Content } from '@/types/tmdb'

defineProps<{
  title: string
  contents: Content[]
}>()

const carouselRef = ref<HTMLDivElement | null>(null)
const router = useRouter()

// 현재 스크롤 위치
const isLeftDisabled = ref(true)
const isRightDisabled = ref(false)

const updateButtonState = () => {
  if (!carouselRef.value) return
  const { scrollLeft, scrollWidth, clientWidth } = carouselRef.value
  isLeftDisabled.value = scrollLeft === 0
  isRightDisabled.value = Math.ceil(scrollLeft + clientWidth) >= scrollWidth
}

onMounted(() => {
  const carousel = carouselRef.value
  if (carousel) {
    updateButtonState()
    carousel.addEventListener('scroll', updateButtonState)
  }
})

const scrollLeft = () => {
  if (carouselRef.value) {
    carouselRef.value.scrollBy({
      left: -300,
      behavior: 'smooth',
    })
  }
}

const scrollRight = () => {
  if (carouselRef.value) {
    carouselRef.value.scrollBy({
      left: 300,
      behavior: 'smooth',
    })
  }
}

const goToDetail = (item: Content) => {
  router.push(`/contents/${item.id}`)
}
</script>

<style scoped>
.carousel::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

.carousel {
  display: flex;
  overflow-x: scroll;
  cursor: pointer;
}
.carousel ul {
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
}
.carousel li {
  margin-right: 16px;
}
.carousel img {
  object-fit: cover;
}
.carousel p {
  text-align: center;
  font-size: 20px;
}

.arrow {
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0 25px;
  cursor: pointer;
  z-index: 20;
  font-size: 24px;
}

.carousel-container {
  position: relative;
}

.arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.arrow.left {
  left: 0;
}

.arrow.right {
  right: 0;
}

</style>