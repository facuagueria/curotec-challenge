<script setup lang="ts">
import { computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar } from 'vue-chartjs'

interface Props {
  title: string
  moviesByYear: Array<{
    year: number
    count: number
  }>
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Movies by Rating',
})

const chartData = computed(() => ({
  labels: props.moviesByYear.map((movie) => movie.year),
  datasets: [
    {
      label: 'Movies by Year',
      data: props.moviesByYear.map((movie) => movie.count),
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
      <CardTitle>Movies by Year </CardTitle>
    </CardHeader>
    <CardContent class="flex flex-row h-[300px] w-full mx-auto">
      <Bar id="movies-by-year" :data="chartData" :options="chartOptions">
        Chart couldn't be loaded.
      </Bar>
    </CardContent>
  </Card>
</template>
