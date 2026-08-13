import { onMounted, ref } from 'vue'

import { fetchStemActivities } from '../services/activityService'
import type { StemActivity } from '../types/domain'

export function useActivities() {
    const activities = ref<StemActivity[]>([])
    const loading = ref(true)
    const source = ref<'postgres' | 'fallback'>('fallback')

    async function loadActivities() {
        loading.value = true
        const result = await fetchStemActivities()
        activities.value = result.activities
        source.value = result.source
        loading.value = false
    }

    onMounted(loadActivities)

    return {
        activities,
        loading,
        source,
        reload: loadActivities,
    }
}
