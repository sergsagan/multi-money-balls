import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import { Dark, LocalStorage } from 'quasar'
import { useExchangeRates } from 'src/composables/useExchangeRates.js'

export const useStoreSettings = defineStore("settings", () => {
  /* state */
  const settings = reactive({
    promptToDelete: true,
    showRunningBalance: false,
    currencySymbol: '$',
    darkMode: true,
    exchangeRates: {}
  })

  // watch dark mode
  watch(() => settings.darkMode, value => {
    Dark.set(value)
  }, { immediate: true })

  watch(settings, () => {
    saveSettings()
  })

  /* getters */

  /* actions */
  async function fetchExchangeRates() {
    settings.exchangeRates = await useExchangeRates() // Оновлюємо курси валют
  }

  const saveSettings = () => {
    LocalStorage.set('settings', settings)
  }

  const loadSettings = () => {
    const savedSettings = LocalStorage.getItem('settings')
    if (savedSettings) {
      Object.assign(settings, savedSettings)
    }
  }

  /* returns */
  return { settings, fetchExchangeRates, loadSettings }
})
