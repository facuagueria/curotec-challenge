<script setup lang="ts">
import { onMounted } from 'vue'
import { columns } from '@/components/movies/DataTable/columns.ts'
import DataTable from '@/components/movies/DataTable/DataTable.vue'
import { useMovies } from '@/composables/useMovies.ts'
import AppLoader from '@/components/App/AppLoader.vue'

const { getMovies, movies, isLoading } = useMovies()

onMounted(getMovies)
</script>

<template>
  <AppLoader v-if="isLoading" class="flex justify-center items-center h-full mt-10" />
  <template v-else>
    <div class="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div class="flex items-center justify-between space-y-2">
        <div>
          <h2 class="text-2xl font-bold tracking-tight">Movies</h2>
          <p class="text-muted-foreground">Here&apos;s a list of movies!</p>
        </div>
      </div>

      <DataTable :data="movies" :columns="columns" />
    </div>
  </template>
</template>
