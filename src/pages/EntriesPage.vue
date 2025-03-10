<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-slide-item
          v-for="entry in storeEntries.entries"
          :key="entry.id"
          @right="onEntrySlideRight($event, entry)"
          left-color="positive"
          right-color="negative"
        >
          <template v-slot:right>
            <q-icon name="delete" />
          </template>
          <q-item>
            <q-item-section class="text-weight-bold" :class="useAmountColorClass(entry.amount)">
              {{ entry.name }}
            </q-item-section>

            <q-item-section side class="text-weight-bold" :class="useAmountColorClass(entry.amount)">
              {{ useCurrencify(entry.amount) }}
            </q-item-section>
          </q-item>
        </q-slide-item>
      </q-list>
    </div>
    <q-footer class="bg-transparent">
      <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
        <div class="col text-grey-7 text-h6">
          Balance:
        </div>
        <div
          :class="useAmountColorClass(storeEntries.balance)"
          class="col text-h6 text-right">
          {{ useCurrencify(storeEntries.balance) }}
        </div>
      </div>
      <q-form
        @submit="addEntryFormSubmit"
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
import { useStoreEntries } from '../stores/storeEntries.js'
import { useCurrencify } from '../composables/useCurrencify.js'
import { useAmountColorClass} from '../composables/useAmountColorClass.js'
import { useQuasar } from 'quasar'
import { ref, reactive } from 'vue'

/* stores */

const storeEntries = useStoreEntries()

const $q = useQuasar()

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

const addEntryFormSubmit = () => {
  storeEntries.addEntry(addEntryForm)
  addEntryFormReset()
}

/* slide right */

const onEntrySlideRight = ({ reset }, entry) => {
  $q.dialog({
    title: 'Delete Entry',
    message: `
      Delete this entry?
      <div class="q-mt-md text-weight-bold ${ useAmountColorClass(entry.amount) }">
      ${ entry.name } : ${ useCurrencify(entry.amount) }
      </div>
    `,
    persistent: true,
    html: true,
    ok: {
      label: 'Delete',
      color: 'negative',
      noCaps: true
    },
    cancel: {
      color: 'primary',
      noCaps: true
    }
  }).onOk(() => {
    storeEntries.deleteEntry(entry.id)
  }).onCancel(() => {
    reset()
  })
}
</script>
