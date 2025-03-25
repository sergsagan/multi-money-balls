import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { LocalStorage } from 'quasar'

export const useAuth = defineStore('auth', () => {
  const user = ref(LocalStorage.getItem('user') || null)
  const isLoggedIn = computed(() => user.value !== null)

  function login(credentials) {
    user.value = credentials
    LocalStorage.set('user', credentials)
  }

  function logout(callback = null) {
    user.value = null
    LocalStorage.remove('user')
    console.log('Logging out...')
    if (typeof callback === 'function') callback()
  }

  return { user, isLoggedIn, login, logout }
})
