'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  PitDeclaration,
  TaxCost,
  JpkV7Report,
  EpodatkiSubmission,
  PitCalculatorInput,
  PitCalculatorOutput,
} from '@/lib/types/pit-types'
import * as pitStore from '@/lib/pit/pit-store'

interface PitContextType {
  // Declarations
  declarations: PitDeclaration[]
  addDeclaration: (declaration: PitDeclaration) => void
  updateDeclaration: (id: string, updates: Partial<PitDeclaration>) => void
  deleteDeclaration: (id: string) => void
  getDeclarationById: (id: string) => PitDeclaration | null

  // Costs
  costs: TaxCost[]
  addCost: (cost: TaxCost) => void
  updateCost: (id: string, updates: Partial<TaxCost>) => void
  deleteCost: (id: string) => void
  getCostsByDeclaration: (declarationId: string) => TaxCost[]

  // JPK-V7 Reports
  jpkReports: JpkV7Report[]
  addJpkReport: (report: JpkV7Report) => void
  updateJpkReport: (id: string, updates: Partial<JpkV7Report>) => void
  getJpkReportById: (id: string) => JpkV7Report | null

  // E-podatki Submissions
  submissions: EpodatkiSubmission[]
  addSubmission: (submission: EpodatkiSubmission) => void
  updateSubmission: (id: string, updates: Partial<EpodatkiSubmission>) => void
  getSubmissionsByDeclaration: (declarationId: string) => EpodatkiSubmission[]

  // Calculator History
  calculatorHistory: any[]
  addCalculatorEntry: (input: PitCalculatorInput, output: PitCalculatorOutput) => void

  // Utils
  isLoading: boolean
}

const PitContext = createContext<PitContextType | undefined>(undefined)

