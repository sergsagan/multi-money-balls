import { useStoreSettings } from 'stores/storeSettings.js'
import { computed } from 'vue'
const storeSettings = useStoreSettings()

export function useCurrencify(amount) {
  let posNegSymbol = ''
  if (amount > 0) {
    posNegSymbol = '+'
  } else if (amount < 0) {
    posNegSymbol = '-'
  }

  const currencySymbol = storeSettings.settings.currencySymbol

  const amountPositive = Math.abs(amount)

  let amountFormatted = amountPositive.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const exchangeRate = computed(() => storeSettings.settings.exchangeRates[currencySymbol] || 1)

  if (currencySymbol !== '$') {
    amountFormatted = (parseFloat(amountFormatted.replace(/,/g, '')) * exchangeRate.value).toFixed(2)
  }

  return `${posNegSymbol} ${currencySymbol} ${amountFormatted}`
}
