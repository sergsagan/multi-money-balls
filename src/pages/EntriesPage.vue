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
      <q-form
        @submit="addEntry"
        class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary">
        <div class="col">
          <q-input
            ref="nameRef"
            outlined
            dense
            bg-color="white"
            placeholder="Name"
            v-model="addEntryForm.name"
          />
        </div>
        <div class="col">
          <q-input
            outlined
            dense
            input-class="text-right"
            bg-color="white"
            placeholder="Amount"
            v-model.number="addEntryForm.amount"
            type="number"
            step="0.01"
          />
        </div>
        <div class="col col-auto">
          <q-btn round color="primary" type="submit" dense icon="add" />
        </div>
      </q-form>
    </q-footer>
  </q-page>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useCurrencify } from '../composables/useCurrencify.js'
import { useAmountColorClass} from '../composables/useAmountColorClass.js'
import { uid } from 'quasar'

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

const nameRef = ref(null)

const entryFormDefault = {
  name: '',
  amount: null,
}

const addEntryForm = reactive({
  ...entryFormDefault
})

const addEntryFormReset = () => {
  Object.assign(addEntryForm, entryFormDefault )
  nameRef.value.focus()
}

const addEntry = () => {
  const newEntry = Object.assign({}, addEntryForm, {id: uid() })
  entries.value.push(newEntry)
  addEntryFormReset()
}
</script>
