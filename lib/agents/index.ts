/**
 * Multi-Agent SDR System - Agent Orchestration Layer
 * Coordinates all 9 specialized agents in the workflow
 */

import { ICPStrategyAgent } from './icp-strategy-agent';
import { LeadSourceAgent } from './lead-source-agent';
import { EnrichmentAgent } from './enrichment-agent';
import { OutboundSequencerAgent } from './outbound-sequencer-agent';
import { ReplyClassifierAgent } from './reply-classifier-agent';
import { GaiaPhoneQualifierAgent } from './gaia-phone-qualifier-agent';
import { MeetingBookerAgent } from './meeting-booker-agent';
import { NotificationsAgent } from './notifications-agent';
import { ReportingAgent } from './reporting-agent';

/**
 * Main orchestrator for the multi-agent SDR system
 * Manages workflow progression and inter-agent communication
 */
export class SDROrchestrator {
  private icpAgent: ICPStrategyAgent;
  private leadSourceAgent: LeadSourceAgent;
  private enrichmentAgent: EnrichmentAgent;
  private outboundAgent: OutboundSequencerAgent;
  private replyAgent: ReplyClassifierAgent;
  private gaiaAgent: GaiaPhoneQualifierAgent;
  private bookingAgent: MeetingBookerAgent;
  private notificationsAgent: NotificationsAgent;
  private reportingAgent: ReportingAgent;

  constructor(clientId: string) {
    // Initialize all agents with client context
    this.icpAgent = new ICPStrategyAgent(clientId);
    this.leadSourceAgent = new LeadSourceAgent(clientId);
    this.enrichmentAgent = new EnrichmentAgent(clientId);
    this.outboundAgent = new OutboundSequencerAgent(clientId);
    this.replyAgent = new ReplyClassifierAgent(clientId);
    this.gaiaAgent = new GaiaPhoneQualifierAgent(clientId);
    this.bookingAgent = new MeetingBookerAgent(clientId);
    this.notificationsAgent = new NotificationsAgent(clientId);
    this.reportingAgent = new ReportingAgent(clientId);
  }

  /**
   * Execute the complete SDR workflow end-to-end
   * ICP → Lead Sourcing → Enrichment → Outbound → Replies → Gaia → Booking → CRM Sync → Reporting
   */
  async executeFullWorkflow(clientId: string, icpData: any): Promise<void> {
    try {
      console.log('🚀 Starting full SDR workflow for client:', clientId);

      // Step 1: ICP & Strategy
      console.log('📋 Step 1: Creating ICP & Strategy Playbook...');
      const playbook = await this.icpAgent.createTargetingPlaybook(icpData);
      await this.notificationsAgent.sendSlackNotification({
        event: 'Campaign Milestone',
        title: 'ICP Playbook Created',
        message: `Targeting playbook created with ${playbook.buyerPersonas.length} personas`,
      });

      // Step 2: Lead Sourcing
      console.log('🔍 Step 2: Sourcing leads from Instantly...');
      const rawLeadPool = await this.leadSourceAgent.buildLeadList(playbook);
      await this.notificationsAgent.sendSlackNotification({
        event: 'Campaign Milestone',
        title: 'Leads Sourced',
        message: `${rawLeadPool.totalCount} leads sourced from Instantly`,
      });

      // Step 3: Enrichment & Scoring
      console.log('💎 Step 3: Enriching and scoring leads...');
      const prioritizedLeads = await this.enrichmentAgent.enrichAndScore(rawLeadPool);
      await this.notificationsAgent.sendSlackNotification({
        event: 'Campaign Milestone',
        title: 'Leads Enriched',
        message: `${prioritizedLeads.totalCount} leads enriched and scored`,
      });

      // Step 4: Outbound Sequencing
      console.log('📧 Step 4: Building and launching outbound sequences...');
      const campaign = await this.outboundAgent.buildAndLaunchSequence(
        playbook,
        prioritizedLeads
      );
      await this.notificationsAgent.sendSlackNotification({
        event: 'Campaign Milestone',
        title: 'Campaign Launched',
        message: `Outbound campaign launched with ${campaign.leads.length} leads`,
      });

      // Step 5-9: Continuous monitoring (these run asynchronously)
      console.log('🔄 Steps 5-9: Starting continuous monitoring...');
      this.startContinuousMonitoring(campaign.id);

      console.log('✅ Workflow initialized successfully');
    } catch (error) {
      console.error('❌ Workflow error:', error);
      await this.notificationsAgent.sendSlackNotification({
        event: 'System Error',
        title: 'Workflow Error',
        message: `Error in SDR workflow: ${error}`,
      });
      throw error;
    }
  }

