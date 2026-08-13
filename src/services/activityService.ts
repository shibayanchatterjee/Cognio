import { localStemActivities } from '../data/stemCatalog'
import type { StemActivity } from '../types/domain'

const postgrestBaseUrl = import.meta.env.VITE_POSTGREST_BASE_URL ?? '/rest'

interface PostgrestActivityRow {
    id: string
    title: string
    subject: StemActivity['subject']
    type: StemActivity['type']
    description: string
    grades: string[]
    duration_minutes: number
    skill: string
}

function isGradeArray(grades: string[]): grades is StemActivity['grades'] {
    return grades.every((grade) => ['prek', 'k', '1', '2', '3', '4'].includes(grade))
}

function mapRowToActivity(row: PostgrestActivityRow): StemActivity {
    return {
        id: row.id,
        title: row.title,
        subject: row.subject,
        type: row.type,
        description: row.description,
        grades: isGradeArray(row.grades) ? row.grades : ['prek'],
        durationMinutes: row.duration_minutes,
        skill: row.skill,
    }
}

export async function fetchStemActivities(): Promise<{ activities: StemActivity[]; source: 'postgres' | 'fallback' }> {
    try {
        const response = await fetch(
            `${postgrestBaseUrl}/stem_activities?select=id,title,subject,type,description,grades,duration_minutes,skill&order=title.asc`,
        )

        if (!response.ok) {
            throw new Error(`Failed to fetch activities from PostgREST (${response.status})`)
        }

        const rows = (await response.json()) as PostgrestActivityRow[]

        return {
            activities: rows.map(mapRowToActivity),
            source: 'postgres',
        }
    } catch (error) {
        console.warn('Postgres fetch failed, using local fallback data.', error)
        return {
            activities: localStemActivities,
            source: 'fallback',
        }
    }
}
