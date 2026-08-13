import type { GradeLevel, StemActivity } from '../types/domain'

export const localStemActivities: StemActivity[] = [
    {
        id: 'math-pattern-lab',
        title: 'Pattern Lab',
        subject: 'math',
        type: 'game',
        description: 'Build shape and number patterns to unlock each level.',
        grades: ['prek', 'k', '1'],
        durationMinutes: 12,
        skill: 'patterns',
    },
    {
        id: 'science-plant-quiz',
        title: 'Plant Explorer Quiz',
        subject: 'science',
        type: 'quiz',
        description: 'Discover what plants need to grow with interactive questions.',
        grades: ['1', '2', '3'],
        durationMinutes: 10,
        skill: 'biology basics',
    },
    {
        id: 'engineering-bridge-challenge',
        title: 'Bridge Builder Challenge',
        subject: 'engineering',
        type: 'worksheet',
        description: 'Design a paper bridge and test load strength step by step.',
        grades: ['2', '3', '4'],
        durationMinutes: 18,
        skill: 'design thinking',
    },
    {
        id: 'tech-code-logic',
        title: 'Code Logic Mission',
        subject: 'technology',
        type: 'game',
        description: 'Guide a robot with simple coding blocks and if-then rules.',
        grades: ['3', '4'],
        durationMinutes: 15,
        skill: 'computational thinking',
    },
    {
        id: 'math-fraction-flight',
        title: 'Fraction Flight',
        subject: 'math',
        type: 'quiz',
        description: 'Choose the right fractions to fuel your rocket launch.',
        grades: ['3', '4'],
        durationMinutes: 14,
        skill: 'fractions',
    },
]

export function filterActivitiesByGrade(grade: GradeLevel | 'all') {
    if (grade === 'all') {
        return localStemActivities
    }

    return localStemActivities.filter((activity) => activity.grades.includes(grade))
}
