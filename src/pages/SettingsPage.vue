<script setup>
import { useStoreSettings} from 'stores/storeSettings.js'
import vSelectAll from 'src/directives/directiveSelectAll.js'
const storeSettings = useStoreSettings()
</script>
<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered padding>
        <q-item-label header>Entries</q-item-label>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Prompt to Delete</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle v-model="storeSettings.settings.promptToDelete" />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Show running balance</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle v-model="storeSettings.settings.showRunningBalance" />
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-input
              outlined
              v-model="storeSettings.settings.currencySymbol"
              label="Currency Symbol"
              v-select-all
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>
