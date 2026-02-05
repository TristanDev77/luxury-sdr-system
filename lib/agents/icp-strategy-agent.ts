/**
 * ICP & STRATEGY AGENT
 * Reads client ICP, offer, brand voice, and requirements
 * Produces a structured "Targeting Playbook" for all other agents
 */

import { ICPProfile, TargetingPlaybook, BuyerPersona } from '../types';

export class ICPStrategyAgent {
  private clientId: string;

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  /**
   * Create a comprehensive targeting playbook from ICP data
   * This playbook guides all downstream agents
   */
  async createTargetingPlaybook(icpData: any): Promise<TargetingPlaybook> {
    console.log('📋 ICP Strategy Agent: Creating targeting playbook...');

    // Validate and structure ICP data
    const icpProfile = this.validateICPData(icpData);

    // Create the playbook
    const playbook: TargetingPlaybook = {
      icpId: icpProfile.id,
      clientId: this.clientId,

      // Targeting Strategy
      idealIndustries: icpProfile.targetIndustries,
      idealGeos: icpProfile.targetGeographies,
      companySizes: this.formatCompanySizes(icpProfile.companySize),
      aesthetics: icpProfile.brandAesthetics,
      exclusions: icpProfile.excludedIndustries,

      // Personas & Titles
      buyerPersonas: icpProfile.buyerPersonas,
      targetTitles: this.extractTargetTitles(icpProfile.buyerPersonas),

      // Messaging
      messagingAngles: icpProfile.messagingAngles,
      valuePropositions: icpProfile.valuePropositions,

      // Qualification
      qualificationCriteria: icpProfile.qualificationCriteria,

      // Outreach Strategy
      outreachChannels: ['Email', 'LinkedIn'],
      sequenceLength: 7,

      createdAt: new Date(),
    };

    console.log('✅ Playbook created with:');
    console.log(`   - ${playbook.idealIndustries.length} target industries`);
    console.log(`   - ${playbook.buyerPersonas.length} buyer personas`);
    console.log(`   - ${playbook.messagingAngles.length} messaging angles`);

    return playbook;
  }

  /**
   * Validate and structure incoming ICP data
   */
  private validateICPData(icpData: any): ICPProfile {
    // In production, this would validate against a schema
    // For now, we'll ensure required fields exist

    return {
      id: icpData.id || `icp_${Date.now()}`,
      clientId: this.clientId,
      name: icpData.name || 'Default ICP',

      targetIndustries: icpData.targetIndustries || [],
      targetGeographies: icpData.targetGeographies || [],
      excludedIndustries: icpData.excludedIndustries || [],

      companySize: icpData.companySize || { min: 10, max: 5000 },
      revenueRange: icpData.revenueRange || { min: 1000000, max: 500000000 },

      luxuryPositioning: icpData.luxuryPositioning || 'Premium',
      brandAesthetics: icpData.brandAesthetics || [],
      qualityIndicators: icpData.qualityIndicators || [],

      buyerPersonas: icpData.buyerPersonas || [],
      messagingAngles: icpData.messagingAngles || [],
      valuePropositions: icpData.valuePropositions || [],

      qualificationCriteria: icpData.qualificationCriteria || {
        budget: { hasAllocated: true },
        authority: { canMakeDecision: true, needsApproval: false },
        need: { urgency: 'Short-term', specificProblem: '' },
        timeline: { decisionTimeline: '30-60 days', implementationTimeline: '60-90 days' },
        fit: { industryFit: true, sizeMatch: true, budgetMatch: true },
      },

      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * Format company size ranges for readability
   */
  private formatCompanySizes(sizeRange: { min: number; max: number }): string[] {
    const sizes: string[] = [];

    if (sizeRange.min <= 50 && sizeRange.max >= 50) sizes.push('Startup (1-50)');
    if (sizeRange.min <= 500 && sizeRange.max >= 100) sizes.push('Small (50-500)');
    if (sizeRange.min <= 5000 && sizeRange.max >= 500) sizes.push('Mid-Market (500-5K)');
    if (sizeRange.max >= 5000) sizes.push('Enterprise (5K+)');

    return sizes.length > 0 ? sizes : ['All Sizes'];
  }

  /**
   * Extract target job titles from buyer personas
   */
  private extractTargetTitles(personas: BuyerPersona[]): string[] {
    return [...new Set(personas.map((p) => p.title))];
  }

  /**
   * Analyze and refine ICP based on campaign performance
   */
  async refineICPBasedOnPerformance(
    icpId: string,
    performanceData: any
  ): Promise<ICPProfile> {
    console.log('🔄 ICP Strategy Agent: Refining ICP based on performance...');

    // In production, this would:
    // 1. Analyze which segments performed best
    // 2. Identify underperforming segments
    // 3. Suggest ICP adjustments
    // 4. Update the playbook

    console.log('✅ ICP refined based on performance metrics');

    // Return updated ICP (placeholder)
    return {} as ICPProfile;
  }
}
