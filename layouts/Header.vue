<template>
  <header>
    <nav class="header-navbar">
      <div class="navbar__hamburger-logo" href="">
        <img
          class="navbar__logo"
          src="@/public/images/logo.png"
          alt="로고 이미지"
          @click="goToHome"
          style="cursor: pointer"
        />
        <ul class="navbar__menu">
          <li>홈</li>
          <li>영화</li>
          <li>시리즈</li>
        </ul>
      </div>
      <ul class="navbar__icons">
        <div class="input-with-icon">
          <el-icon><Search /></el-icon>
          <input type="text" placeholder="제목, 출연진을 검색해보세요" />
        </div>
        <li class="user">
          <el-button link @click="openLoginModal">로그인</el-button>
        </li>
        <li class="alarm">
          <el-button plain>회원가입</el-button>
        </li>
      </ul>
    </nav>
  </header>

  <LoginModal :isLoginVisible="isLoginVisible" />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import LoginModal from "~/components/LoginModal.vue"

const router = useRouter()
const goToHome = () => {
  router.push('/')
}

const isLoginVisible = ref(false)
const openLoginModal = () => {
  console.log('openLoginModal before ::: ', isLoginVisible.value)
  isLoginVisible.value = true
  console.log('openLoginModal after ::: ', isLoginVisible.value)
}
</script>
<style scoped>
li {
  list-style: none;
}

.header-navbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.navbar__hamburger-logo {
  display: flex;
  align-items: center;
  gap: 20px;
}

.navbar__logo {
  width: 150px;
}

.navbar__menu {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 18px;
  margin: 0;
  padding: 0;
}

.navbar__icons {
  justify-content: flex-end;
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
  width: 280px;
}

.input-with-icon i {
  position: absolute;
  left: 250px;
  color: #888;
  pointer-events: none;
}

.input-with-icon input {
  width: 100%;
  padding: 10px;
  border: 1px solid #f5f5f5;
  background-color: #f5f5f5;
  border-radius: 3px;
  font-size: 14px;
}
</style>
