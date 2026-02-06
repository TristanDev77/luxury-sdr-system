/**
 * LEAD SOURCE AGENT
 * Identifies and validates lead sources
 * Manages lead pool from multiple channels
 */

import { RawLeadPool } from '../types';

interface LeadSourceConfig {
  name: string;
  type: 'api' | 'csv' | 'crm' | 'manual';
  priority: number;
}

export class LeadSourceAgent {
  private clientId: string;
  private sources: LeadSourceConfig[] = [];

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  /**
   * Register a lead source
   */
  registerSource(source: LeadSourceConfig): void {
    this.sources.push(source);
    console.log(`✅ Lead Source Registered: ${source.name}`);
  }

  /**
   * Fetch and validate leads from all sources
   */
  async fetchLeads(): Promise<RawLeadPool> {
    console.log('🔍 Lead Source Agent: Fetching leads from all sources...');

    const allLeads: RawLeadPool['leads'] = [];

    for (const source of this.sources) {
      try {
        const leads = await this.fetchFromSource(source);
        allLeads.push(...leads);
      } catch (error) {
        console.error(`Error fetching from ${source.name}:`, error);
      }
    }

    const leadPool: RawLeadPool = {
      id: `pool_${Date.now()}`,
      clientId: this.clientId,
      campaignId: `campaign_${Date.now()}`,
      leads: allLeads,
      totalCount: allLeads.length,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log(`✅ Fetched ${allLeads.length} leads from ${this.sources.length} sources`);
    return leadPool;
  }

  /**
   * Fetch leads from a specific source
   */
  private async fetchFromSource(source: LeadSourceConfig): Promise<RawLeadPool['leads']> {
    // Map source name to valid enum value
    const sourceMap: Record<string, 'LinkedIn' | 'Instantly' | 'Manual' | 'Web Research'> = {
      'LinkedIn': 'LinkedIn',
      'Instantly': 'Instantly',
      'Manual': 'Manual',
      'Web Research': 'Web Research',
    };
    
    const mappedSource = sourceMap[source.name] || 'Manual';

    // Simulated lead fetching from different sources
    const mockLeads: RawLeadPool['leads'] = [
      {
        id: `lead_${Date.now()}_1`,
        clientId: this.clientId,
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@company.com',
        company: 'Acme Corp',
        title: 'CTO',
        industry: 'Technology',
        source: mappedSource,
        status: 'New',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: `lead_${Date.now()}_2`,
        clientId: this.clientId,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@company.com',
        company: 'Tech Innovations',
        title: 'VP of Sales',
        industry: 'Technology',
        source: mappedSource,
        status: 'New',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return mockLeads;
  }

  /**
   * Validate lead data quality
   */
  validateLeads(leads: RawLeadPool['leads']): { valid: RawLeadPool['leads']; invalid: RawLeadPool['leads'] } {
    const valid: RawLeadPool['leads'] = [];
    const invalid: RawLeadPool['leads'] = [];

    for (const lead of leads) {
      if (this.isValidLead(lead)) {
        valid.push(lead);
      } else {
        invalid.push(lead);
      }
    }

    console.log(`✅ Validated ${leads.length} leads: ${valid.length} valid, ${invalid.length} invalid`);
    return { valid, invalid };
  }

  /**
   * Check if a lead has required fields
   */
  private isValidLead(lead: RawLeadPool['leads'][0]): boolean {
    return !!(
      lead.email &&
      lead.firstName &&
      lead.lastName &&
      lead.company &&
      lead.title
    );
  }
}
