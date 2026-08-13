export const gradeLevels = ['prek', 'k', '1', '2', '3', '4'] as const

export type GradeLevel = (typeof gradeLevels)[number]

export type Subject = 'math' | 'science' | 'engineering' | 'technology'

export type ActivityType = 'quiz' | 'game' | 'worksheet'

export type UserRole = 'student' | 'parent' | 'teacher' | 'admin'

export interface StemActivity {
    id: string
    title: string
    subject: Subject
    type: ActivityType
    description: string
    grades: GradeLevel[]
    durationMinutes: number
    skill: string
}