  /**
   * Start continuous monitoring for replies and qualification
   * Runs asynchronously to handle incoming replies and trigger Gaia calls
   */
  private startContinuousMonitoring(campaignId: string): void {
    // Poll for new replies every 5 minutes
    setInterval(async () => {
      try {
        // Step 5: Check for replies
        const newReplies = await this.replyAgent.checkForNewReplies(campaignId);

        for (const reply of newReplies) {
          // Classify the reply
          const classification = await this.replyAgent.classifyReply(reply);

          // Route based on intent
          if (classification.intent === 'Positive Intent') {
            // Step 6: Trigger Gaia Phone Qualifier
            const callResult = await this.gaiaAgent.initiateQualificationCall(
              reply.leadId
            );

            if (callResult.bookingRequest) {
              // Step 7: Trigger Meeting Booker
              const booking = await this.bookingAgent.bookMeeting(
                callResult.bookingRequest
              );

              // Step 8: Sync to Close CRM
              await this.bookingAgent.syncToCloseCRM(booking);

              // Notify Gaia to confirm on call
              await this.gaiaAgent.confirmBookingOnCall(
                callResult.id,
                booking
              );

              // Send Slack notification
              await this.notificationsAgent.sendSlackNotification({
                event: 'Meeting Booked',
                title: 'Meeting Scheduled',
                message: `Meeting booked with ${callResult.prospectName} at ${booking.confirmed_time}`,
              });
            }
          } else if (classification.intent === 'Neutral / Questions') {
            // Send follow-up response
            await this.outboundAgent.sendFollowUpResponse(
              reply.leadId,
              classification.suggestedResponse
            );
          } else if (classification.intent === 'Objection') {
            // Handle objection
            await this.outboundAgent.handleObjection(
              reply.leadId,
              classification.suggestedResponse
            );
          } else {
            // Close loop for negative responses
            await this.replyAgent.closeLoop(reply.leadId);
          }
        }
      } catch (error) {
        console.error('Error in continuous monitoring:', error);
      }
    }, 5 * 60 * 1000); // 5 minutes
  }

  /**
   * Generate reports and insights
   * Step 9: Reporting & Insights
   */
  async generateReports(campaignId: string): Promise<void> {
    try {
      console.log('📊 Step 9: Generating reports and insights...');
      const report = await this.reportingAgent.generateInsightReport(campaignId);

      await this.notificationsAgent.sendSlackNotification({
        event: 'Campaign Milestone',
        title: 'Report Generated',
        message: `Campaign report generated with ${report.metrics.totalLeads} leads analyzed`,
      });
    } catch (error) {
      console.error('Error generating reports:', error);
    }
  }

  // Expose individual agents for direct access if needed
  getICPAgent(): ICPStrategyAgent {
    return this.icpAgent;
  }

  getLeadSourceAgent(): LeadSourceAgent {
    return this.leadSourceAgent;
  }

  getEnrichmentAgent(): EnrichmentAgent {
    return this.enrichmentAgent;
  }

  getOutboundAgent(): OutboundSequencerAgent {
    return this.outboundAgent;
  }

  getReplyAgent(): ReplyClassifierAgent {
    return this.replyAgent;
  }

  getGaiaAgent(): GaiaPhoneQualifierAgent {
    return this.gaiaAgent;
  }

  getBookingAgent(): MeetingBookerAgent {
    return this.bookingAgent;
  }

  getNotificationsAgent(): NotificationsAgent {
    return this.notificationsAgent;
  }

  getReportingAgent(): ReportingAgent {
    return this.reportingAgent;
  }
}

export {
  ICPStrategyAgent,
  LeadSourceAgent,
  EnrichmentAgent,
  OutboundSequencerAgent,
  ReplyClassifierAgent,
  GaiaPhoneQualifierAgent,
  MeetingBookerAgent,
  NotificationsAgent,
  ReportingAgent,
};
