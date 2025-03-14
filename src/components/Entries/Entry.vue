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

/* slide left */
const onEntrySlideLeft = ({ reset }) => {
  storeEntries.updateEntry(props.entry?.id, { paid: !props.entry?.paid })
  reset()
}

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

/* update name & amount */
const onCategoryUpdate = value => {
  storeEntries.updateEntry(props.entry?.id, { category: value })
}

const onAmountUpdate = value => {
  storeEntries.updateEntry(props.entry?.id, { amount: value })
}
</script>
<template>
  <q-slide-item
    @left="onEntrySlideLeft"
    @right="onEntrySlideRight"
    left-color="positive"
    right-color="negative"
    :class="{ 'bg-grey-2' : entry.paid }"
  >
    <template v-slot:left>
      <q-icon name="done" />
    </template>
    <template v-slot:right>
      <q-icon name="delete" />
    </template>
    <q-item>
      <q-item-section
        class="text-weight-bold"
        :class="[
          useAmountColorClass(entry.amount),
          { 'text-strike' : entry.paid }
        ]"
      >
        {{ entry.category }}
        <q-popup-edit
          :model-value="entry.category"
          @save="onCategoryUpdate"
          auto-save
          v-slot="scope"
          :cover="false"
          anchor="top left"
          :offset="[16, 12]"
          buttons
          label-set="Ok"
        >
          <q-input
            v-model="scope.value"
            dense
            autofocus
            input-class="text-weight-bold letter-spacing-none"
            @keyup.enter="scope.set"
          />
        </q-popup-edit>
      </q-item-section>

      <q-item-section
        side
        class="text-weight-bold"
        :class="[
          useAmountColorClass(entry.amount),
          { 'text-strike' : entry.paid }
        ]"
      >
        {{ useCurrencify(entry.amount) }}
        <q-popup-edit
          :model-value="entry.amount"
          @save="onAmountUpdate"
          auto-save
          v-slot="scope"
          :cover="false"
          anchor="top left"
          :offset="[16, 12]"
          buttons
          label-set="Ok"
        >
          <q-input
            v-model.number="scope.value"
            dense
            autofocus
            type="number"
            step="0.01"
            input-class="text-weight-bold letter-spacing-none text-right"
            @keyup.enter="scope.set"
          />
        </q-popup-edit>
      </q-item-section>

      <q-item-section
        v-if="storeEntries.options.sort"
        side
      >
     <q-icon name="reorder" color="primary" class="handle" />
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>
