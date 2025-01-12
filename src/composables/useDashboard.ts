import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

export const useDashboard = () => {
  const dashboardStore = useDashboardStore()
  const stats = computed(() => dashboardStore.stats)
  const isLoading = computed(() => dashboardStore.isLoading)

  const getStats = async () => {
    try {
      const stats = await dashboardStore.getStats()

      return stats
    } catch (error) {
      console.error(error)
    }
  }

  return { stats, isLoading, getStats }
}
