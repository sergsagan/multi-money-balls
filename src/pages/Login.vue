<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useAuth } from 'stores/useAuth'

const router = useRouter()
const $q = useQuasar()
const auth = useAuth()

const name = ref('')
const email = ref('')
const password = ref('')

const login = () => {
  if (!name.value || !email.value || !password.value) {
    $q.notify({
      type: 'negative',
      message: 'Please fill in all fields'
    })
    return
  }

  auth.login({ name: name.value, email: email.value, password: password.value })

  $q.notify({
    type: 'positive',
    message: `Welcome, ${name.value}`
  })

  router.push('/')
}
const resetForm = () => {
  name.value = ''
  email.value = ''
  password.value = ''
}
</script>

<template>
  <div class="q-pa-md">
    <q-form
      ref="formRef"
      @submit.prevent="login"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name"
        label="Your name *"
        lazy-rules
        :rules="[val => !!val || 'Name is required']"
      />

      <q-input
        filled
        v-model="email"
        type="email"
        label="Your email *"
        lazy-rules
        :rules="[
          val => !!val || 'Email is required',
          val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Invalid email format'
        ]"
      />

      <q-input
        filled
        v-model="password"
        type="password"
        label="Password *"
        lazy-rules
        :rules="[val => !!val || 'Password is required']"
      />

      <div>
        <q-btn label="Login" type="submit" color="primary"/>
        <q-btn label="Reset" @click="resetForm" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>
