<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-item v-for="entry in entries" :key="entry.id">
          <q-item-section class="text-weight-bold" :class="useAmountColorClass(entry.amount)">
            {{ entry.name }}
          </q-item-section>

          <q-item-section side class="text-weight-bold" :class="useAmountColorClass(entry.amount)">
            {{ useCurrencify(entry.amount) }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-footer class="bg-transparent">
      <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
        <div class="col text-grey-7 text-h6">
          Balance:
        </div>
        <div
          :class="useAmountColorClass(balance)"
          class="col text-h6 text-right">
          {{ useCurrencify(balance) }}
        </div>
      </div>
      <div class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary">
        <div class="col">
          <q-input
            outlined
            dense
            bg-color="white"
            placeholder="Name"
            model-value=""
          />
        </div>
        <div class="col">
          <q-input
            outlined
            dense
            input-class="text-right"
            bg-color="white"
            placeholder="Amount"
            model-value=""
            type="number"
            step="0.01"
          />
        </div>
        <div class="col col-auto">
          <q-btn round color="primary" dense icon="add" />
        </div>
      </div>
    </q-footer>
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useCurrencify } from '../composables/useCurrencify.js'
import { useAmountColorClass} from '../composables/useAmountColorClass.js'

const entries = ref([
  {
    id: 'id1',
    name: 'Salary',
    amount: 4125.00
  },
  {
    id: 'id2',
    name: 'Rent',
    amount: -720
  },
  {
    id: 'id3',
    name: 'Phone',
    amount: -12.99
  },
  {
    id: 'id4',
    name: 'Food',
    amount: -800
  },
  {
    id: 'id5',
    name: 'Unknown',
    amount: 0
  }
])

const balance = computed(() => {
  return entries.value.reduce((acc, { amount }) => {
    return acc + parseFloat(amount)
  }, 0)
})
</script>
