<script setup>
import { useStoreSettings } from 'stores/storeSettings.js'
import { onMounted } from 'vue'

const storeSettings = useStoreSettings()
defineOptions({
  name: 'App'
});
onMounted(async () => {
  await storeSettings.fetchExchangeRates() // Отримуємо актуальні курси валют при завантаженні програми
})
/*window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
})*/
</script>
<template>
  <router-view />
</template>
