import { NextRequest, NextResponse } from 'next/server'
import { EpodatkiSubmission, PitDeclaration } from '@/lib/types/pit-types'
import { getEpodatkiAPI, MockEpodatkiAPI } from '@/lib/pit/epodatki-api'
import { updateEpodatkiSubmission } from '@/lib/pit/pit-store'
import { generatePit37XML } from '@/lib/pit/pit-37-generator'
import { generatePit36XML } from '@/lib/pit/pit-36-generator'

// Use mock API if real credentials not configured
const useRealAPI = process.env.EPODATKI_LOGIN && process.env.EPODATKI_PASSWORD

interface SubmitRequest {
  declaration: PitDeclaration
  submissionId: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { declaration, submissionId }: SubmitRequest = body

    if (!declaration || !submissionId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Declaration and submissionId are required',
        },
        { status: 400 }
      )
    }

    // Validate declaration
    if (!declaration.userId || !declaration.type || !declaration.year) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid declaration data',
        },
        { status: 400 }
      )
    }

    // Generate XML based on declaration type
    let xmlData = ''
    if (declaration.type === 'PIT-37') {
      xmlData = generatePit37XML(declaration)
    } else if (declaration.type === 'PIT-36') {
      xmlData = generatePit36XML(declaration)
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Unsupported declaration type',
        },
        { status: 400 }
      )
    }

    // Get E-podatki API instance
    const epodatkiAPI = useRealAPI ? getEpodatkiAPI() : new MockEpodatkiAPI()

    // Submit to E-podatki
    const response = await epodatkiAPI.submitPitDeclaration(xmlData, declaration.type)

    if (!response.success) {
      // Update submission with error
      updateEpodatkiSubmission(submissionId, {
        status: 'rejected',
        errorMessage: response.message || 'Submission failed',
        retryCount: 1,
        lastRetryAt: new Date().toISOString(),
      })

      return NextResponse.json(
        {
          success: false,
          message: response.message || 'Failed to submit to E-podatki',
          error: response.errorCode,
        },
        { status: 400 }
      )
    }

    // Update submission with success
    updateEpodatkiSubmission(submissionId, {
      status: 'sent',
      referenceNumber: response.referenceNumber,
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        success: true,
        referenceNumber: response.referenceNumber,
        status: response.status,
        message: 'Declaration submitted successfully to E-podatki',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error submitting to E-podatki:', error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Error submitting declaration',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const referenceNumber = request.nextUrl.searchParams.get('referenceNumber')

    if (!referenceNumber) {
      return NextResponse.json(
        {
          success: false,
          message: 'referenceNumber query parameter is required',
        },
        { status: 400 }
      )
    }

    // Get E-podatki API instance
    const epodatkiAPI = useRealAPI ? getEpodatkiAPI() : new MockEpodatkiAPI()

    // Check submission status
    const statusResponse = await epodatkiAPI.checkSubmissionStatus(referenceNumber)

    return NextResponse.json(
      {
        success: true,
        data: statusResponse,
        message: 'Status retrieved successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error checking submission status:', error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Error checking status',
      },
      { status: 500 }
    )
  }
}
