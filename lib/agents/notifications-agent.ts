/**
 * NOTIFICATIONS & ESCALATION AGENT
 * Sends Slack notifications for key events
 * Provides real-time alerts for high-signal events
 */

import { SlackNotification, NotificationEvent } from '../types';

export class NotificationsAgent {
  private clientId: string;
  private slackWebhookUrl: string = process.env.SLACK_WEBHOOK_URL || '';
  private slackChannel: string = process.env.SLACK_CHANNEL || '#sdr-alerts';

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  /**
   * Send Slack notification for key events
   */
  async sendSlackNotification(notification: {
    event: NotificationEvent;
    title: string;
    message: string;
    leadId?: string;
    campaignId?: string;
    meetingId?: string;
  }): Promise<SlackNotification> {
    console.log(`📢 Notifications Agent: Sending Slack notification - ${notification.title}`);

    try {
      // Format message based on event type
      const slackMessage = this.formatSlackMessage(notification);

      // Send to Slack
      await this.postToSlack(slackMessage);

      const slackNotification: SlackNotification = {
        id: `notif_${Date.now()}`,
        clientId: this.clientId,
        event: notification.event,
        title: notification.title,
        message: notification.message,
        leadId: notification.leadId,
        campaignId: notification.campaignId,
        meetingId: notification.meetingId,
        channel: this.slackChannel,
        sent: true,
        sentAt: new Date(),
        createdAt: new Date(),
      };

      console.log(`✅ Slack notification sent to ${this.slackChannel}`);

      return slackNotification;
    } catch (error) {
      console.error('❌ Error sending Slack notification:', error);
      throw error;
    }
  }

  /**
   * Format notification message for Slack
   */
  private formatSlackMessage(notification: any): any {
    const colors: Record<NotificationEvent, string> = {
      'Positive Reply': '#36a64f',
      'Gaia Call Completed': '#0099ff',
      'Meeting Booked': '#ff6b6b',
      'High-Value Lead': '#ffd700',
      'System Error': '#ff0000',
      'Campaign Milestone': '#9c27b0',
    };

    return {
      channel: this.slackChannel,
      attachments: [
        {
          color: colors[notification.event],
          title: notification.title,
          text: notification.message,
          footer: 'Luxury SDR System',
          ts: Math.floor(Date.now() / 1000),
        },
      ],
    };
  }

  /**
   * Post message to Slack webhook
   */
  private async postToSlack(message: any): Promise<void> {
    // In production, this would call the Slack webhook URL
    // For now, we'll just log it

    console.log(`📤 Posting to Slack:`, JSON.stringify(message, null, 2));

    // Actual implementation would be:
    // const response = await fetch(this.slackWebhookUrl, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(message),
    // });
  }

  /**
   * Send escalation alert for high-priority events
   */
  async sendEscalationAlert(
    title: string,
    message: string,
    priority: 'Critical' | 'High' | 'Medium'
  ): Promise<void> {
    console.log(`🚨 Notifications Agent: Sending escalation alert - ${title}`);

    const escalationMessage = {
      channel: this.slackChannel,
      attachments: [
        {
          color: priority === 'Critical' ? '#ff0000' : priority === 'High' ? '#ff6b6b' : '#ffa500',
          title: `🚨 ${priority} Priority: ${title}`,
          text: message,
          footer: 'Luxury SDR System - Escalation Alert',
          ts: Math.floor(Date.now() / 1000),
        },
      ],
    };

    await this.postToSlack(escalationMessage);
  }

  /**
   * Send daily summary report
   */
  async sendDailySummary(metrics: any): Promise<void> {
    console.log(`📊 Notifications Agent: Sending daily summary`);

    const summaryMessage = {
      channel: this.slackChannel,
      attachments: [
        {
          color: '#0099ff',
          title: '📊 Daily SDR Summary',
          fields: [
            {
              title: 'Leads Outreached',
              value: metrics.leadsOutreached,
              short: true,
            },
            {
              title: 'Replies Received',
              value: metrics.repliesReceived,
              short: true,
            },
            {
              title: 'Positive Intent',
              value: metrics.positiveReplies,
              short: true,
            },
            {
              title: 'Gaia Calls',
              value: metrics.gaiaCalls,
              short: true,
            },
            {
              title: 'Meetings Booked',
              value: metrics.meetingsBooked,
              short: true,
            },
            {
              title: 'Reply Rate',
              value: `${metrics.replyRate}%`,
              short: true,
            },
          ],
          footer: 'Luxury SDR System',
          ts: Math.floor(Date.now() / 1000),
        },
      ],
    };

    await this.postToSlack(summaryMessage);
  }
}
