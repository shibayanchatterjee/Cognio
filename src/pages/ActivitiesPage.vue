<script setup lang="ts">
import { computed, ref } from 'vue'

import { useActivities } from '../composables/useActivities'
import type { ActivityType } from '../types/domain'

const selectedType = ref<ActivityType | 'all'>('all')
const { activities, loading, source } = useActivities()

const activityTypes: Array<ActivityType | 'all'> = ['all', 'quiz', 'game', 'worksheet']

const filteredByType = computed(() => {
  if (selectedType.value === 'all') {
    return activities.value
  }

  return activities.value.filter((activity) => activity.type === selectedType.value)
})
</script>

<template>
  <section class="page-heading">
    <p class="eyebrow">Learn</p>
    <h1>STEM Activities</h1>
    <p>Select an activity type to build a balanced learning routine.</p>
    <p class="card-meta">Source: {{ source === 'postgres' ? 'PostgreSQL' : 'Fallback seed data' }}</p>
  </section>

  <div class="chip-row">
    <button
      v-for="activityType in activityTypes"
      :key="activityType"
      :class="['chip', { active: selectedType === activityType }]"
      @click="selectedType = activityType"
    >
      {{ activityType }}
    </button>
  </div>

  <div class="table-wrap">
    <p v-if="loading" style="padding: 0.7rem">Loading activities...</p>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Subject</th>
          <th>Type</th>
          <th>Grade Band</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="activity in filteredByType" :key="activity.id">
          <td>{{ activity.title }}</td>
          <td>{{ activity.subject }}</td>
          <td>{{ activity.type }}</td>
          <td>{{ activity.grades.join(', ').toUpperCase() }}</td>
          <td>{{ activity.durationMinutes }} mins</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
