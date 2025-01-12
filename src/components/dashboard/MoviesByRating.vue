<script setup lang="ts">
import { computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar } from 'vue-chartjs'

interface Props {
  title: string
  moviesByRating: Array<{
    rating: number
    count: number
  }>
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Movies by Rating',
})

const chartData = computed(() => ({
  labels: props.moviesByRating.map((movie) => movie.rating),
  datasets: [
    {
      label: 'Movies by Rating',
      data: props.moviesByRating.map((movie) => movie.count),
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}))
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Movies by Rating </CardTitle>
    </CardHeader>
    <CardContent class="flex flex-row h-[300px] w-full mx-auto">
      <Bar id="movies-by-rating" :data="chartData" :options="chartOptions">
        Chart couldn't be loaded.
      </Bar>
    </CardContent>
  </Card>
</template>
