<template>
  <el-dialog
    ref="login"
    title="로그인"
    width="30%"
    v-model="props.isLoginVisible"
  >
    <el-form ref="loginFormRef">
      <el-form-item label="이메일" prop="email">
        <el-input placeholder="이메일" />
      </el-form-item>
      <el-form-item label="비밀번호" prop="pwd">
        <el-input type="password" placeholder="비밀번호" />
      </el-form-item>
    </el-form>

    <div class="footer">
      <el-button>취소</el-button>
      <el-button>로그인</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  isLoginVisible: boolean
}>()
</script>

<style scoped>
.el-dialog__body {
  padding: 20px;
}
</style>