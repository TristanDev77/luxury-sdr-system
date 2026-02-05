/**
 * ENRICHMENT & SCORING AGENT
 * Enriches leads using available APIs (Instantly, Clearbit, PDL, etc.)
 * Evaluates luxury positioning and scores leads 0-100
 */

import { RawLeadPool, EnrichedLead, PrioritizedLeadList } from '../types';

export class EnrichmentAgent {
  private clientId: string;

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  /**
   * Enrich and score all leads in the pool
   */
  async enrichAndScore(leadPool: RawLeadPool): Promise<PrioritizedLeadList> {
    console.log('💎 Enrichment Agent: Enriching and scoring leads...');

    const enrichedLeads: EnrichedLead[] = [];

    for (const rawLead of leadPool.leads) {
      try {
        const enriched = await this.enrichLead(rawLead);
        const scored = this.scoreLead(enriched);
        enrichedLeads.push(scored);
      } catch (error) {
        console.error(`Error enriching lead ${rawLead.id}:`, error);
      }
    }

    // Segment by score
    const segments = this.segmentByScore(enrichedLeads);

    const prioritizedList: PrioritizedLeadList = {
      id: `list_${Date.now()}`,
      clientId: this.clientId,
      campaignId: leadPool.campaignId,
      leads: enrichedLeads.sort((a, b) => b.icpAlignmentScore - a.icpAlignmentScore),
      totalCount: enrichedLeads.length,
      segments: segments,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log(`✅ Enriched ${enrichedLeads.length} leads`);
    console.log(`   - Tier 1 (80-100): ${segments.tier1.length}`);
    console.log(`   - Tier 2 (60-79): ${segments.tier2.length}`);
    console.log(`   - Tier 3 (40-59): ${segments.tier3.length}`);
    console.log(`   - Tier 4 (0-39): ${segments.tier4.length}`);

    return prioritizedList;
  }

  /**
   * Enrich a single lead with company metadata and social signals
   */
  private async enrichLead(rawLead: any): Promise<EnrichedLead> {
    // Simulate API calls to Clearbit, PDL, etc.
    const companyMetadata = await this.fetchCompanyMetadata(rawLead.company);
    const socialSignals = await this.fetchSocialSignals(rawLead);
    const luxuryAnalysis = await this.analyzeLuxuryPositioning(rawLead.company);

    return {
      ...rawLead,
      companyMetadata,
      socialSignals,
      luxuryAnalysis,
      icpAlignmentScore: 0, // Will be calculated in scoreLead
      enrichmentStatus: 'Complete',
      enrichedAt: new Date(),
    } as EnrichedLead;
  }

  /**
   * Fetch company metadata from enrichment APIs
   */
  private async fetchCompanyMetadata(company: string): Promise<any> {
    // Simulated Clearbit/PDL API response
    return {
      revenue: Math.floor(Math.random() * 500000000) + 1000000,
      employees: Math.floor(Math.random() * 5000) + 10,
      founded: Math.floor(Math.random() * 30) + 1990,
      category: 'Technology',
      description: `${company} is a leading provider of premium solutions`,
      logo: `https://logo.clearbit.com/${company.toLowerCase().replace(/\s+/g, '')}.com/logo`,
      headquarters: 'San Francisco, CA',
    };
  }

  /**
   * Fetch social signals for the lead
   */
  private async fetchSocialSignals(lead: any): Promise<any> {
    return {
      linkedinFollowers: Math.floor(Math.random() * 100000),
      twitterFollowers: Math.floor(Math.random() * 50000),
      recentActivity: [
        'Posted about industry trends',
        'Engaged with thought leadership content',
        'Shared company updates',
      ],
    };
  }

  /**
   * Analyze luxury positioning of the company
   */
  private async analyzeLuxuryPositioning(company: string): Promise<any> {
    // Simulate analysis of brand quality, awards, press mentions
    return {
      brandQuality: Math.floor(Math.random() * 100),
      visualsQuality: Math.floor(Math.random() * 100),
      awards: ['Industry Excellence Award', 'Best in Class'],
      pressmentions: ['Featured in Forbes', 'TechCrunch Coverage'],
      luxuryScore: Math.floor(Math.random() * 100),
    };
  }

  /**
   * Score a lead based on ICP alignment
   */
  private scoreLead(enriched: EnrichedLead): EnrichedLead {
    let score = 0;

    // Company size match (0-20 points)
    if (enriched.companyMetadata.employees >= 100 && enriched.companyMetadata.employees <= 5000) {
      score += 20;
    } else if (enriched.companyMetadata.employees > 50) {
      score += 15;
    }

    // Revenue match (0-20 points)
    if (
      enriched.companyMetadata.revenue >= 1000000 &&
      enriched.companyMetadata.revenue <= 500000000
    ) {
      score += 20;
    }

    // Luxury positioning (0-30 points)
    score += Math.floor((enriched.luxuryAnalysis.luxuryScore / 100) * 30);

    // Social signals (0-15 points)
    if (enriched.socialSignals.linkedinFollowers > 10000) {
      score += 15;
    } else if (enriched.socialSignals.linkedinFollowers > 1000) {
      score += 10;
    }

    // Awards and press (0-15 points)
    score += enriched.luxuryAnalysis.awards.length * 5;
    score += enriched.luxuryAnalysis.pressmentions.length * 5;

    enriched.icpAlignmentScore = Math.min(score, 100);
    return enriched;
  }

  /**
   * Segment leads by score into tiers
   */
  private segmentByScore(leads: EnrichedLead[]): any {
    return {
      tier1: leads.filter((l) => l.icpAlignmentScore >= 80),
      tier2: leads.filter((l) => l.icpAlignmentScore >= 60 && l.icpAlignmentScore < 80),
      tier3: leads.filter((l) => l.icpAlignmentScore >= 40 && l.icpAlignmentScore < 60),
      tier4: leads.filter((l) => l.icpAlignmentScore < 40),
    };
  }
}
