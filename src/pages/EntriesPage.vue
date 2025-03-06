<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-item v-for="entry in entries" :key="entry.id">
          <q-item-section>
            {{ entry.name }}
          </q-item-section>

          <q-item-section side>
            {{ currencify(entry.amount) }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const entries = ref([
  {
    id: 'id1',
    name: 'Salary',
    amount: 4999.99
  },
  {
    id: 'id2',
    name: 'Rent',
    amount: -700
  },
  {
    id: 'id3',
    name: 'Phone',
    amount: -12.99
  },
  {
    id: 'id4',
    name: 'Unknown',
    amount: 0
  }
])

function currencify(amount) {
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
</script>
