<script lang="ts" setup>
import StarRating from 'vue-star-rating'

const modelValue = defineModel<{
  rating: number
}>()
</script>

<template>
  <StarRating
    v-model="modelValue"
    :rounded-corners="true"
    :star-size="20"
    :max-rating="10"
    :show-rating="true"
  />
</template>

<style></style>
