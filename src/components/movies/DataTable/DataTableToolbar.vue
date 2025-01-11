<script setup lang="ts">
import { computed } from 'vue'
import type { Table } from '@tanstack/vue-table'
import type { MovieWithRating } from '@/types/Movie.ts'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CrossIcon, Star } from 'lucide-vue-next'

interface DataTableToolbarProps {
  table: Table<MovieWithRating>
}

const props = defineProps<DataTableToolbarProps>()

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        placeholder="Filter movies by title..."
        :model-value="(table.getColumn('title')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[150px] lg:w-[250px]"
        @input="table.getColumn('title')?.setFilterValue($event.target.value)"
      />

      <Select
        :model-value="(table.getColumn('averageRating')?.getFilterValue() as string) ?? ''"
        @update:model-value="table.getColumn('averageRating')?.setFilterValue($event)"
      >
        <SelectTrigger class="h-8 w-[150px] lg:w-[250px]">
          <SelectValue placeholder="Select stars" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="star in 10" :key="star" :value="star.toString()">
            <span class="flex flex-row items-center justify-center gap-2">
              {{ star }}
              <Star class="h-4 w-4" color="#FFC107" />
            </span>
          </SelectItem>
        </SelectContent>
      </Select>

      <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="table.resetColumnFilters()"
      >
        Reset
        <CrossIcon class="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
</template>
