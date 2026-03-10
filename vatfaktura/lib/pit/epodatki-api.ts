import { EpodatkiSubmission, PitDeclaration } from '../types/pit-types'
import { updateEpodatkiSubmission } from './pit-store'

// E-podatki API Configuration
export interface EpodatkiConfig {
  apiUrl: string
  login: string
  password: string
  appId: string
  timeout?: number
}

export interface EpodatkiResponse {
  success: boolean
  referenceNumber?: string
  status?: string
  message?: string
  errorCode?: string
  errorDetails?: string
  processedAt?: string
}

export interface EpodatkiStatusResponse {
  referenceNumber: string
  status: 'pending' | 'accepted' | 'rejected' | 'processing'
  message?: string
  rejectionReason?: string
  processedAt?: string
}

// Default configuration from environment variables
function getEpodatkiConfig(): EpodatkiConfig {
  return {
    apiUrl: process.env.EPODATKI_API_URL || 'https://e-podatki.gov.pl/api',
    login: process.env.EPODATKI_LOGIN || '',
    password: process.env.EPODATKI_PASSWORD || '',
    appId: process.env.EPODATKI_APP_ID || '',
    timeout: 30000,
  }
}

export class EpodatkiAPI {
  private config: EpodatkiConfig

  constructor(config?: Partial<EpodatkiConfig>) {
    this.config = { ...getEpodatkiConfig(), ...config }
  }

