<script setup lang="ts">
import { Button as vanButton } from 'vant'
</script>

<template>
  <div class="abc">class="div1"</div>
  <div class="div1">class="div2"</div>
  <!-- 验证vant颜色被覆盖 -->
  <van-button type="primary">按钮</van-button>
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
