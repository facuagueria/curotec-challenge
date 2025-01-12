<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toaster from '@/components/ui/toast/Toaster.vue'
import AppNavbar from '@/components/App/AppNavbar.vue'
</script>

<template>
  <Toaster />

  <AppNavbar />
  <RouterView />
</template>
