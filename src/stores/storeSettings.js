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

  // watch save settings
  watch(() => settings.currencySymbol, () => {
    saveSettings();
  });

  /* actions */
  async function fetchExchangeRates() {
    settings.exchangeRates = await useExchangeRates()
  }

  const saveSettings = () => {
    LocalStorage.set('settings', JSON.parse(JSON.stringify(settings)));
  };

  const loadSettings = () => {
    const savedSettings = LocalStorage.getItem('settings');
    if (savedSettings) {
      Object.assign(settings, savedSettings);
    }

    if (settings.currencySymbol !== savedSettings?.currencySymbol) {
      settings.currencySymbol = savedSettings?.currencySymbol || '$';
    }
  };
  /* returns */
  return { settings, fetchExchangeRates, loadSettings }
})
