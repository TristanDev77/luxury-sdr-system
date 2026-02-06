/**
 * NOTIFICATIONS AGENT
 * Sends alerts and notifications to Slack
 * Manages notification routing and escalation
 */

interface NotificationPayload {
  type: 'lead_enriched' | 'positive_reply' | 'meeting_booked' | 'gaia_call' | 'error';
  title: string;
  message: string;
  leadId?: string;
  leadName?: string;
  metadata?: Record<string, unknown>;
}

interface SlackMessage {
  channel: string;
  text: string;
  blocks?: unknown[];
  attachments?: unknown[];
}

export class NotificationsAgent {
  private clientId: string;
  private slackWebhookUrl: string;

  constructor(clientId: string, slackWebhookUrl?: string) {
    this.clientId = clientId;
    this.slackWebhookUrl = slackWebhookUrl || process.env.SLACK_WEBHOOK_URL || '';
  }

  /**
   * Send notification based on event type
   */
  async sendNotification(payload: NotificationPayload): Promise<void> {
    console.log(`📢 Notifications Agent: Sending ${payload.type} notification...`);

    // Route notification based on type
    switch (payload.type) {
      case 'lead_enriched':
        await this.notifyLeadEnriched(payload);
        break;
      case 'positive_reply':
        await this.notifyPositiveReply(payload);
        break;
      case 'meeting_booked':
        await this.notifyMeetingBooked(payload);
        break;
      case 'gaia_call':
        await this.notifyGaiaCall(payload);
        break;
      case 'error':
        await this.notifyError(payload);
        break;
      default:
        console.warn(`Unknown notification type: ${payload.type}`);
    }

    console.log(`✅ Notification sent`);
  }

  /**
   * Notify when lead is enriched
   */
  private async notifyLeadEnriched(payload: NotificationPayload): Promise<void> {
    const message: SlackMessage = {
      channel: '#sdr-workflow',
      text: `💎 Lead Enriched: ${payload.leadName}`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Lead Enriched*\n${payload.message}`,
          },
        },
      ],
    };

    await this.sendToSlack(message);
  }

  /**
   * Notify when positive reply received
   */
  private async notifyPositiveReply(payload: NotificationPayload): Promise<void> {
    const message: SlackMessage = {
      channel: '#sdr-workflow',
      text: `💬 Positive Reply: ${payload.leadName}`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Positive Reply Received*\n${payload.message}`,
          },
        },
      ],
    };

    await this.sendToSlack(message);
  }

  /**
   * Notify when meeting is booked
   */
  private async notifyMeetingBooked(payload: NotificationPayload): Promise<void> {
    const message: SlackMessage = {
      channel: '#sdr-workflow',
      text: `📅 Meeting Booked: ${payload.leadName}`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Meeting Booked*\n${payload.message}`,
          },
        },
      ],
    };

    await this.sendToSlack(message);
  }

  /**
   * Notify when Gaia call is completed
   */
  private async notifyGaiaCall(payload: NotificationPayload): Promise<void> {
    const message: SlackMessage = {
      channel: '#sdr-workflow',
      text: `📞 Gaia Call: ${payload.leadName}`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Gaia Call Completed*\n${payload.message}`,
          },
        },
      ],
    };

    await this.sendToSlack(message);
  }

  /**
   * Notify on error
   */
  private async notifyError(payload: NotificationPayload): Promise<void> {
    const message: SlackMessage = {
      channel: '#sdr-errors',
      text: `⚠️ Error: ${payload.title}`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Error Occurred*\n${payload.message}`,
          },
        },
      ],
    };

    await this.sendToSlack(message);
  }

  /**
   * Send message to Slack
   */
  private async sendToSlack(message: SlackMessage): Promise<void> {
    if (!this.slackWebhookUrl) {
      console.warn('Slack webhook URL not configured - skipping notification');
      return;
    }

    try {
      // Simulate Slack API call
      // In production, use fetch to call Slack webhook
      await new Promise((resolve) => setTimeout(resolve, 300));

      console.log(`✅ Message sent to Slack: ${message.channel}`);
    } catch (error) {
      console.error('Error sending Slack message:', error);
    }
  }

  /**
   * Send batch notifications
   */
  async sendBatchNotifications(
    payloads: NotificationPayload[]
  ): Promise<void> {
    console.log(`📢 Sending ${payloads.length} notifications...`);

    for (const payload of payloads) {
      await this.sendNotification(payload);
    }

    console.log(`✅ All notifications sent`);
  }

  /**
   * Send daily summary report
   */
  async sendDailySummary(summary: {
    totalLeads: number;
    leadsEnriched: number;
    positiveReplies: number;
    meetingsBooked: number;
  }): Promise<void> {
    console.log(`📊 Sending daily summary...`);

    const message: SlackMessage = {
      channel: '#sdr-reports',
      text: '📊 Daily SDR Summary',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Daily SDR Summary*\n• Total Leads: ${summary.totalLeads}\n• Enriched: ${summary.leadsEnriched}\n• Positive Replies: ${summary.positiveReplies}\n• Meetings Booked: ${summary.meetingsBooked}`,
          },
        },
      ],
    };

    await this.sendToSlack(message);
  }
}
