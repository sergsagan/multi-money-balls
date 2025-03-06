export function useCurrencify(amount) {
  let posNegSymbol = ''
  if (amount > 0) {
    posNegSymbol = '+'
  } else if (amount < 0) {
    posNegSymbol = '-'
  }

  const currencySymbol = '$'

  const amountPositive = Math.abs(amount)

  const amountFormatted = amountPositive.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${posNegSymbol} ${currencySymbol} ${amountFormatted}`
}
