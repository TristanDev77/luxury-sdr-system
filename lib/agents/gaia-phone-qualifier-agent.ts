/**
 * GAIA PHONE QUALIFIER AGENT
 * Calls warm leads using Lindy's Gaia phone capabilities
 * Performs qualification using BANT criteria
 * Handles objections and books meetings
 */

import { PhoneQualificationCall, BookingRequest, BookingConfirmation } from '../types';

export class GaiaPhoneQualifierAgent {
  private clientId: string;
  private gaiaApiKey: string = process.env.GAIA_API_KEY || '';

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  /**
   * Initiate a qualification call with a warm lead
   */
  async initiateQualificationCall(leadId: string): Promise<PhoneQualificationCall> {
    console.log(`📞 Gaia Phone Qualifier: Initiating call for lead ${leadId}`);

    // In production, this would:
    // 1. Fetch lead details from database
    // 2. Call Gaia API to initiate phone call
    // 3. Use luxury, concierge-like tone
    // 4. Perform BANT qualification

    const call: PhoneQualificationCall = {
      id: `call_${Date.now()}`,
      clientId: this.clientId,
      leadId: leadId,
      prospectName: 'John Doe',
      prospectPhone: '+1-555-0123',
      prospectEmail: 'john@example.com',
      company: 'Acme Corp',
      status: 'Scheduled',
      interestLevel: 'High',
      callStartTime: new Date(),
      callDuration: 0,
    };

    console.log(`✅ Call scheduled with ${call.prospectName}`);

    return call;
  }

  /**
   * Perform BANT qualification during the call
   * Budget, Authority, Need, Timeline
   */
  async performQualification(callId: string): Promise<PhoneQualificationCall> {
    console.log(`🎯 Gaia Phone Qualifier: Performing BANT qualification for call ${callId}`);

    // In production, this would be handled by Gaia during the actual call
    // The agent would ask qualifying questions and record responses

    const call: PhoneQualificationCall = {
      id: callId,
      clientId: this.clientId,
      leadId: 'lead_123',
      prospectName: 'John Doe',
      prospectPhone: '+1-555-0123',
      prospectEmail: 'john@example.com',
      company: 'Acme Corp',
      status: 'Completed',
      qualificationNotes: 'Strong fit. Budget allocated. Decision maker. Timeline: 30-60 days.',
      budget: {
        hasAllocated: true,
        amount: 50000,
      },
      authority: {
        canDecide: true,
        needsApproval: false,
      },
      need: {
        urgency: 'Short-term',
        specificProblem: 'Need to improve sales efficiency',
      },
      timeline: {
        decisionTimeline: '30-60 days',
        implementationTimeline: '60-90 days',
      },
      interestLevel: 'High',
      callStartTime: new Date(Date.now() - 15 * 60 * 1000),
      callEndTime: new Date(),
      callDuration: 15 * 60,
    };

    console.log(`✅ Qualification complete. Interest level: ${call.interestLevel}`);

    return call;
  }

  /**
   * Handle objections during the call
   */
  async handleObjection(callId: string, objection: string): Promise<string> {
    console.log(`🛡️ Gaia Phone Qualifier: Handling objection - "${objection}"`);

    // In production, Gaia would handle this in real-time
    // For now, we'll generate a response

    const responses: Record<string, string> = {
      'too expensive': 'I understand cost is a consideration. Many of our clients see ROI within 3-6 months. Would it help if I showed you the typical payback period?',
      'not the right time': 'That makes sense. When would be a better time to revisit this? I can follow up then.',
      'we already have a solution': 'Great! I\'d love to hear about what you\'re using. Often, we find we can complement existing solutions or provide additional value.',
      'need to talk to my team': 'Absolutely. Who else should be involved in this conversation? I\'m happy to include them.',
    };

    const response = responses[objection.toLowerCase()] || 'I appreciate that concern. Let me address it...';

    console.log(`✅ Objection handled with response: "${response}"`);

    return response;
  }

  /**
   * If prospect is interested, create booking request
   */
  async createBookingRequest(callId: string): Promise<BookingRequest> {
    console.log(`📅 Gaia Phone Qualifier: Creating booking request for call ${callId}`);

    const bookingRequest: BookingRequest = {
      prospectName: 'John Doe',
      company: 'Acme Corp',
      email: 'john@example.com',
      phone: '+1-555-0123',
      qualification_notes: 'Strong fit. Budget allocated. Decision maker. Timeline: 30-60 days.',
      preferred_time_window: 'Tuesday-Thursday, 2-4 PM EST',
      urgency: 'High',
      context_of_interest: 'Interested in improving sales efficiency with our platform',
    };

    console.log(`✅ Booking request created for ${bookingRequest.prospectName}`);

    return bookingRequest;
  }

  /**
   * Confirm booking on the call (live confirmation)
   */
  async confirmBookingOnCall(callId: string, booking: BookingConfirmation): Promise<void> {
    console.log(`✅ Gaia Phone Qualifier: Confirming booking on call ${callId}`);

    // In production, Gaia would speak the confirmation to the prospect
    const confirmationMessage = `Perfect! I've scheduled our meeting for ${booking.confirmed_time}. You'll receive a calendar invite at ${booking.calendar_link}. Looking forward to our conversation!`;

    console.log(`📢 Gaia says: "${confirmationMessage}"`);
  }

  /**
   * Generate call transcript summary
   */
  async generateCallSummary(callId: string): Promise<string> {
    console.log(`📝 Gaia Phone Qualifier: Generating call summary for ${callId}`);

    const summary = `
Call Summary:
- Prospect: John Doe, Acme Corp
- Duration: 15 minutes
- Interest Level: High
- Budget: Allocated ($50K)
- Authority: Decision maker
- Need: Improve sales efficiency
- Timeline: 30-60 days decision, 60-90 days implementation
- Next Step: Discovery call scheduled
- Outcome: Qualified lead, meeting booked
    `;

    console.log(`✅ Call summary generated`);

    return summary;
  }
}
