<script setup>
import { useLightOrDark } from 'src/composables/useLightOrDark.js'
</script>

<template>
  <div class="text-center q-pt-xl">
    <q-icon name="savings" size="100px" :color="useLightOrDark('grey-4', 'grey-9')" />
    <div :class="useLightOrDark('text-grey-6', 'text-grey-9')">
      No entries yet
    </div>
  </div>
</template>
