import { PitDeclaration, TaxCost, JpkV7Report, EpodatkiSubmission, PitStoreState } from '../types/pit-types'

const PIT_DECLARATIONS_KEY = 'vatfaktura_pit_declarations'
const PIT_COSTS_KEY = 'vatfaktura_pit_costs'
const PIT_JPK_KEY = 'vatfaktura_pit_jpk_reports'
const PIT_SUBMISSIONS_KEY = 'vatfaktura_pit_submissions'
const PIT_CALCULATOR_HISTORY_KEY = 'vatfaktura_pit_calculator_history'

// Initialize with globalThis for server-side support
let store: PitStoreState = {
  declarations: [],
  costs: [],
  jpkReports: [],
  submissions: [],
  calculatorHistory: [],
}

if (typeof globalThis !== 'undefined') {
  ;(globalThis as any).pitStore = (globalThis as any).pitStore || store
}

// ===== DECLARATIONS FUNCTIONS =====

export function addPitDeclaration(declaration: PitDeclaration): PitDeclaration {
  try {
    const stored = localStorage.getItem(PIT_DECLARATIONS_KEY)
    const declarations: PitDeclaration[] = stored ? JSON.parse(stored) : []

    const newDeclaration = {
      ...declaration,
      id: declaration.id || `pit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: declaration.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    declarations.push(newDeclaration)
    localStorage.setItem(PIT_DECLARATIONS_KEY, JSON.stringify(declarations))

    return newDeclaration
  } catch (error) {
    console.error('Error adding PIT declaration:', error)
    throw error
  }
}

export function getPitDeclarations(): PitDeclaration[] {
  try {
    const stored = localStorage.getItem(PIT_DECLARATIONS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error getting PIT declarations:', error)
    return []
  }
}

export function getPitDeclarationsByUser(userId: string): PitDeclaration[] {
  try {
    const declarations = getPitDeclarations()
    return declarations.filter(d => d.userId === userId)
  } catch (error) {
    console.error('Error getting user PIT declarations:', error)
    return []
  }
}

export function getPitDeclarationById(id: string): PitDeclaration | null {
  try {
    const declarations = getPitDeclarations()
    return declarations.find(d => d.id === id) || null
  } catch (error) {
    console.error('Error getting PIT declaration:', error)
    return null
  }
}

export function updatePitDeclaration(id: string, updates: Partial<PitDeclaration>): PitDeclaration | null {
  try {
    const stored = localStorage.getItem(PIT_DECLARATIONS_KEY)
    const declarations: PitDeclaration[] = stored ? JSON.parse(stored) : []

    const index = declarations.findIndex(d => d.id === id)
    if (index === -1) return null

    declarations[index] = {
      ...declarations[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    localStorage.setItem(PIT_DECLARATIONS_KEY, JSON.stringify(declarations))
    return declarations[index]
  } catch (error) {
    console.error('Error updating PIT declaration:', error)
    throw error
  }
}

export function deletePitDeclaration(id: string): boolean {
  try {
    const stored = localStorage.getItem(PIT_DECLARATIONS_KEY)
    const declarations: PitDeclaration[] = stored ? JSON.parse(stored) : []

    const filtered = declarations.filter(d => d.id !== id)
    localStorage.setItem(PIT_DECLARATIONS_KEY, JSON.stringify(filtered))

    return true
  } catch (error) {
    console.error('Error deleting PIT declaration:', error)
    return false
  }
}

// ===== COSTS FUNCTIONS =====

export function addTaxCost(cost: TaxCost): TaxCost {
  try {
    const stored = localStorage.getItem(PIT_COSTS_KEY)
    const costs: TaxCost[] = stored ? JSON.parse(stored) : []

    const newCost = {
      ...cost,
      id: cost.id || `cost_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }

    costs.push(newCost)
    localStorage.setItem(PIT_COSTS_KEY, JSON.stringify(costs))

    return newCost
  } catch (error) {
    console.error('Error adding tax cost:', error)
    throw error
  }
}

