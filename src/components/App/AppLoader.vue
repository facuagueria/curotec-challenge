<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
</script>

<template>
  <div v-bind="$attrs" data-testid="app-loader">
    <Loader2 class="w-10 h-10 mr-2 animate-spin" />
    Loading...
  </div>
</template>
