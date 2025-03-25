<script setup>
import { computed, ref } from 'vue'
import NavLink from 'components/Nav/NavLink.vue'
import { useStoreEntries } from 'stores/storeEntries.js'
import { useRoute } from 'vue-router'
import { useLightOrDark } from 'src/composables/useLightOrDark.js'
import { useStoreSettings } from 'stores/storeSettings.js'

/* stores */
const storeEntries = useStoreEntries()
const storeSettings = useStoreSettings()
const route = useRoute()

const navLinks = [
  {
    title: 'Entries',
    icon: 'payment',
    link: '/'
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/settings'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const usdToEur = computed(() => storeSettings.settings.exchangeRates['€']?.toFixed(2) || '--')
const usdToGbp = computed(() => storeSettings.settings.exchangeRates['£']?.toFixed(2) || '--')
</script>
<template>
  <q-layout view="hHh lpR lFf">
    <q-header :elevated="useLightOrDark(true, false)">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div class="absolute-center">
            <q-icon name="savings" />
            Moneyballs
          </div>
        </q-toolbar-title>

        <q-toolbar-title class="q-ml-md q-mr-md" shrink>
          <div class="text-caption text-white q-ml-md q-hidden-xs">
            USD/EUR: {{ usdToEur }} | USD/GBP: {{ usdToGbp }}
          </div>
        </q-toolbar-title>

        <q-btn
          v-if="route.fullPath === '/'"
          @click="storeEntries.options.sort = !storeEntries.options.sort"
          :label="!storeEntries.options.sort ? 'Sort' : 'Done'"
          flat
          no-caps
          dense
        />

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-primary"
      :width="250"
      :breakpoint="767"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          class="text-white"
          header
        >
          Navigation
        </q-item-label>

        <NavLink
          v-for="link in navLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
