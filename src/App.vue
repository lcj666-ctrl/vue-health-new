<script setup lang="ts">
import { Button as vanButton } from 'vant'

// import { useUserStore } from './stores/user.ts'
import { useUserStore } from './stores'
import type { User } from '@/types/user'

function getChange(u: User) {
  useUserStore().setUser(u)
}
</script>

<template>
  <div class="abc">class="div1"</div>
  <div class="div1">class="div2"</div>
  <!-- 验证vant颜色被覆盖 -->
  <van-button type="primary" @click="getChange({ token: '123', id: '123', account: '123', mobile: '123', avatar: '123' })">按钮</van-button>
  <van-button type="primary" @click="useUserStore().delUser">delUser</van-button>

  useUserStore-state1 {{ useUserStore().user }}
</template>

<style scoped lang="scss">
.abc {
  color: var(--cp-primary);
  background-color: var(--footer-color);
}
.div1 {
  color: var(--hahaha);
  background-color: var(--footer-color);
}
</style>
