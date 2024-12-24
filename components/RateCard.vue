<template>
  <div>
    <h2>코멘트</h2>
    <div class="container">
      <div class="rate__container" v-for="(item, index) in rates" :key="index">
        <div class="header">
          <div class="sub__header">
            <div class="user__container">
              <div class="user">
                <img src="" alt="" style="width: 32px; height: 32px" />
                <p>{{ item.nickname }}</p>
              </div>
              <div class="rate">
                <el-icon>
                  <StarFilled />
                </el-icon>
                {{ item.score.toFixed(1) }}
              </div>
            </div>
            <hr />
            <div class="comment">
              <p>{{ item.comment }}</p>
            </div>
          </div>
        </div>
        <div class="footer">
          <hr />
          <p style="color: #ff2f6e; font-size: 1.11em">좋아요</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Rate } from "~/types/rate";

const props = defineProps<{
  rates: Rate[];
}>();

onMounted(() => {
  console.log("rates props 확인 ::: ", props.rates);
});
</script>

<style scoped>
p {
  margin: 0;
}

hr {
  border: 1px solid #00000014;
  width: 100%;
  margin: 20px 0;
}

.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); /* 최소 330px, 공간에 따라 크기 조정 */
  gap: 18px;
  justify-content: center;
}

.rate__container {
  background-color: #f5f5f5;
  border-radius: 6px;
  padding: 20px;
  aspect-ratio: 1; /* 정사각형 비율 유지 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box; /* 패딩 포함 크기 계산 */
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sub__header {
  display: flex;
  flex-direction: column;
}

.user__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user {
  display: flex;
  align-items: center;
  gap: 8px;
}
.rate {
  display: flex;
  align-items: center;
  border: 1px solid #00000014;
  padding: 3px 13px;
  border-radius: 13px;
  gap: 2px;
  background-color: #fff;
}
</style>
