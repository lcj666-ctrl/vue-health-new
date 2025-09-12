<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { showToast, type FormInstance } from 'vant'
import { useRoute, useRouter } from 'vue-router'

import { useUserStore } from '@/stores'
import { loginByPassword, sendMobileCode, loginByMobile } from '@/services/user'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'

const mobile = ref()
const password = ref('')
const code = ref('')
const form = ref<FormInstance>(null)

const agree = ref(false)
const isPass = ref(true)
const show = ref(false)

const store = useUserStore()
const router = useRouter()
const route = useRoute()

const onSubmit = async () => {
  if (!agree.value) return showToast('请勾选我已同意')
  let data: User
  if (isPass.value) {
    // 密码登录
    data = await loginByPassword(mobile.value, password.value)
  } else {
    // 短信验证码登录
    data = await loginByMobile(mobile.value, code.value)
  }
  // const res = isPass.value
  //   ? await loginByPassword(mobile.value, password.value)
  //   : await loginByMobile(mobile.value, code.value)
  store.setUser(data.data)
  // 如果有回跳地址就进行回跳，没有跳转到个人中心
  router.push(route.query.returnUrl || '/user')
  showToast('登录成功')
}
const time = ref(0)
let timeId: number
const sendCode = async () => {
  //此时的点击事件时一直存在的
  // 已经倒计时time的值大于0，此时不能发送验证码
  if (time.value > 0) return
  await form.value?.validate('mobile')
  await sendMobileCode(mobile.value, 'login')
  showToast('发送成功')
  time.value = 60
  // 倒计时
  clearInterval(timeId)
  timeId = window.setInterval(() => {
    time.value--
    if (time.value <= 0) window.clearInterval(timeId)
  }, 1000)
}

onUnmounted(() => {
  window.clearInterval(timeId)
})
// const rightIcon = () => {
//   if (show.value === false) {
//     iconName.value = 'eye-o'
//     show.value = true
//   } else {
//     iconName.value = 'closed-eye'
//     show.value = false
//   }
// }
const rightIcon = () => {
  show.value = !show.value
}
</script>

<template>
  <van-nav-bar
    right-text="注册"
    left-arrow
    @click-left="onClickLeft"
    @click-right="$router.push('/register')"
  />
  <div class="login-page">
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ isPass ? '短信验证码登录' : '密码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form autocomplete="off" @submit="onSubmit" ref="form">
      <van-field
        name="mobile"
        label="手机号"
        placeholder="请输入手机号"
        clearable
        v-model="mobile"
        type="number"
        maxlength="11"
        :rules="mobileRules"
      ></van-field>
      <van-field
        v-if="isPass"
        label="密码"
        placeholder="请输入密码"
        v-model="password"
        :type="show ? 'text' : 'password'"
        :rules="passwordRules"
        @click-right-icon="rightIcon()"
      >
        <template #right-icon>
          <!-- <van-icon :name="iconName" /> -->
          <cp-icon :name="`login-eye-${show ? 'on' : 'off'}`"></cp-icon>
        </template>
      </van-field>
      <van-field
        v-else
        v-model="code"
        center
        clearable
        type="number"
        label="短信验证码"
        maxlength="6"
        placeholder="请输入短信验证码"
        :rules="codeRules"
      >
        <template #button>
          <span
            class="btn-send"
            :class="{ active: time > 0 }"
            @click="sendCode()"
          >
            {{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}</span
          >
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit"
          >登 录</van-button
        >
      </div>
      <div class="cp-cell">
        <a v-if="isPass" href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 5px;
  }
  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}
.van-form {
  padding: 0 14px;
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
  .btn-send {
    color: var(--cp-primary);
    &.active {
      color: rgba(22, 194, 163, 0.5);
    }
  }
  .span-code {
    color: var(--cp-primary);
  }
}
</style>
