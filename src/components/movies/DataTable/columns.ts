import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Movie } from '@/types/Movie.ts'
import ColumnRating from './ColumnRating.vue'

export const columns: ColumnDef<Movie>[] = [
  {
    accessorKey: 'title',
    header: () => h('div', { class: 'text-left' }, 'Title'),
    cell: ({ row }) => {
      const title = row.getValue('title')

      return h('div', { class: 'text-left font-medium' }, title)
    },
  },
  {
    accessorKey: 'year',
    header: () => h('div', { class: 'text-left' }, 'Year'),
    cell: ({ row }) => {
      const year = row.getValue('year')

      return h('div', { class: 'text-left font-medium' }, year)
    },
  },
  {
    accessorKey: 'averageRating',
    header: () => h('div', { class: 'text-left' }, 'Rating'),
    cell: ({ row }) => {
      const rating = row.getValue('averageRating') as number
      const totalRating = row.original.totalRating

      const ratingComponent = h(ColumnRating, { rating, totalRating })

      return h('div', { class: 'text-left font-medium' }, ratingComponent)
    },
    
  },
]
