const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD'
export async function useExchangeRates() {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()

    return {
      '€': data.rates.EUR,
      '£': data.rates.GBP,
    }
  } catch (error) {
    console.error('Error retrieving exchange rates:', error)
    return { '€': 0.9, '£': 0.75 }
  }
}
