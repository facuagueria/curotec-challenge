<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  title: string
  totalMovies: number
}

withDefaults(defineProps<Props>(), {
  title: 'Total Movies',
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="text-xl font-semibold">{{ totalMovies }}</div>
    </CardContent>
  </Card>
</template>
