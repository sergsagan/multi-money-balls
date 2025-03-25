<script setup>
import { reactive, ref, watch } from 'vue'
import { useStoreEntries } from 'stores/storeEntries.js'
import vSelectAll from 'src/directives/directiveSelectAll.js'
import { useLightOrDark } from 'src/composables/useLightOrDark.js'
import { Notify } from 'quasar'

/* stores */
const storeEntries = useStoreEntries()

/* add entry */
const categoryRef = ref(null)

const entryFormDefault = {
  category: '',
  amount: null,
}

const addEntryForm = reactive({
  ...entryFormDefault
})

const fieldErrors = reactive({
  category: false,
  amount: false,
})

const resetErrors = () => {
  fieldErrors.category = false
  fieldErrors.amount = false
}

const addEntryFormReset = () => {
  Object.assign(addEntryForm, entryFormDefault );
  resetErrors()
  categoryRef.value.focus()
}

const addEntryFormSubmit = () => {
  resetErrors()

  let hasError = false
  if (!addEntryForm.category) {
    fieldErrors.category = true
    hasError = true
  }
  if (addEntryForm.amount === null || isNaN(addEntryForm.amount)) {
    fieldErrors.amount = true
    hasError = true
  }

  if (hasError) {
    Notify.create({
      type: 'warning',
      message: 'Please fill in both category and amount fields',
      timeout: 1000,
    })
    return
  }

  storeEntries.addEntry(addEntryForm)
  addEntryFormReset()
}

watch(() => addEntryForm.category, val => {
  if (val) fieldErrors.category = false
})
watch(() => addEntryForm.amount, val => {
  if (val !== null && !isNaN(val)) fieldErrors.amount = false
})
</script>
<template>
  <q-form
    @submit="addEntryFormSubmit"
    class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary">
    <div class="col">
      <q-input
        ref="categoryRef"
        outlined
        dense
        :error="fieldErrors.category"
        :bg-color="useLightOrDark('white', 'black')"
        placeholder="Category"
        v-model="addEntryForm.category"
        v-select-all
      />
    </div>
    <div class="col">
      <q-input
        outlined
        dense
        input-class="text-right"
        :error="fieldErrors.amount"
        :bg-color="useLightOrDark('white', 'black')"
        placeholder="Amount"
        v-model.number="addEntryForm.amount"
        type="number"
        step="0.01"
        v-select-all
      />
    </div>
    <div class="col col-auto">
      <q-btn round color="primary" type="submit" dense icon="add" />
    </div>
  </q-form>
</template>
