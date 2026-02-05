/**
 * Core TypeScript types for the multi-agent SDR system
 * Defines data structures for all agents and workflows
 */

// ============================================================
// ICP & STRATEGY AGENT TYPES
// ============================================================

export interface ICPProfile {
  id: string;
  clientId: string;
  name: string;
  
  // Industry & Geography
  targetIndustries: string[];
  targetGeographies: string[];
  excludedIndustries: string[];
  
  // Company Characteristics
  companySize: {
    min: number;
    max: number;
  };
  revenueRange: {
    min: number;
    max: number;
  };
  
  // Brand & Aesthetics
  luxuryPositioning: string;
  brandAesthetics: string[];
  qualityIndicators: string[];
  
  // Buyer Personas
  buyerPersonas: BuyerPersona[];
  
  // Messaging & Value Props
  messagingAngles: string[];
  valuePropositions: string[];
  
  // Qualification Criteria
  qualificationCriteria: QualificationCriteria;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface BuyerPersona {
  title: string;
  department: string;
  seniority: 'C-Level' | 'VP' | 'Director' | 'Manager' | 'Individual Contributor';
  painPoints: string[];
  motivations: string[];
  decisionMakingRole: 'Decision Maker' | 'Influencer' | 'Evaluator';
}

export interface QualificationCriteria {
  budget: {
    hasAllocated: boolean;
    minAmount?: number;
  };
  authority: {
    canMakeDecision: boolean;
    needsApproval: boolean;
  };
  need: {
    urgency: 'Immediate' | 'Short-term' | 'Long-term' | 'Exploratory';
    specificProblem: string;
  };
  timeline: {
    decisionTimeline: string;
    implementationTimeline: string;
  };
  fit: {
    industryFit: boolean;
    sizeMatch: boolean;
    budgetMatch: boolean;
  };
}

export interface TargetingPlaybook {
  icpId: string;
  clientId: string;
  
  // Targeting Strategy
  idealIndustries: string[];
  idealGeos: string[];
  companySizes: string[];
  aesthetics: string[];
  exclusions: string[];
  
  // Personas & Titles
  buyerPersonas: BuyerPersona[];
  targetTitles: string[];
  
  // Messaging
  messagingAngles: string[];
  valuePropositions: string[];
  
  // Qualification
  qualificationCriteria: QualificationCriteria;
  
  // Outreach Strategy
  outreachChannels: ('Email' | 'LinkedIn' | 'SMS' | 'WhatsApp')[];
  sequenceLength: number;
  
  createdAt: Date;
}

// ============================================================
// LEAD SOURCE & LIST BUILDER AGENT TYPES
// ============================================================

export interface RawLead {
  id: string;
  clientId: string;
  
  // Contact Information
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  title: string;
  
  // Company Information
  company: string;
  companyWebsite?: string;
  industry?: string;
  companySize?: string;
  
  // Social & Web
  linkedinUrl?: string;
  twitterUrl?: string;
  
  // Source
  source: 'Instantly' | 'Manual' | 'Web Research' | 'LinkedIn';
  sourceId?: string;
  
  // Status
  status: 'New' | 'Enriching' | 'Enriched' | 'Scoring' | 'Scored';
  
  createdAt: Date;
  updatedAt: Date;
}

export interface RawLeadPool {
  id: string;
  clientId: string;
  campaignId: string;
  
  leads: RawLead[];
  totalCount: number;
  
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// ENRICHMENT & SCORING AGENT TYPES
// ============================================================

export interface EnrichedLead extends RawLead {
  // Company Enrichment
  companyMetadata: {
    revenue?: number;
    employees?: number;
    founded?: number;
    category?: string;
    description?: string;
    logo?: string;
    headquarters?: string;
  };
  
  // Luxury Positioning Analysis
  luxuryAnalysis: {
    brandQuality: number; // 0-100
    visualsQuality: number; // 0-100
    awards: string[];
    pressmentions: string[];
    luxuryScore: number; // 0-100
  };
  
  // Social Signals
  socialSignals: {
    linkedinFollowers?: number;
    twitterFollowers?: number;
    recentActivity?: string[];
  };
  
  // ICP Alignment Score
  icpAlignmentScore: number; // 0-100
  
  // Enrichment Status
  enrichmentStatus: 'Pending' | 'In Progress' | 'Complete' | 'Failed';
  enrichmentErrors?: string[];
  
  enrichedAt?: Date;
}

export interface PrioritizedLeadList {
  id: string;
  clientId: string;
  campaignId: string;
  
  leads: EnrichedLead[];
  totalCount: number;
  
  // Segmentation
  segments: {
    tier1: EnrichedLead[]; // Score 80-100
    tier2: EnrichedLead[]; // Score 60-79
    tier3: EnrichedLead[]; // Score 40-59
    tier4: EnrichedLead[]; // Score 0-39
  };
  
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// OUTBOUND SEQUENCER & COPY AGENT TYPES
// ============================================================

export interface EmailSequenceStep {
  stepNumber: number;
  subject: string;
  body: string;
  delayDays: number;
  personalizationTokens: string[];
}

export interface LinkedInSequenceStep {
  stepNumber: number;
  connectionNote?: string;
  followUpMessage?: string;
  delayDays: number;
  personalizationTokens: string[];
}

export interface OutboundSequence {
  id: string;
  clientId: string;
  campaignId: string;
  
