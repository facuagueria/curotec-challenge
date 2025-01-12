<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { TriangleAlert } from 'lucide-vue-next'

interface Props {
  message: string
  customCode?: number
  code: string
  statusCode?: number
  hint?: string
  details?: string
}

withDefaults(defineProps<Props>(), {
  message: 'Not Found',
  code: '404',
})
</script>

<template>
  <div class="error">
    <TriangleAlert class="error__icon" :size="100" />
    <h1 class="font-extrabold text-7xl text-black">{{ customCode || code }}</h1>
    <h1 class="error__code" v-if="statusCode">Status Code: {{ statusCode }}</h1>

    <p class="error__msg">Not Found</p>
    <p v-if="hint">{{ hint }}</p>

    <p v-if="details">{{ details }}</p>

    <div class="error-footer">
      <!-- <p class="error-footer__text">You'll find lots to explore on the home page.</p> -->
      <RouterLink :to="{ name: 'dashboard' }">
        <Button class="max-w-36" variant="outline"> Back to Dashboard </Button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.error {
  @apply mx-auto flex flex-col justify-center  items-center flex-1 p-10 text-center -mt-20 min-h-[90vh];
}

.error__icon {
  @apply text-7xl text-destructive;
}

.error__code {
  @apply font-extrabold text-7xl text-secondary;
}

.error__msg {
  @apply text-3xl font-extrabold text-primary;
}

.error-footer {
  @apply flex flex-col items-center justify-center gap-5 mt-6 font-light;
}

.error-footer__text {
  @apply text-lg text-muted-foreground;
}

p {
  @apply my-2;
}
</style>
