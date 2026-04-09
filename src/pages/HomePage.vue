<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { useActivities } from '../composables/useActivities'
import type { GradeLevel } from '../types/domain'

const selectedGrade = ref<GradeLevel | 'all'>('all')
const { activities, loading, source } = useActivities()

const filteredActivities = computed(() => {
  if (selectedGrade.value === 'all') {
    return activities.value
  }

  return activities.value.filter((activity) => activity.grades.includes(selectedGrade.value))
})

const gradeOptions: Array<{ label: string; value: GradeLevel | 'all' }> = [
  { label: 'All', value: 'all' },
  { label: 'Pre-K', value: 'prek' },
  { label: 'K', value: 'k' },
  { label: 'Grade 1', value: '1' },
  { label: 'Grade 2', value: '2' },
  { label: 'Grade 3', value: '3' },
  { label: 'Grade 4', value: '4' },
]
</script>

<template>
  <section class="hero">
    <div>
      <p class="eyebrow">Cognio STEM</p>
      <h1>Fun STEM learning for curious kids.</h1>
      <p>
        Cognio blends quizzes, games, and worksheets for Pre-K to Grade 4 learners with parent-managed
        profiles, role-based access, and progress tracking.
      </p>
      <div class="hero-actions">
        <RouterLink class="button button-primary" to="/activities">Start activities</RouterLink>
        <RouterLink class="button button-secondary" to="/parents">For parents</RouterLink>
      </div>
    </div>
    <aside class="hero-panel">
      <h2>What ships in MVP</h2>
      <ul>
        <li>Student, parent, teacher, and admin role model</li>
        <li>STEM-first activity catalog with grade filters</li>
        <li>Progress dashboard and reward hooks</li>
        <li>Dockerized local stack ready for cloud hosting</li>
      </ul>
    </aside>
  </section>

  <section>
    <div class="section-title-row">
      <h2>Activity Explorer</h2>
      <p class="card-meta">Source: {{ source === 'postgres' ? 'PostgreSQL' : 'Fallback seed data' }}</p>
      <div class="grade-filter">
        <button
          v-for="grade in gradeOptions"
          :key="grade.value"
          :class="['chip', { active: selectedGrade === grade.value }]"
          @click="selectedGrade = grade.value"
        >
          {{ grade.label }}
        </button>
      </div>
    </div>

    <p v-if="loading">Loading activities...</p>

    <div class="card-grid">
      <article v-for="activity in filteredActivities" :key="activity.id" class="card">
        <p class="card-label">{{ activity.subject }} · {{ activity.type }}</p>
        <h3>{{ activity.title }}</h3>
        <p>{{ activity.description }}</p>
        <p class="card-meta">
          Grades: {{ activity.grades.join(', ').toUpperCase() }} | {{ activity.durationMinutes }} mins
        </p>
      </article>
    </div>
  </section>
</template>
