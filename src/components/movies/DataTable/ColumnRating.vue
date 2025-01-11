<script lang="ts" setup>
import { Star } from 'lucide-vue-next'

type RatingProps = {
  rating: number
  totalRating: number
}

defineProps<RatingProps>()
</script>

<template>
  <div class="flex items-center gap-1">
    <Star class="h-4 w-4" color="#FFC107" />
    <span class="text-sm font-medium">{{ rating }}/10 ({{ totalRating }})</span>
  </div>
</template>

<style></style>