  // Sequence Configuration
  name: string;
  description?: string;
  
  // Channels
  emailSequence: EmailSequenceStep[];
  linkedinSequence?: LinkedInSequenceStep[];
  smsSequence?: {
    stepNumber: number;
    message: string;
    delayDays: number;
  }[];
  
  // Personalization
  personalizationRules: {
    useCompanyName: boolean;
    useFirstName: boolean;
    useRecentNews: boolean;
    useSocialMentions: boolean;
  };
  
  // Status
  status: 'Draft' | 'Active' | 'Paused' | 'Completed';
  
  createdAt: Date;
  updatedAt: Date;
}

export interface CampaignExecution {
  id: string;
  clientId: string;
  sequenceId: string;
  
  // Campaign Details
  name: string;
  leads: EnrichedLead[];
  
  // Execution Status
  status: 'Scheduled' | 'Running' | 'Paused' | 'Completed';
  startDate: Date;
  endDate?: Date;
  
  // Metrics
  metrics: {
    totalSent: number;
    opened: number;
    clicked: number;
    replied: number;
    bounced: number;
  };
  
  // Instantly Integration
  instantlyId?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// REPLY & INTENT CLASSIFIER AGENT TYPES
// ============================================================

export type ReplyIntent = 
  | 'Positive Intent'
  | 'Neutral / Questions'
  | 'Objection'
  | 'Not Interested'
  | 'OOO / Bounce';

export interface InboundReply {
  id: string;
  clientId: string;
  campaignId: string;
  leadId: string;
  
  // Reply Details
  channel: 'Email' | 'LinkedIn' | 'SMS';
  message: string;
  senderEmail?: string;
  senderName?: string;
  
  // Classification
  intent: ReplyIntent;
  confidence: number; // 0-100
  reasoning: string;
  
  // Suggested Response
  suggestedResponse?: string;
  
  // Status
  status: 'New' | 'Classified' | 'Responded' | 'Escalated';
  
  receivedAt: Date;
  classifiedAt?: Date;
}

export interface ReplyClassificationResult {
  replyId: string;
  intent: ReplyIntent;
  confidence: number;
  reasoning: string;
  nextAction: 'Trigger Gaia Call' | 'Send Follow-up' | 'Handle Objection' | 'Close Loop' | 'Archive';
  suggestedResponse?: string;
}

// ============================================================
// GAIA PHONE QUALIFIER AGENT TYPES
// ============================================================

export interface PhoneQualificationCall {
  id: string;
  clientId: string;
  leadId: string;
  
  // Call Details
  prospectName: string;
  prospectPhone: string;
  prospectEmail: string;
  company: string;
  
  // Call Status
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Failed' | 'No Answer';
  
  // Qualification Results
  qualificationNotes?: string;
  budget?: {
    hasAllocated: boolean;
    amount?: number;
  };
  authority?: {
    canDecide: boolean;
    needsApproval: boolean;
  };
  need?: {
    urgency: string;
    specificProblem: string;
  };
  timeline?: {
    decisionTimeline: string;
    implementationTimeline: string;
  };
  
  // Interest Level
  interestLevel: 'High' | 'Medium' | 'Low' | 'Not Interested';
  
  // Booking Request (if interested)
  bookingRequest?: BookingRequest;
  
  // Call Recording
  recordingUrl?: string;
  transcript?: string;
  
  callStartTime?: Date;
  callEndTime?: Date;
  callDuration?: number; // seconds
}

export interface BookingRequest {
  prospectName: string;
  company: string;
  email: string;
  phone: string;
  qualification_notes: string;
  preferred_time_window: string;
  urgency: 'High' | 'Medium' | 'Low';
  context_of_interest: string;
}

// ============================================================
// MEETING BOOKER & CRM SYNC AGENT TYPES
// ============================================================

export interface BookingConfirmation {
  confirmed_time: string;
  calendar_link: string;
  crm_record_url: string;
  confirmationEmail?: string;
}

export interface Meeting {
  id: string;
  clientId: string;
  leadId: string;
  
  // Meeting Details
  prospectName: string;
  prospectEmail: string;
  prospectPhone: string;
  company: string;
  
  // Scheduling
  scheduledTime: Date;
  duration: number; // minutes
  timezone: string;
  
  // Meeting Type
  type: 'Discovery Call' | 'Demo' | 'Consultation' | 'Follow-up';
  
  // CRM Integration
  crmRecordId?: string;
  crmOpportunityId?: string;
  
  // Status
  status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled' | 'No-show';
  
  // Meeting Notes
  notes?: string;
  outcome?: string;
  nextSteps?: string;
  
