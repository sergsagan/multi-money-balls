import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import { Dark } from 'quasar'
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

  watch(() => settings.darkMode, value => {
    Dark.set(value)
  }, { immediate: true })
  /* getters */

  /* actions */
  async function fetchExchangeRates() {
    settings.exchangeRates = await useExchangeRates() // Оновлюємо курси валют
  }

  /* returns */
  return { settings, fetchExchangeRates }
})
