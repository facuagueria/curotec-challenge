<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboard } from '@/composables/useDashboard'
import AppLoader from '@/components/App/AppLoader.vue'
import TotalMovies from '@/components/dashboard/TotalMovies.vue'
import MoviesByRating from '@/components/dashboard/MoviesByRating.vue'
import MoviesByYear from '@/components/dashboard/MoviesByYear.vue'

const { getStats, stats, isLoading } = useDashboard()

onMounted(getStats)
</script>

<template>
  <AppLoader v-if="isLoading" class="flex justify-center items-center h-full mt-10" />

  <div v-else class="flex-1 space-y-4 p-8 pt-6">
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
      <TotalMovies class="col-span-3" title="Total Movies" :total-movies="stats.totalMovies" />
      <MoviesByRating
        class="col-span-3"
        title="Movies by Rating"
        :movies-by-rating="stats.moviesByRating"
      />

      <MoviesByYear
        class="col-span-3"
        title="Movies by Year"
        :movies-by-year="stats.moviesByYear"
      />
    </div>
  </div>
</template>
