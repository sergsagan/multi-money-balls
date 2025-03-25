<script setup>
import { computed } from 'vue'
import { useQuasar } from 'quasar'
import { useStoreSettings } from 'stores/storeSettings'

const $q = useQuasar()
const { settings } = useStoreSettings()

const usdToEur = computed(() => settings.exchangeRates?.['€']?.toFixed(2) || '-')
const usdToGbp = computed(() => settings.exchangeRates?.['£']?.toFixed(2) || '-')

const currencyRatesText = computed(() => {
  const current = settings.currencySymbol
  const rates = settings.exchangeRates

  if (!rates?.['€'] || !rates?.['£']) return 'Loading...'

  const isWide = $q.screen.gt.sm

  if (current === '€') {
    return isWide
      ? `EUR/USD: ${(1 / rates['€']).toFixed(2)} | EUR/GBP: ${(rates['£'] / rates['€']).toFixed(2)}`
      : `€/$: ${(1 / rates['€']).toFixed(2)} | €/£: ${(rates['£'] / rates['€']).toFixed(2)}`
  }

  if (current === '£') {
    return isWide
      ? `GBP/USD: ${(1 / rates['£']).toFixed(2)} | GBP/EUR: ${(rates['€'] / rates['£']).toFixed(2)}`
      : `£/$: ${(1 / rates['£']).toFixed(2)} | £/€: ${(rates['€'] / rates['£']).toFixed(2)}`
  }

  return isWide
    ? `USD/EUR: ${usdToEur.value} | USD/GBP: ${usdToGbp.value}`
    : `$/€: ${usdToEur.value} | $/£: ${usdToGbp.value}`
})

</script>
<template>
  <div v-if="$q.screen.gt.xs" class="text-caption text-white q-ml-md">
    {{ currencyRatesText }}
  </div>
</template>
