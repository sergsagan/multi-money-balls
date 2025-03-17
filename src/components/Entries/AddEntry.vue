<script setup>
import { reactive, ref } from 'vue'
import { useStoreEntries } from 'stores/storeEntries.js'
import vSelectAll from 'src/directives/directiveSelectAll.js'

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

const addEntryFormReset = () => {
  Object.assign(addEntryForm, entryFormDefault )
  categoryRef.value.focus()
}

const addEntryFormSubmit = () => {
  storeEntries.addEntry(addEntryForm)
  addEntryFormReset()
}
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
        bg-color="white"
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
        bg-color="white"
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
