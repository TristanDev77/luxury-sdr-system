/**
 * AGENT ORCHESTRATION
 * Central hub for all 9 specialized SDR agents
 * Manages workflow coordination and data flow
 */

import { ICPStrategyAgent } from './icp-strategy-agent';
import { LeadSourceAgent } from './lead-source-agent';
import { EnrichmentAgent } from './enrichment-agent';
import { OutboundSequencerAgent } from './outbound-sequencer-agent';
import { ReplyClassifierAgent } from './reply-classifier-agent';
import { GaiaPhoneAgent } from './gaia-phone-agent';
import { MeetingBookerAgent } from './meeting-booker-agent';
import { NotificationsAgent } from './notifications-agent';
import { ReportingAgent } from './reporting-agent';

/**
 * SDRWorkflow orchestrates all 9 agents in a coordinated workflow
 * Data flows through agents in sequence:
 * 1. ICP Strategy → Define ideal customer profile
 * 2. Lead Source → Fetch leads from multiple channels
 * 3. Enrichment → Enrich lead data with company/social info
 * 4. Outbound Sequencer → Create multi-touch sequences
 * 5. Reply Classifier → Analyze incoming replies
 * 6. Gaia Phone → Schedule and manage phone calls
 * 7. Meeting Booker → Book meetings with qualified leads
 * 8. Notifications → Send Slack alerts to team
 * 9. Reporting → Generate analytics and KPIs
 */
export class SDRWorkflow {
  private clientId: string;
  private icpAgent: ICPStrategyAgent;
  private leadSourceAgent: LeadSourceAgent;
  private enrichmentAgent: EnrichmentAgent;
  private outboundAgent: OutboundSequencerAgent;
  private replyAgent: ReplyClassifierAgent;
  private phoneAgent: GaiaPhoneAgent;
  private meetingAgent: MeetingBookerAgent;
  private notificationsAgent: NotificationsAgent;
  private reportingAgent: ReportingAgent;

  constructor(clientId: string) {
    this.clientId = clientId;

    // Initialize all 9 agents
    this.icpAgent = new ICPStrategyAgent(clientId);
    this.leadSourceAgent = new LeadSourceAgent(clientId);
    this.enrichmentAgent = new EnrichmentAgent(clientId);
    this.outboundAgent = new OutboundSequencerAgent(clientId);
    this.replyAgent = new ReplyClassifierAgent(clientId);
    this.phoneAgent = new GaiaPhoneAgent(clientId);
    this.meetingAgent = new MeetingBookerAgent(clientId);
    this.notificationsAgent = new NotificationsAgent(clientId);
    this.reportingAgent = new ReportingAgent(clientId);

    console.log('✅ SDR Workflow initialized with 9 specialized agents');
  }

  /**
   * Execute complete SDR workflow
   * Orchestrates all agents in sequence
   */
  async executeWorkflow(): Promise<void> {
    console.log('\n🚀 Starting SDR Workflow Execution...\n');

    try {
      // Step 1: Define ICP
      console.log('📋 Step 1: ICP Strategy Agent');
      const icpProfile = this.icpAgent.defineICP();
      console.log(`✅ ICP defined: ${icpProfile.name}\n`);

      // Step 2: Fetch leads
      console.log('📋 Step 2: Lead Source Agent');
      const rawLeads = await this.leadSourceAgent.fetchLeads();
      console.log(`✅ Fetched ${rawLeads.totalCount} leads\n`);

      // Step 3: Validate leads
      const { valid: validLeads } = this.leadSourceAgent.validateLeads(rawLeads.leads);
      console.log(`✅ Validated ${validLeads.length} leads\n`);

      // Step 4: Enrich leads
      console.log('📋 Step 3: Enrichment Agent');
      const enrichmentResult = await this.enrichmentAgent.enrichAndScore({ id: rawLeads.id, clientId: rawLeads.clientId, campaignId: rawLeads.campaignId, leads: validLeads, totalCount: validLeads.length, createdAt: rawLeads.createdAt, updatedAt: new Date() });
      const enrichedLeads = enrichmentResult.leads;
      console.log(`✅ Enriched ${enrichedLeads.length} leads\n`);

      // Step 5: Score and prioritize
      console.log('📋 Step 4: ICP Scoring');
      const scoredLeads = this.icpAgent.scoreLeads(enrichedLeads);
      const prioritizedLeads = this.icpAgent.prioritizeLeads(scoredLeads);
      console.log(`✅ Prioritized ${prioritizedLeads.leads.length} leads\n`);

      // Step 6: Create outbound sequences
      console.log('📋 Step 5: Outbound Sequencer Agent');
      const sequences = [];
      for (const lead of prioritizedLeads.leads) {
        const sequence = await this.outboundAgent.createSequence(lead.id);
        sequences.push(sequence);
      }
      console.log(`✅ Created ${sequences.length} outbound sequences\n`);
      // Step 7: Send notifications
      console.log('📋 Step 6: Notifications Agent');
      if (prioritizedLeads.leads.length > 0) {
        await this.notificationsAgent.sendNotification({
          type: 'lead_enriched',
          title: 'New Qualified Lead',
          message: `${prioritizedLeads.leads[0].firstName} from ${prioritizedLeads.leads[0].company}`,
          leadId: prioritizedLeads.leads[0].id,
        });
      }
      console.log(`✅ Notifications sent to Slack\n`);

      // Step 8: Generate report
      console.log('📋 Step 7: Reporting Agent');
      const report = await this.reportingAgent.generateReport(prioritizedLeads.campaignId);
      console.log(`✅ Report generated: ${report.reportId}\n`);

      console.log('✅ SDR Workflow completed successfully!\n');
    } catch (error) {
      console.error('❌ Workflow error:', error);
      throw error;
    }
  }

  /**
   * Get all agents for external access
   */
  getAgents() {
    return {
      icp: this.icpAgent,
      leadSource: this.leadSourceAgent,
      enrichment: this.enrichmentAgent,
      outbound: this.outboundAgent,
      reply: this.replyAgent,
      phone: this.phoneAgent,
      meeting: this.meetingAgent,
      notifications: this.notificationsAgent,
      reporting: this.reportingAgent,
    };
  }
}

/**
 * Export all agents for individual use
 */
export {
  ICPStrategyAgent,
  LeadSourceAgent,
  EnrichmentAgent,
  OutboundSequencerAgent,
  ReplyClassifierAgent,
  GaiaPhoneAgent,
  MeetingBookerAgent,
  NotificationsAgent,
  ReportingAgent,
};
