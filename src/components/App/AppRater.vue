<script lang="ts" setup>
import StarRating from 'vue-star-rating'

interface Props {
  roundedCorners?: boolean
  starSize?: number
  maxRating?: number
  showRating?: boolean
}

withDefaults(defineProps<Props>(), {
  roundedCorners: true,
  starSize: 20,
  maxRating: 10,
  showRating: true,
})

const modelValue = defineModel<{
  rating: number
}>()
</script>

<template>
  <StarRating
    v-model="modelValue"
    :rounded-corners="roundedCorners"
    :star-size="starSize"
    :max-rating="maxRating"
    :show-rating="showRating"
  />
</template>

<style></style>
