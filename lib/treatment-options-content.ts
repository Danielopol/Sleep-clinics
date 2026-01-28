// Types for treatment options content pages

export interface Benefit {
  name: string
  description: string
}

export interface SideEffect {
  name: string
  description: string
}

export interface Variation {
  name: string
  description: string
}

export interface Tip {
  title: string
  description: string
}

export interface TreatmentContent {
  slug: string
  name: string
  category: string
  description: string
  overview: string
  howItWorks: string
  candidatesFor: string
  benefits: Benefit[]
  sideEffects: SideEffect[]
  variations?: Variation[]
  tips: Tip[]
  additionalResources?: { name: string; url: string }[]
  relatedTreatments?: string[]
  treatedConditions?: string[]
  lastReviewed: string
  reviewedBy: string
}

// Helper to generate slug from treatment name
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, '') // Remove parentheses and content
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    .trim()
}

// Import all treatment content by category
import { papTherapies } from './treatments/pap-therapies'
import { equipmentSupplies } from './treatments/equipment-supplies'
import { sleepTesting } from './treatments/sleep-testing'
import { diagnosisServices } from './treatments/diagnosis-services'
import { conditionTreatments } from './treatments/condition-treatments'
import { therapiesInterventions } from './treatments/therapies-interventions'
import { clinicalServices } from './treatments/clinical-services'

export const allTreatments: TreatmentContent[] = [
  ...papTherapies,
  ...equipmentSupplies,
  ...sleepTesting,
  ...diagnosisServices,
  ...conditionTreatments,
  ...therapiesInterventions,
  ...clinicalServices,
]

export function getTreatmentBySlug(slug: string): TreatmentContent | undefined {
  return allTreatments.find(t => t.slug === slug)
}

export function getAllTreatmentSlugs(): string[] {
  return allTreatments.map(t => t.slug)
}

export function getTreatmentsByCategory(category: string): TreatmentContent[] {
  return allTreatments.filter(t => t.category === category)
}
