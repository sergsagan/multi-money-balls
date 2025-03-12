<script setup>
import { useAmountColorClass } from 'src/composables/useAmountColorClass.js'
import { useCurrencify } from 'src/composables/useCurrencify.js'
import { useStoreEntries } from 'stores/storeEntries.js'
import { useQuasar } from 'quasar'

const props = defineProps({
  entry: { type: Object, required: true },
})

const $q = useQuasar()

/* stores */
const storeEntries = useStoreEntries()

/* slide right */
const onEntrySlideRight = ({ reset }) => {
  $q.dialog({
    title: 'Delete',
    message: `
      Delete this entry?
      <div class="q-mt-md text-weight-bold ${ useAmountColorClass(props.entry?.amount) }">
      ${ props.entry?.category } : ${ useCurrencify(props.entry?.amount) }
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
    storeEntries.deleteEntry(props.entry?.id)
  }).onCancel(() => {
    reset()
  })
}
</script>
<template>
  <q-slide-item
    @right="onEntrySlideRight"
    left-color="positive"
    right-color="negative"
  >
    <template v-slot:right>
      <q-icon name="delete" />
    </template>
    <q-item>
      <q-item-section class="text-weight-bold" :class="useAmountColorClass(entry.amount)">
        {{ entry.category }}
      </q-item-section>

      <q-item-section side class="text-weight-bold" :class="useAmountColorClass(entry.amount)">
        {{ useCurrencify(entry.amount) }}
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>