export function PitProvider({ children, userId }: { children: React.ReactNode; userId: string }) {
  const [declarations, setDeclarations] = useState<PitDeclaration[]>([])
  const [costs, setCosts] = useState<TaxCost[]>([])
  const [jpkReports, setJpkReports] = useState<JpkV7Report[]>([])
  const [submissions, setSubmissions] = useState<EpodatkiSubmission[]>([])
  const [calculatorHistory, setCalculatorHistory] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load data on mount
  useEffect(() => {
    try {
      const userDeclarations = pitStore.getPitDeclarationsByUser(userId)
      const userCosts = pitStore.getTaxCostsByUser(userId)
      const userJpkReports = pitStore.getJpkV7ReportsByUser(userId)
      const userSubmissions = pitStore.getEpodatkiSubmissionsByUser(userId)
      const userCalculatorHistory = pitStore.getCalculatorHistory(userId)

      setDeclarations(userDeclarations)
      setCosts(userCosts)
      setJpkReports(userJpkReports)
      setSubmissions(userSubmissions)
      setCalculatorHistory(userCalculatorHistory)
    } catch (error) {
      console.error('Error loading PIT data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  // Declarations
  const addDeclaration = (declaration: PitDeclaration) => {
    try {
      const newDeclaration = pitStore.addPitDeclaration({
        ...declaration,
        userId,
      })
      setDeclarations(prev => [...prev, newDeclaration])
    } catch (error) {
      console.error('Error adding declaration:', error)
    }
  }

  const updateDeclaration = (id: string, updates: Partial<PitDeclaration>) => {
    try {
      const updated = pitStore.updatePitDeclaration(id, updates)
      if (updated) {
        setDeclarations(prev => prev.map(d => (d.id === id ? updated : d)))
      }
    } catch (error) {
      console.error('Error updating declaration:', error)
    }
  }

  const deleteDeclaration = (id: string) => {
    try {
      if (pitStore.deletePitDeclaration(id)) {
        setDeclarations(prev => prev.filter(d => d.id !== id))
      }
    } catch (error) {
      console.error('Error deleting declaration:', error)
    }
  }

  const getDeclarationById = (id: string): PitDeclaration | null => {
    return declarations.find(d => d.id === id) || null
  }

  // Costs
  const addCost = (cost: TaxCost) => {
    try {
      const newCost = pitStore.addTaxCost({
        ...cost,
        userId,
      })
      setCosts(prev => [...prev, newCost])
    } catch (error) {
      console.error('Error adding cost:', error)
    }
  }

  const updateCost = (id: string, updates: Partial<TaxCost>) => {
    try {
      const updated = pitStore.updateTaxCost(id, updates)
      if (updated) {
        setCosts(prev => prev.map(c => (c.id === id ? updated : c)))
      }
    } catch (error) {
      console.error('Error updating cost:', error)
    }
  }

  const deleteCost = (id: string) => {
    try {
      if (pitStore.deleteTaxCost(id)) {
        setCosts(prev => prev.filter(c => c.id !== id))
      }
    } catch (error) {
      console.error('Error deleting cost:', error)
    }
  }

  const getCostsByDeclaration = (declarationId: string): TaxCost[] => {
    return costs.filter(c => c.declarationId === declarationId && c.status !== 'archived')
  }

  // JPK-V7 Reports
  const addJpkReport = (report: JpkV7Report) => {
    try {
      const newReport = pitStore.addJpkV7Report({
        ...report,
        userId,
      })
      setJpkReports(prev => [...prev, newReport])
    } catch (error) {
      console.error('Error adding JPK report:', error)
    }
  }

  const updateJpkReport = (id: string, updates: Partial<JpkV7Report>) => {
    try {
      const updated = pitStore.updateJpkV7Report(id, updates)
      if (updated) {
        setJpkReports(prev => prev.map(r => (r.id === id ? updated : r)))
      }
    } catch (error) {
      console.error('Error updating JPK report:', error)
    }
  }

  const getJpkReportById = (id: string): JpkV7Report | null => {
    return jpkReports.find(r => r.id === id) || null
  }

  // E-podatki Submissions
  const addSubmission = (submission: EpodatkiSubmission) => {
    try {
      const newSubmission = pitStore.addEpodatkiSubmission({
        ...submission,
        userId,
      })
      setSubmissions(prev => [...prev, newSubmission])
    } catch (error) {
      console.error('Error adding submission:', error)
    }
  }

  const updateSubmission = (id: string, updates: Partial<EpodatkiSubmission>) => {
    try {
      const updated = pitStore.updateEpodatkiSubmission(id, updates)
      if (updated) {
        setSubmissions(prev => prev.map(s => (s.id === id ? updated : s)))
      }
    } catch (error) {
      console.error('Error updating submission:', error)
    }
  }

  const getSubmissionsByDeclaration = (declarationId: string): EpodatkiSubmission[] => {
    return submissions.filter(s => s.declarationId === declarationId)
  }

  // Calculator History
  const addCalculatorEntry = (input: PitCalculatorInput, output: PitCalculatorOutput) => {
    try {
      const entry = pitStore.addCalculatorHistory(userId, input, output)
      setCalculatorHistory(prev => [entry, ...prev.slice(0, 9)])
    } catch (error) {
      console.error('Error adding calculator entry:', error)
    }
  }

  const value: PitContextType = {
    declarations,
    addDeclaration,
    updateDeclaration,
    deleteDeclaration,
    getDeclarationById,

    costs,
    addCost,
    updateCost,
    deleteCost,
    getCostsByDeclaration,

    jpkReports,
    addJpkReport,
    updateJpkReport,
    getJpkReportById,

    submissions,
    addSubmission,
    updateSubmission,
    getSubmissionsByDeclaration,

    calculatorHistory,
    addCalculatorEntry,

    isLoading,
  }

  return <PitContext.Provider value={value}>{children}</PitContext.Provider>
}

export function usePit() {
  const context = useContext(PitContext)
  if (context === undefined) {
    throw new Error('usePit must be used within PitProvider')
  }
  return context
}
