<script setup>
import Balance from '../components/Entries/Balance.vue'
import AddEntry from 'components/Entries/AddEntry.vue'
import Entry from 'components/Entries/Entry.vue'
import { useStoreEntries } from 'stores/storeEntries.js'
import EmptyEntries from 'components/Entries/EmptyEntries.vue'
import { Sortable } from 'sortablejs-vue3'

/* stores */
const storeEntries = useStoreEntries()
</script>
<template>
  <q-page>
    <div class="q-pa-md">
      <EmptyEntries v-if="!storeEntries.entries.length" />
      <q-list v-else class="entries">
        <Sortable
          @end="storeEntries.sortEnd"
          :list="storeEntries.entries"
          :options="{ handle: '.handle' }"
          item-key="id"
          tag="div"
        >
          <template #item="{element}">
            <Entry :key="element.id" :entry="element" />
          </template>
        </Sortable>

      </q-list>
    </div>
    <q-footer class="bg-transparent">
      <Balance />
      <AddEntry />
    </q-footer>
  </q-page>
</template>
