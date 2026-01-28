// Types for sleep disorder content pages

export interface Symptom {
  name: string
  description: string
}

export interface DiagnosticTest {
  name: string
  description: string
}

export interface Treatment {
  name: string
  description: string
}

export interface SleepDisorderContent {
  slug: string
  name: string
  category: string
  description: string
  overview: string
  prevalence: string
  causes: string
  types?: { name: string; description: string }[]
  symptoms: Symptom[]
  selfTestQuestions: string[]
  diagnosisOverview: string
  diagnosticTests: DiagnosticTest[]
  treatmentOverview: string
  treatments: Treatment[]
  lifestyleChanges: string[]
  supportResources?: { name: string; url: string }[]
  relatedDisorders?: string[]
  lastReviewed: string
  reviewedBy: string
}

// Helper to generate slug from disorder name
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, '') // Remove parentheses and content
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    .trim()
}

// All sleep disorders content - populated in separate files by category
import { breathingDisorders } from './disorders/breathing-disorders'
import { insomniaDisorders } from './disorders/insomnia-disorders'
import { hypersomniaDisorders } from './disorders/hypersomnia-disorders'
import { circadianDisorders } from './disorders/circadian-disorders'
import { parasomniaDisorders } from './disorders/parasomnia-disorders'
import { movementDisorders } from './disorders/movement-disorders'
import { pediatricDisorders } from './disorders/pediatric-disorders'
import { otherDisorders } from './disorders/other-disorders'

export const allSleepDisorders: SleepDisorderContent[] = [
  ...breathingDisorders,
  ...insomniaDisorders,
  ...hypersomniaDisorders,
  ...circadianDisorders,
  ...parasomniaDisorders,
  ...movementDisorders,
  ...pediatricDisorders,
  ...otherDisorders,
]

export function getDisorderBySlug(slug: string): SleepDisorderContent | undefined {
  return allSleepDisorders.find(d => d.slug === slug)
}

export function getAllDisorderSlugs(): string[] {
  return allSleepDisorders.map(d => d.slug)
}

export function getDisordersByCategory(category: string): SleepDisorderContent[] {
  return allSleepDisorders.filter(d => d.category === category)
}
