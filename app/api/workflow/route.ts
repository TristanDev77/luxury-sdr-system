/**
 * API Route: Execute SDR Workflow
 * POST /api/workflow
 * 
 * Receives ICP data and initiates the complete multi-agent workflow
 */

import { NextRequest, NextResponse } from 'next/server';
import { SDROrchestrator } from '@/lib/agents';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientId, icpData } = body;

    // Validate required fields
    if (!clientId || !icpData) {
      return NextResponse.json(
        { error: 'Missing required fields: clientId, icpData' },
        { status: 400 }
      );
    }

    // Initialize orchestrator
    const orchestrator = new SDROrchestrator(clientId);

    // Execute workflow (runs asynchronously)
    orchestrator.executeFullWorkflow(clientId, icpData).catch((error) => {
      console.error('Workflow execution error:', error);
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Workflow initiated successfully',
        clientId,
        workflowId: `workflow_${Date.now()}`,
      },
      { status: 202 } // 202 Accepted - async operation
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate workflow' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/workflow
 * Retrieve workflow status
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const workflowId = searchParams.get('workflowId');

    if (!workflowId) {
      return NextResponse.json(
        { error: 'Missing workflowId parameter' },
        { status: 400 }
      );
    }

    // In production, this would query the database for workflow status
    return NextResponse.json({
      workflowId,
      status: 'running',
      progress: 45,
      currentStep: 'Enrichment & Scoring',
      message: 'Processing 150 leads...',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve workflow status' },
      { status: 500 }
    );
  }
}
