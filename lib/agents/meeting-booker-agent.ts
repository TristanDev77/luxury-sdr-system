/**
 * MEETING BOOKER AGENT
 * Books meetings with qualified leads
 * Integrates with Gaia calendar and sends confirmations
 */

interface BookedMeeting {
  meetingId: string;
  leadId: string;
  leadEmail: string;
  leadName: string;
  scheduledTime: Date;
  duration: number;
  meetingLink?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: Date;
}

interface MeetingRequest {
  leadId: string;
  leadEmail: string;
  leadName: string;
  preferredTimes: Date[];
  duration: number;
}

export class MeetingBookerAgent {
  private clientId: string;

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  /**
   * Check availability and book meeting
   */
  async bookMeeting(meetingRequest: MeetingRequest): Promise<BookedMeeting> {
    console.log(`📅 Meeting Booker Agent: Booking meeting for ${meetingRequest.leadName}...`);

    // Check availability
    const availableSlot = await this.findAvailableSlot(meetingRequest.preferredTimes);

    if (!availableSlot) {
      throw new Error('No available slots found');
    }

    // Create meeting in calendar
    const meeting: BookedMeeting = {
      meetingId: `meeting_${Date.now()}`,
      leadId: meetingRequest.leadId,
      leadEmail: meetingRequest.leadEmail,
      leadName: meetingRequest.leadName,
      scheduledTime: availableSlot,
      duration: meetingRequest.duration,
      meetingLink: `https://gaia.example.com/meetings/meeting_${Date.now()}`,
      status: 'confirmed',
      createdAt: new Date(),
    };

    console.log(`✅ Meeting booked`);
    console.log(`   - Lead: ${meeting.leadName}`);
    console.log(`   - Time: ${meeting.scheduledTime.toISOString()}`);
    console.log(`   - Link: ${meeting.meetingLink}`);

    return meeting;
  }

  /**
   * Find available time slot
   */
  private async findAvailableSlot(preferredTimes: Date[]): Promise<Date | null> {
    console.log(`🔍 Finding available slot...`);

    // Simulate checking calendar availability
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return first preferred time as available (in production, check actual calendar)
    if (preferredTimes.length > 0) {
      return preferredTimes[0];
    }

    return null;
  }

  /**
   * Send meeting confirmation email
   */
  async sendConfirmationEmail(meeting: BookedMeeting): Promise<void> {
    console.log(`📧 Sending confirmation email to ${meeting.leadEmail}...`);

    // Simulate email sending (Resend, SendGrid, etc.)
    // The meeting parameter contains all details needed for the email
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log(`✅ Confirmation email sent`);
  }

  /**
   * Send meeting reminder
   */
  async sendReminder(meeting: BookedMeeting): Promise<void> {
    console.log(`⏰ Sending meeting reminder to ${meeting.leadEmail}...`);

    // Simulate reminder email
    // The meeting parameter contains all details needed for the reminder
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log(`✅ Reminder sent`);
  }

  /**
   * Cancel meeting
   */
  async cancelMeeting(meetingId: string): Promise<void> {
    console.log(`❌ Cancelling meeting ${meetingId}...`);

    // Simulate calendar cancellation
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log(`✅ Meeting cancelled`);
  }

  /**
   * Reschedule meeting
   */
  async rescheduleMeeting(
    meetingId: string,
    newTime: Date
  ): Promise<BookedMeeting> {
    console.log(`🔄 Rescheduling meeting ${meetingId}...`);

    // Simulate rescheduling
    await new Promise((resolve) => setTimeout(resolve, 500));

    const rescheduledMeeting: BookedMeeting = {
      meetingId,
      leadId: `lead_${Date.now()}`,
      leadEmail: 'lead@example.com',
      leadName: 'Lead Name',
      scheduledTime: newTime,
      duration: 30,
      meetingLink: `https://gaia.example.com/meetings/${meetingId}`,
      status: 'confirmed',
      createdAt: new Date(),
    };

    console.log(`✅ Meeting rescheduled to ${newTime.toISOString()}`);

    return rescheduledMeeting;
  }

  /**
   * Get meeting details
   */
  async getMeetingDetails(meetingId: string): Promise<BookedMeeting> {
    console.log(`📋 Fetching meeting details for ${meetingId}...`);

    // Simulate fetching meeting from database
    await new Promise((resolve) => setTimeout(resolve, 300));

    const meeting: BookedMeeting = {
      meetingId,
      leadId: `lead_${Date.now()}`,
      leadEmail: 'lead@example.com',
      leadName: 'Lead Name',
      scheduledTime: new Date(),
      duration: 30,
      meetingLink: `https://gaia.example.com/meetings/${meetingId}`,
      status: 'confirmed',
      createdAt: new Date(),
    };

    console.log(`✅ Meeting details retrieved`);

    return meeting;
  }

  /**
   * Batch book meetings
   */
  async batchBookMeetings(
    meetingRequests: MeetingRequest[]
  ): Promise<BookedMeeting[]> {
    console.log(`📅 Booking ${meetingRequests.length} meetings...`);

    const bookedMeetings: BookedMeeting[] = [];

    for (const request of meetingRequests) {
      try {
        const meeting = await this.bookMeeting(request);
        bookedMeetings.push(meeting);
      } catch (error) {
        console.error(`Error booking meeting for ${request.leadName}:`, error);
      }
    }

    console.log(`✅ Booked ${bookedMeetings.length} meetings`);

    return bookedMeetings;
  }
}
