<script setup>
import { useStoreSettings } from 'stores/storeSettings.js'
import { useStoreEntries } from 'stores/storeEntries.js'
import { onMounted } from 'vue'

const storeSettings = useStoreSettings()
const storeEntries = useStoreEntries()
defineOptions({
  name: 'App'
});
onMounted(async () => {
  await storeSettings.fetchExchangeRates()
  storeSettings.loadSettings()
  storeEntries.loadEntries()
})
/*window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
})*/
</script>
<template>
  <router-view />
</template>
