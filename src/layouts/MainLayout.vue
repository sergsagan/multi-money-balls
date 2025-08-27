<script setup>
import { computed, ref } from 'vue'
import NavLink from 'components/Nav/NavLink.vue'
import { useStoreEntries } from 'stores/storeEntries.js'
import { useRoute, useRouter } from 'vue-router'
import { useLightOrDark } from 'src/composables/useLightOrDark.js'
import { useAuth } from 'stores/useAuth'
import CurrencyRates from 'components/CurrencyRates.vue'

/* stores */
const storeEntries = useStoreEntries()
const route = useRoute()
const router = useRouter()
const auth = useAuth()

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const navLinks = computed(() => {
  const baseLinks = [
    { title: 'Entries', icon: 'payment', link: '/' },
    { title: 'Settings', icon: 'settings', link: '/settings' }
  ]

  const authLink = auth.isLoggedIn
    ? {
      title: 'Log out',
      icon: 'logout',
      link: '/logout',
      action: () => {
        auth.logout(() => router.push('/login'))
      }
    }
    : {
      title: 'Log in',
      icon: 'login',
      link: '/login'
    }

  return [...baseLinks, authLink]
})

function handleNavClick(link) {
  if (link.action) {
    link.action()
  } else {
    router.push(link.link)
  }
}
</script>
<template>
  <q-layout view="hHh lpR lFf">
    <q-header :elevated="useLightOrDark(true, false)">
      <q-toolbar>
        <q-btn
          flat dense round icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div class="absolute-center">
            <q-icon name="savings" />
            MultiMoneyballs
          </div>
        </q-toolbar-title>

        <q-toolbar-title v-if="auth.isLoggedIn" class="q-ml-md q-mr-md" shrink>
          <CurrencyRates />
        </q-toolbar-title>

        <q-btn
          v-if="route.fullPath === '/'"
          @click="storeEntries.options.sort = !storeEntries.options.sort"
          :label="!storeEntries.options.sort ? 'Sort' : 'Done'"
          flat no-caps dense
        />

        <q-btn
          v-if="auth.isLoggedIn"
          flat
          dense
          icon="account_circle"
          :label="$q.screen.gt.sm ? auth.user?.name : ''"
          no-caps
          class="q-ml-sm"
          style="color: white"
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
        <q-item-label class="text-white" header>Navigation</q-item-label>

        <NavLink
          v-for="link in navLinks"
          :key="link.title"
          v-bind="link"
          @click="handleNavClick(link)"
          :title="link.title"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
