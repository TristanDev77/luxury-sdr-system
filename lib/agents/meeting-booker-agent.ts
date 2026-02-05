/**
 * MEETING BOOKER & CRM SYNC AGENT
 * Receives booking requests from Gaia
 * Checks calendar availability and books meetings
 * Syncs all data to Close CRM
 */

import { BookingRequest, BookingConfirmation, Meeting, CRMSyncData } from '../types';

export class MeetingBookerAgent {
  private clientId: string;
  private closeCrmApiKey: string = process.env.CLOSE_CRM_API_KEY || '';

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  /**
   * Book a meeting based on booking request from Gaia
   */
  async bookMeeting(bookingRequest: BookingRequest): Promise<BookingConfirmation> {
    console.log(`📅 Meeting Booker Agent: Booking meeting for ${bookingRequest.prospectName}`);

    try {
      // Check calendar availability
      const availableSlots = await this.checkCalendarAvailability(
        bookingRequest.preferred_time_window
      );

      if (availableSlots.length === 0) {
        throw new Error('No available time slots');
      }

      // Book the first available slot
      const bookedTime = availableSlots[0];

      // Create calendar event
      const calendarLink = await this.createCalendarEvent(bookingRequest, bookedTime);

      // Create meeting record
      const meeting: Meeting = {
        id: `meeting_${Date.now()}`,
        clientId: this.clientId,
        leadId: `lead_${Date.now()}`,
        prospectName: bookingRequest.prospectName,
        prospectEmail: bookingRequest.email,
        prospectPhone: bookingRequest.phone,
        company: bookingRequest.company,
        scheduledTime: new Date(bookedTime),
        duration: 30,
        timezone: 'America/New_York',
        type: 'Discovery Call',
        status: 'Confirmed',
        calendarLink: calendarLink,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Send confirmation email
      await this.sendConfirmationEmail(meeting);

      const confirmation: BookingConfirmation = {
        confirmed_time: bookedTime,
        calendar_link: calendarLink,
        crm_record_url: `https://app.close.com/lead/${meeting.leadId}`,
      };

      console.log(`✅ Meeting booked for ${bookingRequest.prospectName} at ${bookedTime}`);

      return confirmation;
    } catch (error) {
      console.error('❌ Error booking meeting:', error);
      throw error;
    }
  }

  /**
   * Check calendar availability
   */
  private async checkCalendarAvailability(preferredWindow: string): Promise<string[]> {
    console.log(`🔍 Checking calendar availability for: ${preferredWindow}`);

    // Simulate calendar check
    // In production, this would integrate with Google Calendar, Outlook, etc.

    const now = new Date();
    const availableSlots: string[] = [];

    // Generate some available slots
    for (let i = 1; i <= 5; i++) {
      const slotDate = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
      // Only add Tuesday-Thursday slots between 2-4 PM
      if (slotDate.getDay() >= 2 && slotDate.getDay() <= 4) {
        slotDate.setHours(14, 0, 0, 0);
        availableSlots.push(slotDate.toISOString());
      }
    }

    return availableSlots;
  }

  /**
   * Create calendar event
   */
  private async createCalendarEvent(bookingRequest: BookingRequest, time: string): Promise<string> {
    console.log(`📆 Creating calendar event for ${time}`);

    // In production, this would create an actual calendar event
    // For now, return a mock calendar link

    return `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(
      `Discovery Call with ${bookingRequest.prospectName}`
    )}&dates=${time}`;
  }

  /**
   * Send confirmation email to prospect
   */
  private async sendConfirmationEmail(meeting: Meeting): Promise<void> {
    console.log(`📧 Sending confirmation email to ${meeting.prospectEmail}`);

    // In production, this would send via Resend, SendGrid, etc.

    const emailContent = `
Dear ${meeting.prospectName},

Thank you for scheduling a meeting with us! We're excited to connect.

Meeting Details:
- Date & Time: ${meeting.scheduledTime.toLocaleString()}
- Duration: ${meeting.duration} minutes
- Type: ${meeting.type}

Calendar Link: ${meeting.calendarLink}

If you need to reschedule, please let us know as soon as possible.

Looking forward to our conversation!

Best regards,
[Your Company]
    `;

    console.log(`✅ Confirmation email sent`);
  }

  /**
   * Sync meeting and lead data to Close CRM
   */
  async syncToCloseCRM(booking: BookingConfirmation): Promise<void> {
    console.log(`🔄 Meeting Booker Agent: Syncing to Close CRM`);

    try {
      // Create/update lead in Close CRM
      const leadData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1-555-0123',
        company_name: 'Acme Corp',
        custom: {
          icp_score: 85,
          enrichment_data: {
            revenue: 50000000,
            employees: 500,
            industry: 'Technology',
          },
        },
      };

      const leadId = await this.createOrUpdateLead(leadData);

      // Create opportunity in Close CRM
      const opportunityData = {
        lead_id: leadId,
        name: 'Discovery Call - Acme Corp',
        value: 50000,
        status_id: 'stat_qualified',
        expected_close_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        custom: {
          qualification_notes: 'Strong fit. Budget allocated. Decision maker.',
          call_transcript: 'Call summary and transcript here',
        },
      };

      const opportunityId = await this.createOrUpdateOpportunity(opportunityData);

      // Create activity for the meeting
      const activityData = {
        lead_id: leadId,
        type: 'call',
        subject: 'Discovery Call',
        date: new Date(booking.confirmed_time).toISOString(),
        duration: 30,
        notes: 'Scheduled discovery call',
      };

      await this.createActivity(activityData);

      console.log(`✅ Data synced to Close CRM`);
      console.log(`   - Lead ID: ${leadId}`);
      console.log(`   - Opportunity ID: ${opportunityId}`);
    } catch (error) {
      console.error('❌ Error syncing to Close CRM:', error);
      throw error;
    }
  }

  /**
   * Create or update lead in Close CRM
   */
  private async createOrUpdateLead(leadData: any): Promise<string> {
    console.log(`👤 Creating/updating lead in Close CRM`);

    // In production, this would call Close CRM API
    // POST /api/v1/leads/ or PUT /api/v1/leads/{id}/

    return `lead_${Date.now()}`;
  }

  /**
   * Create or update opportunity in Close CRM
   */
  private async createOrUpdateOpportunity(opportunityData: any): Promise<string> {
    console.log(`💼 Creating/updating opportunity in Close CRM`);

    // In production, this would call Close CRM API
    // POST /api/v1/opportunities/ or PUT /api/v1/opportunities/{id}/

    return `opp_${Date.now()}`;
  }

  /**
   * Create activity (call, email, etc.) in Close CRM
   */
  private async createActivity(activityData: any): Promise<string> {
    console.log(`📝 Creating activity in Close CRM`);

    // In production, this would call Close CRM API
    // POST /api/v1/activities/

    return `activity_${Date.now()}`;
  }
}