  // Submit PIT declaration to e-podatki
  async submitPitDeclaration(xmlData: string, declarationType: 'PIT-37' | 'PIT-36'): Promise<EpodatkiResponse> {
    try {
      // Validate configuration
      if (!this.config.login || !this.config.password) {
        return {
          success: false,
          errorCode: 'CONFIG_ERROR',
          message: 'E-podatki credentials not configured',
        }
      }

      // In production, this would be a real API call
      // For now, we simulate the API call
      console.log(`[EpodatkiAPI] Submitting ${declarationType} declaration...`)

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Generate reference number (in production, this comes from e-podatki)
      const referenceNumber = this.generateReferenceNumber()

      // Simulate validation and processing
      const isValid = this.validateXML(xmlData)
      if (!isValid) {
        return {
          success: false,
          errorCode: 'INVALID_XML',
          message: 'Submitted XML is invalid',
        }
      }

      return {
        success: true,
        referenceNumber,
        status: 'accepted',
        processedAt: new Date().toISOString(),
      }
    } catch (error) {
      console.error('E-podatki submission error:', error)
      return {
        success: false,
        errorCode: 'API_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  // Check submission status
  async checkSubmissionStatus(referenceNumber: string): Promise<EpodatkiStatusResponse> {
    try {
      if (!referenceNumber) {
        throw new Error('Reference number is required')
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // In production, this would query the actual e-podatki API
      // For now, we return a simulated response
      return {
        referenceNumber,
        status: 'accepted',
        message: 'Declaration processed successfully',
        processedAt: new Date().toISOString(),
      }
    } catch (error) {
      console.error('Error checking submission status:', error)
      throw error
    }
  }

  // Validate XML before submission
  private validateXML(xmlData: string): boolean {
    try {
      // Basic XML validation
      if (!xmlData.includes('<?xml') || !xmlData.includes('?>')) {
        return false
      }

      // Check for required elements (PIT-37 or PIT-36)
      if (!xmlData.includes('PIT37') && !xmlData.includes('PIT36')) {
        return false
      }

      // Try parsing XML
      const parser = new DOMParser()
      const doc = parser.parseFromString(xmlData, 'application/xml')

      // Check for parsing errors
      if (doc.getElementsByTagName('parsererror').length > 0) {
        return false
      }

      return true
    } catch {
      return false
    }
  }

  // Generate E-podatki reference number
  private generateReferenceNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `EPOD-${timestamp}-${random}`
  }

  // Retry logic for failed submissions
  async retrySubmission(submission: EpodatkiSubmission, xmlData: string): Promise<EpodatkiResponse> {
    try {
      // Implement exponential backoff
      const retryDelay = Math.min(1000 * Math.pow(2, submission.retryCount), 30000)
      await new Promise(resolve => setTimeout(resolve, retryDelay))

      // Re-attempt submission
      return await this.submitPitDeclaration(xmlData, submission.declarationType)
    } catch (error) {
      console.error('Retry failed:', error)
      throw error
    }
  }

  // Get submission history
  async getSubmissionHistory(userId: string, limit = 10): Promise<Array<{
    referenceNumber: string
    declarationType: string
    submittedAt: string
    status: string
  }>> {
    // In production, this would query the e-podatki API
    // For now, return empty array or mock data
    console.log(`[EpodatkiAPI] Retrieving submission history for user: ${userId}`)
    return []
  }

  // Cancel submission (if not yet processed)
  async cancelSubmission(referenceNumber: string): Promise<boolean> {
    try {
      console.log(`[EpodatkiAPI] Attempting to cancel submission: ${referenceNumber}`)

      // In production, this would call the e-podatki API
      // For now, simulate success
      return true
    } catch (error) {
      console.error('Error canceling submission:', error)
      return false
    }
  }

  // Generate test data for development
  static generateTestDeclaration(): PitDeclaration {
    return {
      id: `pit_${Date.now()}`,
      userId: 'test_user',
      type: 'PIT-37',
      year: 2024,
      status: 'completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),

      businessIncome: 100000,
      businessExpenses: 30000,

      personalIncome: 0,
      capitalGains: 0,
      capitalLosses: 0,
      rentalIncome: 0,

      personalDeduction: 3600,
      reliefs: 0,
      taxAmount: 12000,
      taxToPay: 12000,
    }
  }

  // Generate test XML
  static generateTestXML(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<PIT37 xmlns="http://www.mf.gov.pl/pit">
  <RocznikPodatkowy>2024</RocznikPodatkowy>
  <IdentyfikatorZlozenia>test-pit-37-001</IdentyfikatorZlozenia>
  <DataZlozenia>${new Date().toISOString().split('T')[0]}</DataZlozenia>
  <DanePodstawowe>
    <ImieNazwisko>Test User</ImieNazwisko>
    <RodzajDeklaracji>PIT-37</RodzajDeklaracji>
    <StatusZawodowy>przedsiębiorca</StatusZawodowy>
  </DanePodstawowe>
  <Podsumowanie>
    <DochodDoOpodatkowania>70000</DochodDoOpodatkowania>
    <PodatekDoZaplaty>8400</PodatekDoZaplaty>
  </Podsumowanie>
</PIT37>`
  }
}

// Helper function to check if e-podatki API is configured
export function isEpodatkiConfigured(): boolean {
  const config = getEpodatkiConfig()
  return !!(config.login && config.password && config.appId)
}

// Helper function to validate NIP for e-podatki
export function validateNIPForEpodatki(nip: string): boolean {
  // Polish NIP format: 10 digits
  if (!/^\d{10}$/.test(nip)) return false

  // Checksum validation
  const digits = nip.split('').map(Number)
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]
  let sum = 0

  for (let i = 0; i < 10; i++) {
    sum += digits[i] * weights[i]
  }

  return sum % 10 === 0
}

// Helper function to validate PESEL for e-podatki
export function validatePESELForEpodatki(pesel: string): boolean {
  // Polish PESEL format: 11 digits
  if (!/^\d{11}$/.test(pesel)) return false

  const digits = pesel.split('').map(Number)
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]
  let sum = 0

  for (let i = 0; i < 10; i++) {
    sum += digits[i] * weights[i]
  }

  const checksum = (10 - (sum % 10)) % 10
  return digits[10] === checksum
}

// Export singleton instance
let epodatkiInstance: EpodatkiAPI | null = null

export function getEpodatkiAPI(config?: Partial<EpodatkiConfig>): EpodatkiAPI {
  if (!epodatkiInstance) {
    epodatkiInstance = new EpodatkiAPI(config)
  }
  return epodatkiInstance
}

// Mock implementation for development/testing
export class MockEpodatkiAPI extends EpodatkiAPI {
  async submitPitDeclaration(xmlData: string, declarationType: 'PIT-37' | 'PIT-36'): Promise<EpodatkiResponse> {
    console.log(`[MockEpodatkiAPI] Mock submission of ${declarationType}`)
    console.log(`XML Data: ${xmlData.substring(0, 100)}...`)

    await new Promise(resolve => setTimeout(resolve, 500))

    return {
      success: true,
      referenceNumber: `MOCK-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      status: 'accepted',
      message: 'Mock submission successful',
      processedAt: new Date().toISOString(),
    }
  }

  async checkSubmissionStatus(referenceNumber: string): Promise<EpodatkiStatusResponse> {
    console.log(`[MockEpodatkiAPI] Checking status of ${referenceNumber}`)

    return {
      referenceNumber,
      status: 'accepted',
      message: 'Mock status check successful',
      processedAt: new Date().toISOString(),
    }
  }

  async retrySubmission(submission: EpodatkiSubmission, xmlData: string): Promise<EpodatkiResponse> {
    console.log(`[MockEpodatkiAPI] Mock retry for submission ${submission.id}`)
    return this.submitPitDeclaration(xmlData, submission.declarationType)
  }
}
