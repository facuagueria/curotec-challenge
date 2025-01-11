import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { MovieWithRating } from '@/types/Movie.ts'
import ColumnRating from './ColumnRating.vue'
import DataTableColumnHeader from './DataTableColumnHeader.vue'

export const columns: ColumnDef<MovieWithRating>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, class: 'text-left', title: 'Title' }),
    cell: ({ row }) => {
      const title = row.getValue('title')

      return h('div', { class: 'text-left font-medium' }, title)
    },
  },
  {
    accessorKey: 'year',
    header: ({ column }) => h(DataTableColumnHeader, { column, class: 'text-left', title: 'Year' }),
    cell: ({ row }) => {
      const year = row.getValue('year')

      return h('div', { class: 'text-left font-medium' }, year)
    },
  },
  {
    accessorKey: 'averageRating',
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, class: 'text-left', title: 'Rating' }),
    cell: ({ row }) => {
      const rating = row.getValue('averageRating') as number
      const totalRating = row.original.totalRating

      const ratingComponent = h(ColumnRating, { rating, totalRating })

      return h('div', { class: 'text-left font-medium' }, ratingComponent)
    },
    filterFn: (row, id, filterValue) => {
      const filterValueNumber = parseInt(filterValue)
      const rating = row.getValue('averageRating') as number
      return rating >= filterValueNumber && rating < filterValueNumber + 1
    },
  },
]
