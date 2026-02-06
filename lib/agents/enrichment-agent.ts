/**
 * ENRICHMENT & SCORING AGENT
 * Enriches leads using available APIs (Instantly, Clearbit, PDL, etc.)
 * Evaluates luxury positioning and scores leads 0-100
 */

import { RawLeadPool, EnrichedLead, PrioritizedLeadList } from '../types';

interface CompanyMetadata {
  revenue?: number;
  employees?: number;
  founded?: number;
  category?: string;
  description?: string;
  logo?: string;
  headquarters?: string;
}

interface SocialSignals {
  linkedinFollowers?: number;
  twitterFollowers?: number;
  recentActivity?: string[];
}

interface LuxuryAnalysis {
  brandQuality: number;
  visualsQuality: number;
  awards: string[];
  pressmentions: string[];
  luxuryScore: number;
}

interface LeadSegments {
  tier1: EnrichedLead[];
  tier2: EnrichedLead[];
  tier3: EnrichedLead[];
  tier4: EnrichedLead[];
}

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
      segments,
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
  private async enrichLead(rawLead: RawLeadPool['leads'][0]): Promise<EnrichedLead> {
    // Simulate API calls to Clearbit, PDL, etc.
    const companyMetadata = await this.fetchCompanyMetadata(rawLead.company);
    const socialSignals = await this.fetchSocialSignals();
    const luxuryAnalysis = await this.analyzeLuxuryPositioning(rawLead.company);

    const enrichedLead: EnrichedLead = {
      id: rawLead.id,
      clientId: rawLead.clientId,
      firstName: rawLead.firstName,
      lastName: rawLead.lastName,
      email: rawLead.email,
      phone: rawLead.phone,
      title: rawLead.title,
      company: rawLead.company,
      companyWebsite: rawLead.companyWebsite,
      industry: rawLead.industry,
      companySize: rawLead.companySize,
      linkedinUrl: rawLead.linkedinUrl,
      twitterUrl: rawLead.twitterUrl,
      source: rawLead.source,
      sourceId: rawLead.sourceId,
      status: 'Enriched',
      companyMetadata,
      socialSignals,
      luxuryAnalysis,
      icpAlignmentScore: 0,
      enrichmentStatus: 'Complete',
      createdAt: rawLead.createdAt,
      updatedAt: new Date(),
      enrichedAt: new Date(),
    };

    return enrichedLead;
  }

  /**
   * Score lead based on ICP alignment
   */
  private scoreLead(lead: EnrichedLead): EnrichedLead {
    // Calculate ICP alignment score (0-100)
    let score = 0;

    // Revenue scoring (max 30 points)
    if (lead.companyMetadata?.revenue && lead.companyMetadata.revenue > 100000000) {
      score += 30;
    } else if (lead.companyMetadata?.revenue && lead.companyMetadata.revenue > 50000000) {
      score += 20;
    } else if (lead.companyMetadata?.revenue && lead.companyMetadata.revenue > 10000000) {
      score += 10;
    }

    // Industry scoring (max 25 points)
    const luxuryIndustries = ['Technology', 'Finance', 'Luxury', 'Hospitality'];
    if (lead.industry && luxuryIndustries.includes(lead.industry)) {
      score += 25;
    }

    // Job title scoring (max 15 points)
    const executiveRoles = ['CEO', 'CTO', 'VP', 'Director', 'President'];
    if (executiveRoles.some((role) => lead.title.includes(role))) {
      score += 15;
    }

    // Social signals scoring (max 10 points)
    if (lead.socialSignals && lead.socialSignals.linkedinFollowers && lead.socialSignals.linkedinFollowers > 10000) {
      score += 10;
    }

    lead.icpAlignmentScore = Math.min(score, 100);
    return lead;
  }

  /**
   * Fetch company metadata from external APIs
   */
  private async fetchCompanyMetadata(company: string): Promise<CompanyMetadata> {
    // Simulate API call to Clearbit or similar
    await new Promise((resolve) => setTimeout(resolve, 100));

    return {
      revenue: Math.floor(Math.random() * 500000000),
      employees: Math.floor(Math.random() * 5000),
      founded: 2010 + Math.floor(Math.random() * 14),
      category: 'Technology',
      description: `${company} is a leading technology company`,
      logo: `https://logo.clearbit.com/${company.toLowerCase()}.com`,
      headquarters: 'San Francisco, CA',
    };
  }

  /**
   * Fetch social signals for lead
   */
  private async fetchSocialSignals(): Promise<SocialSignals> {
    // Simulate API call to LinkedIn or similar
    await new Promise((resolve) => setTimeout(resolve, 100));

    return {
      linkedinFollowers: Math.floor(Math.random() * 50000),
      twitterFollowers: Math.floor(Math.random() * 10000),
      recentActivity: ['Posted article', 'Shared update', 'Engaged with content'],
    };
  }

  /**
   * Analyze luxury positioning of company
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async analyzeLuxuryPositioning(company: string): Promise<LuxuryAnalysis> {
    // Simulate luxury analysis
    await new Promise((resolve) => setTimeout(resolve, 100));

    return {
      brandQuality: Math.floor(Math.random() * 100),
      visualsQuality: Math.floor(Math.random() * 100),
      awards: ['Industry Award 2024'],
      pressmentions: ['Featured in TechCrunch'],
      luxuryScore: Math.floor(Math.random() * 100),
    };
  }

  /**
   * Segment leads by ICP alignment score
   */
  private segmentByScore(leads: EnrichedLead[]): LeadSegments {
    const tier1 = leads.filter((l) => l.icpAlignmentScore >= 80);
    const tier2 = leads.filter((l) => l.icpAlignmentScore >= 60 && l.icpAlignmentScore < 80);
    const tier3 = leads.filter((l) => l.icpAlignmentScore >= 40 && l.icpAlignmentScore < 60);
    const tier4 = leads.filter((l) => l.icpAlignmentScore < 40);

    return { tier1, tier2, tier3, tier4 };
  }
}
