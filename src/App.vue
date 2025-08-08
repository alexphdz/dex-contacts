<script setup lang="ts">
import ContactList from './features/contacts/screens/ContactList.vue'
import SnackAlert from './components/SnackAlert.vue'
import { useSnackAlert } from './composables/useSnackAlert'

const { snacks, hideSnack } = useSnackAlert()
</script>

<template>
  <div>
    <contact-list />
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <snack-alert
        v-for="snack in snacks"
        :key="snack.id"
        :type="snack.type"
        :title="snack.title"
        :description="snack.description"
        :duration="snack.duration"
        @close="hideSnack(snack.id)"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
