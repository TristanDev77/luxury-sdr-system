/**
 * ICP STRATEGY AGENT
 * Defines Ideal Customer Profile (ICP)
 * Scores and prioritizes leads based on ICP alignment
 */

import { EnrichedLead, PrioritizedLeadList } from '../types';

interface ICPProfile {
  name: string;
  targetIndustries: string[];
  targetGeographies: string[];
  minRevenue: number;
  maxRevenue: number;
  targetRoles: string[];
  companySize: string;
  growthRate: number;
}

interface ScoredLead extends EnrichedLead {
  icpAlignmentScore: number;
}

export class ICPStrategyAgent {
  private clientId: string;
  private icpProfile: ICPProfile;

  constructor(clientId: string) {
    this.clientId = clientId;
    this.icpProfile = this.defineDefaultICP();
  }

  /**
   * Define the Ideal Customer Profile
   */
  defineICP(): ICPProfile {
    console.log('📋 ICP Strategy Agent: Defining Ideal Customer Profile...');

    const icp: ICPProfile = {
      name: 'Enterprise Luxury Tech Buyer',
      targetIndustries: ['Technology', 'Finance', 'Luxury', 'Hospitality', 'Real Estate'],
      targetGeographies: ['North America', 'Europe', 'Asia-Pacific'],
      minRevenue: 50000000, // $50M+
      maxRevenue: 5000000000, // $5B
      targetRoles: ['CEO', 'CTO', 'VP of Sales', 'VP of Marketing', 'Director of Operations'],
      companySize: 'Enterprise',
      growthRate: 0.15, // 15% YoY growth
    };

    console.log(`✅ ICP Defined: ${icp.name}`);
    console.log(`   - Target Industries: ${icp.targetIndustries.join(', ')}`);
    console.log(`   - Target Geographies: ${icp.targetGeographies.join(', ')}`);
    console.log(`   - Revenue Range: $${icp.minRevenue / 1000000}M - $${icp.maxRevenue / 1000000000}B`);

    return icp;
  }

  /**
   * Define default ICP for initialization
   */
  private defineDefaultICP(): ICPProfile {
    return {
      name: 'Enterprise Luxury Tech Buyer',
      targetIndustries: ['Technology', 'Finance', 'Luxury', 'Hospitality'],
      targetGeographies: ['North America', 'Europe', 'Asia-Pacific'],
      minRevenue: 50000000,
      maxRevenue: 5000000000,
      targetRoles: ['CEO', 'CTO', 'VP of Sales', 'VP of Marketing'],
      companySize: 'Enterprise',
      growthRate: 0.15,
    };
  }

  /**
   * Score leads based on ICP alignment
   */
  scoreLeads(leads: EnrichedLead[]): ScoredLead[] {
    console.log('🎯 ICP Strategy Agent: Scoring leads against ICP...');

    const scoredLeads: ScoredLead[] = leads.map((lead) => {
      let score = 0;

      // Industry match (max 25 points)
      // Check if industry exists and is in target industries
      if (lead.industry && this.icpProfile.targetIndustries.includes(lead.industry)) {
        score += 25;
      }

      // Revenue match (max 30 points)
      if (
        lead.companyMetadata?.revenue &&
        lead.companyMetadata.revenue >= this.icpProfile.minRevenue &&
        lead.companyMetadata.revenue <= this.icpProfile.maxRevenue
      ) {
        score += 30;
      }

      // Job title match (max 20 points)
      if (this.icpProfile.targetRoles.some((role) => lead.title.includes(role))) {
        score += 20;
      }

      // Company size match (max 15 points)
      if (lead.companySize === 'Enterprise' || (lead.companyMetadata?.employees && lead.companyMetadata.employees > 1000)) {
        score += 15;
      }

      // Luxury positioning bonus (max 10 points)
      if (lead.luxuryAnalysis && lead.luxuryAnalysis.luxuryScore > 70) {
        score += 10;
      }

      return {
        ...lead,
        icpAlignmentScore: Math.min(score, 100),
      };
    });

    console.log(`✅ Scored ${scoredLeads.length} leads`);
    const avgScore = scoredLeads.reduce((sum, l) => sum + l.icpAlignmentScore, 0) / scoredLeads.length;
    console.log(`   - Average ICP Score: ${avgScore.toFixed(1)}`);

    return scoredLeads;
  }

  /**
   * Prioritize leads by ICP alignment score
   */
  prioritizeLeads(leads: EnrichedLead[]): PrioritizedLeadList {
    console.log('🏆 ICP Strategy Agent: Prioritizing leads...');

    // Score all leads
    const scoredLeads = this.scoreLeads(leads);

    // Sort by score descending
    const prioritized = scoredLeads.sort((a, b) => b.icpAlignmentScore - a.icpAlignmentScore);

    // Segment by score tiers
    const tier1 = prioritized.filter((l) => l.icpAlignmentScore >= 80);
    const tier2 = prioritized.filter((l) => l.icpAlignmentScore >= 60 && l.icpAlignmentScore < 80);
    const tier3 = prioritized.filter((l) => l.icpAlignmentScore >= 40 && l.icpAlignmentScore < 60);
    const tier4 = prioritized.filter((l) => l.icpAlignmentScore < 40);

    const prioritizedList: PrioritizedLeadList = {
      id: `priority_${Date.now()}`,
      clientId: this.clientId,
      campaignId: `campaign_${Date.now()}`,
      leads: prioritized,
      totalCount: prioritized.length,
      segments: {
        tier1,
        tier2,
        tier3,
        tier4,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log(`✅ Leads prioritized`);
    console.log(`   - Tier 1 (80-100): ${tier1.length}`);
    console.log(`   - Tier 2 (60-79): ${tier2.length}`);
    console.log(`   - Tier 3 (40-59): ${tier3.length}`);
    console.log(`   - Tier 4 (0-39): ${tier4.length}`);

    return prioritizedList;
  }

  /**
   * Get ICP profile
   */
  getICPProfile(): ICPProfile {
    return this.icpProfile;
  }

  /**
   * Update ICP profile
   */
  updateICPProfile(updates: Partial<ICPProfile>): void {
    console.log('📝 Updating ICP Profile...');
    this.icpProfile = { ...this.icpProfile, ...updates };
    console.log('✅ ICP Profile updated');
  }
}