  // Calendar
  calendarEventId?: string;
  calendarLink?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface CRMSyncData {
  leadId: string;
  prospectName: string;
  email: string;
  phone: string;
  company: string;
  
  // Enrichment Data
  enrichmentData: {
    companyRevenue?: number;
    companySize?: number;
    industry?: string;
    website?: string;
  };
  
  // Interaction History
  emailThreadSummary?: string;
  callSummary?: string;
  callTranscript?: string;
  
  // Opportunity
  opportunity: {
    name: string;
    value?: number;
    stage: string;
    expectedCloseDate?: Date;
  };
  
  // Pipeline Stage
  pipelineStage: 'Lead' | 'Qualified' | 'Opportunity' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
}

// ============================================================
// NOTIFICATIONS & ESCALATION AGENT TYPES
// ============================================================

export type NotificationEvent = 
  | 'Positive Reply'
  | 'Gaia Call Completed'
  | 'Meeting Booked'
  | 'High-Value Lead'
  | 'System Error'
  | 'Campaign Milestone';

export interface SlackNotification {
  id: string;
  clientId: string;
  
  // Notification Details
  event: NotificationEvent;
  title: string;
  message: string;
  
  // Context
  leadId?: string;
  campaignId?: string;
  meetingId?: string;
  
  // Slack Details
  channel: string;
  timestamp?: string;
  
  // Status
  sent: boolean;
  sentAt?: Date;
  
  createdAt: Date;
}

// ============================================================
// REPORTING & INSIGHTS AGENT TYPES
// ============================================================

export interface CampaignMetrics {
  campaignId: string;
  clientId: string;
  
  // Volume Metrics
  totalLeads: number;
  leadsEnriched: number;
  leadsOutreached: number;
  
  // Email Metrics
  emailsSent: number;
  emailsOpened: number;
  emailsClicked: number;
  emailsReplied: number;
  emailsBounced: number;
  
  // Engagement Metrics
  openRate: number; // percentage
  clickRate: number; // percentage
  replyRate: number; // percentage
  
  // Intent Metrics
  positiveReplies: number;
  neutralReplies: number;
  objections: number;
  notInterested: number;
  
  // Qualification Metrics
  gaiaCalls: number;
  qualifiedLeads: number;
  qualificationRate: number; // percentage
  
  // Meeting Metrics
  meetingsBooked: number;
  meetingsCompleted: number;
  meetingNoShows: number;
  
  // Performance
  timeToFirstMeeting: number; // days
  meetingToOpportunityRate: number; // percentage
  
  // Best Performers
  bestPerformingSegment: string;
  bestPerformingAngle: string;
  bestPerformingChannel: 'Email' | 'LinkedIn' | 'SMS';
  
  reportedAt: Date;
}

export interface InsightReport {
  id: string;
  clientId: string;
  
  // Report Details
  period: {
    startDate: Date;
    endDate: Date;
  };
  
  // Metrics
  metrics: CampaignMetrics;
  
  // Insights
  insights: {
    topPerformingICPSegments: string[];
    topPerformingMessagingAngles: string[];
    channelEffectiveness: Record<string, number>;
    improvementAreas: string[];
    recommendations: string[];
  };
  
  // Trends
  trends: {
    replyRateTrend: 'Up' | 'Down' | 'Stable';
    qualificationRateTrend: 'Up' | 'Down' | 'Stable';
    meetingBookingTrend: 'Up' | 'Down' | 'Stable';
  };
  
  createdAt: Date;
}

// ============================================================
// CLIENT & WORKSPACE TYPES
// ============================================================

export interface Client {
  id: string;
  name: string;
  email: string;
  
  // Configuration
  icpProfile: ICPProfile;
  
  // Integrations
  integrations: {
    instantly?: {
      apiKey: string;
      accountId: string;
    };
    closecrm?: {
      apiKey: string;
      workspaceId: string;
    };
    slack?: {
      webhookUrl: string;
      channel: string;
    };
    gaia?: {
      apiKey: string;
      phoneNumber: string;
    };
  };
  
  // Settings
  settings: {
    timezone: string;
    currency: string;
    language: string;
  };
  
  // Status
  status: 'Active' | 'Paused' | 'Inactive';
  
  createdAt: Date;
  updatedAt: Date;
}

export interface Campaign {
  id: string;
  clientId: string;
  
  // Campaign Details
  name: string;
  description?: string;
  
  // Configuration
  icpProfileId: string;
  sequenceId: string;
  
  // Status
  status: 'Planning' | 'Active' | 'Paused' | 'Completed' | 'Archived';
  
  // Dates
  startDate: Date;
  endDate?: Date;
  
  // Metrics
  metrics: CampaignMetrics;
  
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// WORKFLOW STATE TYPES
// ============================================================

export interface WorkflowState {
  id: string;
  clientId: string;
  
  // Current Stage
  stage: 'ICP Definition' | 'Lead Sourcing' | 'Enrichment' | 'Outbound' | 'Reply Handling' | 'Qualification' | 'Booking' | 'CRM Sync' | 'Reporting';
  
  // Data References
  icpId?: string;
  campaignId?: string;
  leadIds: string[];
  
  // Progress
  progress: number; // 0-100
  
  // Errors
  errors: string[];
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
