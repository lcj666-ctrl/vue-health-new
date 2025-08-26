import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// ● 用户信息仓库创建

export const useUserStore = defineStore(
  'cp-user',
  () => {
    // 用户信息
    const user = ref<User>()
    // 设置用户，登录后使用
    const setUser = (u: User) => {
      user.value = u
    }
    // 清空用户，退出后使用
    const delUser = () => {
      user.value = undefined
    }
    return { user, setUser, delUser }
  },
  {
    persist: {
      storage: localStorage,
      pick: ['user']
    }
  }
)