export function getTaxCosts(): TaxCost[] {
  try {
    const stored = localStorage.getItem(PIT_COSTS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error getting tax costs:', error)
    return []
  }
}

export function getTaxCostsByDeclaration(declarationId: string): TaxCost[] {
  try {
    const costs = getTaxCosts()
    return costs.filter(c => c.declarationId === declarationId && c.status !== 'archived')
  } catch (error) {
    console.error('Error getting costs by declaration:', error)
    return []
  }
}

export function getTaxCostsByUser(userId: string): TaxCost[] {
  try {
    const costs = getTaxCosts()
    return costs.filter(c => c.userId === userId && c.status !== 'archived')
  } catch (error) {
    console.error('Error getting user costs:', error)
    return []
  }
}

export function getTaxCostById(id: string): TaxCost | null {
  try {
    const costs = getTaxCosts()
    return costs.find(c => c.id === id) || null
  } catch (error) {
    console.error('Error getting tax cost:', error)
    return null
  }
}

export function updateTaxCost(id: string, updates: Partial<TaxCost>): TaxCost | null {
  try {
    const stored = localStorage.getItem(PIT_COSTS_KEY)
    const costs: TaxCost[] = stored ? JSON.parse(stored) : []

    const index = costs.findIndex(c => c.id === id)
    if (index === -1) return null

    costs[index] = { ...costs[index], ...updates }
    localStorage.setItem(PIT_COSTS_KEY, JSON.stringify(costs))

    return costs[index]
  } catch (error) {
    console.error('Error updating tax cost:', error)
    throw error
  }
}

export function deleteTaxCost(id: string): boolean {
  try {
    const stored = localStorage.getItem(PIT_COSTS_KEY)
    const costs: TaxCost[] = stored ? JSON.parse(stored) : []

    const filtered = costs.filter(c => c.id !== id)
    localStorage.setItem(PIT_COSTS_KEY, JSON.stringify(filtered))

    return true
  } catch (error) {
    console.error('Error deleting tax cost:', error)
    return false
  }
}

export function calculateTotalCosts(declarationId: string): number {
  try {
    const costs = getTaxCostsByDeclaration(declarationId)
    return costs.reduce((sum, cost) => {
      if (cost.deductible) {
        return sum + cost.amount
      }
      return sum
    }, 0)
  } catch (error) {
    console.error('Error calculating total costs:', error)
    return 0
  }
}

// ===== JPK-V7 REPORTS FUNCTIONS =====

export function addJpkV7Report(report: JpkV7Report): JpkV7Report {
  try {
    const stored = localStorage.getItem(PIT_JPK_KEY)
    const reports: JpkV7Report[] = stored ? JSON.parse(stored) : []

    const newReport = {
      ...report,
      id: report.id || `jpk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }

    reports.push(newReport)
    localStorage.setItem(PIT_JPK_KEY, JSON.stringify(reports))

    return newReport
  } catch (error) {
    console.error('Error adding JPK-V7 report:', error)
    throw error
  }
}

export function getJpkV7Reports(): JpkV7Report[] {
  try {
    const stored = localStorage.getItem(PIT_JPK_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error getting JPK-V7 reports:', error)
    return []
  }
}

export function getJpkV7ReportsByUser(userId: string): JpkV7Report[] {
  try {
    const reports = getJpkV7Reports()
    return reports.filter(r => r.userId === userId)
  } catch (error) {
    console.error('Error getting user JPK-V7 reports:', error)
    return []
  }
}

export function getJpkV7ReportById(id: string): JpkV7Report | null {
  try {
    const reports = getJpkV7Reports()
    return reports.find(r => r.id === id) || null
  } catch (error) {
    console.error('Error getting JPK-V7 report:', error)
    return null
  }
}

export function updateJpkV7Report(id: string, updates: Partial<JpkV7Report>): JpkV7Report | null {
  try {
    const stored = localStorage.getItem(PIT_JPK_KEY)
    const reports: JpkV7Report[] = stored ? JSON.parse(stored) : []

    const index = reports.findIndex(r => r.id === id)
    if (index === -1) return null

    reports[index] = { ...reports[index], ...updates }
    localStorage.setItem(PIT_JPK_KEY, JSON.stringify(reports))

    return reports[index]
  } catch (error) {
    console.error('Error updating JPK-V7 report:', error)
    throw error
  }
}

// ===== E-PODATKI SUBMISSIONS FUNCTIONS =====

export function addEpodatkiSubmission(submission: EpodatkiSubmission): EpodatkiSubmission {
  try {
    const stored = localStorage.getItem(PIT_SUBMISSIONS_KEY)
    const submissions: EpodatkiSubmission[] = stored ? JSON.parse(stored) : []

    const newSubmission = {
      ...submission,
      id: submission.id || `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }

    submissions.push(newSubmission)
    localStorage.setItem(PIT_SUBMISSIONS_KEY, JSON.stringify(submissions))

    return newSubmission
  } catch (error) {
    console.error('Error adding E-podatki submission:', error)
    throw error
  }
}

export function getEpodatkiSubmissions(): EpodatkiSubmission[] {
  try {
    const stored = localStorage.getItem(PIT_SUBMISSIONS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error getting E-podatki submissions:', error)
    return []
  }
}

export function getEpodatkiSubmissionsByUser(userId: string): EpodatkiSubmission[] {
  try {
    const submissions = getEpodatkiSubmissions()
    return submissions.filter(s => s.userId === userId)
  } catch (error) {
    console.error('Error getting user submissions:', error)
    return []
  }
}

export function getEpodatkiSubmissionById(id: string): EpodatkiSubmission | null {
  try {
    const submissions = getEpodatkiSubmissions()
    return submissions.find(s => s.id === id) || null
  } catch (error) {
    console.error('Error getting submission:', error)
    return null
  }
}

export function updateEpodatkiSubmission(
  id: string,
  updates: Partial<EpodatkiSubmission>
): EpodatkiSubmission | null {
  try {
    const stored = localStorage.getItem(PIT_SUBMISSIONS_KEY)
    const submissions: EpodatkiSubmission[] = stored ? JSON.parse(stored) : []

    const index = submissions.findIndex(s => s.id === id)
    if (index === -1) return null

    submissions[index] = { ...submissions[index], ...updates }
    localStorage.setItem(PIT_SUBMISSIONS_KEY, JSON.stringify(submissions))

    return submissions[index]
  } catch (error) {
    console.error('Error updating submission:', error)
    throw error
  }
}

// ===== CALCULATOR HISTORY =====

export function addCalculatorHistory(
  userId: string,
  input: any,
  output: any
): { id: string; userId: string; input: any; output: any; calculatedAt: string } {
  try {
    const stored = localStorage.getItem(PIT_CALCULATOR_HISTORY_KEY)
    const history = stored ? JSON.parse(stored) : []

    const entry = {
      id: `calc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      input,
      output,
      calculatedAt: new Date().toISOString(),
    }

    history.push(entry)
    localStorage.setItem(PIT_CALCULATOR_HISTORY_KEY, JSON.stringify(history))

    return entry
  } catch (error) {
    console.error('Error adding calculator history:', error)
    throw error
  }
}

export function getCalculatorHistory(userId: string, limit = 10) {
  try {
    const stored = localStorage.getItem(PIT_CALCULATOR_HISTORY_KEY)
    const history = stored ? JSON.parse(stored) : []

    return history
      .filter((h: any) => h.userId === userId)
      .slice(-limit)
      .reverse()
  } catch (error) {
    console.error('Error getting calculator history:', error)
    return []
  }
}

// ===== UTILS =====

export function exportPitData(userId: string): string {
  try {
    const declarations = getPitDeclarationsByUser(userId)
    const costs = getTaxCostsByUser(userId)
    const jpkReports = getJpkV7ReportsByUser(userId)
    const submissions = getEpodatkiSubmissionsByUser(userId)

    const data = {
      declarations,
      costs,
      jpkReports,
      submissions,
      exportedAt: new Date().toISOString(),
    }

    return JSON.stringify(data, null, 2)
  } catch (error) {
    console.error('Error exporting PIT data:', error)
    throw error
  }
}

export function importPitData(userId: string, jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData)

    // Clear existing data for this user
    let declarations = getPitDeclarations().filter(d => d.userId !== userId)
    let costs = getTaxCosts().filter(c => c.userId !== userId)
    let jpkReports = getJpkV7Reports().filter(r => r.userId !== userId)
    let submissions = getEpodatkiSubmissions().filter(s => s.userId !== userId)

    // Add new data
    if (data.declarations) {
      declarations.push(...data.declarations.map((d: PitDeclaration) => ({ ...d, userId })))
      localStorage.setItem(PIT_DECLARATIONS_KEY, JSON.stringify(declarations))
    }

    if (data.costs) {
      costs.push(...data.costs.map((c: TaxCost) => ({ ...c, userId })))
      localStorage.setItem(PIT_COSTS_KEY, JSON.stringify(costs))
    }

    if (data.jpkReports) {
      jpkReports.push(...data.jpkReports.map((r: JpkV7Report) => ({ ...r, userId })))
      localStorage.setItem(PIT_JPK_KEY, JSON.stringify(jpkReports))
    }

    if (data.submissions) {
      submissions.push(...data.submissions.map((s: EpodatkiSubmission) => ({ ...s, userId })))
      localStorage.setItem(PIT_SUBMISSIONS_KEY, JSON.stringify(submissions))
    }

    return true
  } catch (error) {
    console.error('Error importing PIT data:', error)
    return false
  }
}
