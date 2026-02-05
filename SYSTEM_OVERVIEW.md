# 🚀 Luxury SDR System - Multi-Agent Sales Development Workflow

## Project Overview

A comprehensive, production-ready multi-agent SDR (Sales Development Representative) system built with Next.js, TypeScript, and a modular agent architecture. The system orchestrates 9 specialized AI agents to automate the entire sales development workflow from lead sourcing to meeting booking.

**Live Dashboard**: https://luxury-sdr.lindy.site

## System Architecture

### 9 Specialized Agents

The system is built on a modular agent-based architecture where each agent has a specific domain responsibility:

#### 1. **ICP Strategy Agent** 📋
- **Purpose**: Define Ideal Customer Profile and create targeting playbooks
- **Responsibilities**:
  - Analyze target market characteristics
  - Define buyer personas with detailed attributes
  - Create targeting playbooks with messaging strategies
  - Identify key decision-makers and pain points
- **Output**: Comprehensive targeting playbook with personas and messaging

#### 2. **Lead Source Agent** 🔍
- **Purpose**: Source qualified leads from multiple channels
- **Integrations**: Instantly API for email/lead discovery
- **Responsibilities**:
  - Query lead databases based on ICP criteria
  - Validate lead quality and fit
  - Enrich basic lead information
  - Build prioritized lead lists
- **Output**: Raw lead pool with contact information and basic enrichment

#### 3. **Enrichment Agent** 💎
- **Purpose**: Enrich leads with luxury positioning analysis and scoring
- **Responsibilities**:
  - Analyze company financials and growth metrics
  - Score leads based on ICP fit (0-100 scale)
  - Identify luxury positioning opportunities
  - Segment leads into tiers (Tier 1-4)
  - Extract key decision-maker information
- **Output**: Enriched leads with ICP scores and positioning analysis

#### 4. **Outbound Sequencer Agent** 📧
- **Purpose**: Build and manage multi-step personalized email sequences
- **Integrations**: Instantly for email delivery
- **Responsibilities**:
  - Create personalized email sequences (3-5 steps)
  - Customize messaging based on lead tier and persona
  - Schedule email timing and cadence
  - Track email metrics (opens, clicks, replies)
  - Handle follow-up responses and objections
- **Output**: Launched campaigns with email sequences and tracking

#### 5. **Reply Classifier Agent** 📬
- **Purpose**: Analyze inbound replies and classify intent
- **Responsibilities**:
  - Monitor for new email replies
  - Classify intent (Positive, Neutral/Questions, Objection, Negative)
  - Extract key information from replies
  - Route to appropriate next step
  - Suggest response templates
- **Output**: Classified replies with intent and routing decisions

#### 6. **Gaia Phone Qualifier Agent** 📞
- **Purpose**: Manage AI-driven phone qualification calls
- **Integrations**: Gaia API for voice calls
- **Responsibilities**:
  - Initiate AI-powered qualification calls
  - Conduct natural conversation to assess fit
  - Identify booking intent and availability
  - Confirm meeting details on call
  - Handle objections and questions
- **Output**: Call results with qualification status and booking requests

#### 7. **Meeting Booker Agent** 📅
- **Purpose**: Handle calendar logic and CRM synchronization
- **Integrations**: Close CRM for meeting management
- **Responsibilities**:
  - Check calendar availability
  - Propose meeting times
  - Send calendar invites
  - Sync meetings to Close CRM
  - Handle rescheduling requests
- **Output**: Confirmed meetings synced to CRM

#### 8. **Notifications Agent** 📢
- **Purpose**: Manage alerts and escalations
- **Integrations**: Slack for team notifications
- **Responsibilities**:
  - Send Slack alerts for key events
  - Escalate high-priority leads
  - Notify team of meetings booked
  - Alert on campaign milestones
  - Track system health and errors
- **Output**: Real-time Slack notifications and alerts

#### 9. **Reporting Agent** 📊
- **Purpose**: Aggregate metrics and generate insights
- **Responsibilities**:
  - Track campaign performance metrics
  - Calculate conversion rates at each stage
  - Generate insight reports
  - Identify trends and optimization opportunities
  - Provide ROI analysis
- **Output**: Comprehensive campaign reports and insights

## Workflow Flow

### Complete End-to-End Process

```
1. ICP Strategy Agent
   ↓ Creates targeting playbook with buyer personas
   
2. Lead Source Agent
   ↓ Sources leads from Instantly based on ICP
   
3. Enrichment Agent
   ↓ Enriches leads and scores them (0-100)
   
4. Outbound Sequencer Agent
   ↓ Launches personalized email sequences
   
5. Reply Classifier Agent (Continuous)
   ↓ Monitors for replies and classifies intent
   
6. Gaia Phone Qualifier Agent (On Positive Intent)
   ↓ Initiates AI phone qualification calls
   
7. Meeting Booker Agent (On Booking Request)
   ↓ Books meetings and syncs to Close CRM
   
8. Notifications Agent (Throughout)
   ↓ Sends Slack alerts at key milestones
   
9. Reporting Agent (Continuous)
   ↓ Generates reports and insights
```

### Key Integrations

- **Instantly**: Email delivery and lead sourcing
- **Gaia**: AI-powered phone qualification calls
- **Close CRM**: Meeting management and CRM synchronization
- **Slack**: Team notifications and alerts

## Dashboard Features

### Real-Time Metrics
- **Total Leads**: 150 leads in current campaign
- **Leads Outreached**: 140 leads with emails sent
- **Positive Replies**: 12 leads with positive intent
- **Meetings Booked**: 8 confirmed meetings

### Campaign Performance
- **Email Open Rate**: 40%
- **Click Rate**: 20%
- **Reply Rate**: 15%
- **Qualification Rate**: 83%
- **Meeting Booking Rate**: 67%

### Visualization Tabs
1. **Overview**: Email and qualification metrics
2. **Performance**: Campaign performance over time (line chart)
3. **Segments**: Lead segmentation by ICP score (pie chart)
4. **Activity**: Recent activity feed with timestamps

### Agent Status
All 9 agents display real-time status (Ready/Running/Error) with visual indicators.

## Technical Stack

### Frontend
- **Framework**: Next.js 15.5.6 (App Router)
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Charts**: Recharts for data visualization
- **State Management**: React hooks (useState)

### Backend
- **API Routes**: Next.js API routes (app/api)
- **Orchestration**: SDROrchestrator class
- **Agent Architecture**: Modular class-based agents

### Project Structure

```
luxury-sdr-system/
├── app/
│   ├── api/
│   │   └── workflow/
│   │       └── route.ts          # Workflow API endpoints
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Dashboard home page
│   └── globals.css               # Global styles
├── lib/
│   ├── agents/
│   │   ├── index.ts              # SDROrchestrator
│   │   ├── icp-strategy-agent.ts
│   │   ├── lead-source-agent.ts
│   │   ├── enrichment-agent.ts
│   │   ├── outbound-sequencer-agent.ts
│   │   ├── reply-classifier-agent.ts
│   │   ├── gaia-phone-qualifier-agent.ts
│   │   ├── meeting-booker-agent.ts
│   │   ├── notifications-agent.ts
│   │   └── reporting-agent.ts
│   └── types.ts                  # TypeScript interfaces
├── components/
│   └── ui/                       # shadcn/ui components
├── public/
│   └── images/                   # Static assets
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## API Endpoints

### POST /api/workflow
**Start a new SDR workflow**

Request:
```json
{
  "clientId": "client_demo_001",
  "icpData": {
    "industry": "SaaS",
    "companySize": "100-5000",
    "revenue": "1M-500M",
    "painPoints": ["Sales Efficiency", "Revenue Growth"]
  }
}
```

Response (202 Accepted):
```json
{
  "success": true,
  "message": "Workflow initiated successfully",
  "clientId": "client_demo_001",
  "workflowId": "workflow_1707000000000"
}
```

### GET /api/workflow?workflowId=workflow_xxx
**Get workflow status**

Response:
```json
{
  "workflowId": "workflow_1707000000000",
  "status": "running",
  "progress": 45,
  "currentStep": "Enrichment & Scoring",
  "message": "Processing 150 leads..."
}
```

## Key Features

### 1. **Modular Agent Architecture**
- Each agent is a self-contained class with specific responsibilities
- Agents communicate through the SDROrchestrator
- Easy to extend or modify individual agents
- Clear separation of concerns

### 2. **Comprehensive Workflow Orchestration**
- Sequential steps for initial setup (ICP → Sourcing → Enrichment → Outbound)
- Continuous monitoring for replies and qualification
- Asynchronous processing for scalability
- Error handling and retry logic

### 3. **Real-Time Dashboard**
- Live metrics and KPIs
- Campaign performance visualization
- Lead segmentation analysis
- Recent activity feed
- Agent status monitoring

### 4. **Multi-Channel Integration**
- Email outreach via Instantly
- AI phone qualification via Gaia
- CRM synchronization via Close
- Team notifications via Slack

### 5. **Intelligent Lead Scoring**
- ICP-based scoring (0-100 scale)
- Tier segmentation (Tier 1-4)
- Luxury positioning analysis
- Dynamic routing based on score

### 6. **Personalized Sequences**
- Multi-step email sequences (3-5 steps)
- Tier-based customization
- Persona-specific messaging
- Automatic follow-ups and objection handling

## Running the System

### Start Development Server
```bash
cd /home/code/luxury-sdr-system
npm run dev
```

Server runs on `http://localhost:3001`

### Access Dashboard
Navigate to: https://luxury-sdr.lindy.site

### Trigger Workflow
Click "▶️ Start Workflow" button on dashboard to initiate the complete SDR workflow.

## Workflow Execution Details

### Step-by-Step Process

**Step 1: ICP & Strategy** (Immediate)
- Creates targeting playbook with buyer personas
- Defines messaging strategies
- Identifies key decision-makers
- Slack notification: "ICP Playbook Created"

**Step 2: Lead Sourcing** (Immediate)
- Queries Instantly for leads matching ICP
- Validates lead quality
- Builds lead pool
- Slack notification: "Leads Sourced"

**Step 3: Enrichment & Scoring** (Immediate)
- Enriches leads with company data
- Scores leads 0-100 based on ICP fit
- Segments into tiers
- Slack notification: "Leads Enriched"

**Step 4: Outbound Sequencing** (Immediate)
- Creates personalized email sequences
- Launches campaign
- Tracks email metrics
- Slack notification: "Campaign Launched"

**Steps 5-9: Continuous Monitoring** (Every 5 minutes)
- Monitors for new replies
- Classifies intent (Positive/Neutral/Objection/Negative)
- Routes based on intent:
  - **Positive Intent**: Trigger Gaia phone call
  - **Neutral/Questions**: Send follow-up response
  - **Objection**: Handle objection with response
  - **Negative**: Close loop
- On booking request: Book meeting and sync to CRM
- Sends Slack notifications for key events
- Generates reports and insights

## Metrics & KPIs

### Campaign Metrics
- **Total Leads**: Number of leads in campaign
- **Leads Enriched**: Leads with enrichment data
- **Leads Outreached**: Leads with emails sent
- **Emails Sent**: Total emails in campaign
- **Email Opens**: Emails opened by recipients
- **Email Clicks**: Links clicked in emails
- **Email Replies**: Replies received
- **Positive Replies**: Replies with positive intent
- **Gaia Calls**: AI phone calls initiated
- **Meetings Booked**: Confirmed meetings

### Conversion Rates
- **Open Rate**: Emails Opened / Emails Sent
- **Click Rate**: Emails Clicked / Emails Sent
- **Reply Rate**: Emails Replied / Emails Sent
- **Qualification Rate**: Qualified Leads / Gaia Calls
- **Meeting Booking Rate**: Meetings Booked / Qualified Leads

## Customization & Extension

### Adding New Agents
1. Create new agent class in `lib/agents/`
2. Implement required methods
3. Add to SDROrchestrator
4. Update workflow logic

### Modifying Workflow
Edit `SDROrchestrator.executeFullWorkflow()` in `lib/agents/index.ts`

### Updating Dashboard
Edit `app/page.tsx` to add new metrics, charts, or sections

### Adding API Endpoints
Create new route files in `app/api/` following Next.js conventions

## Future Enhancements

- [ ] Database persistence (Postgres + Prisma)
- [ ] User authentication and multi-tenant support
- [ ] Advanced analytics and reporting
- [ ] A/B testing for email sequences
- [ ] Custom workflow builder UI
- [ ] Integration with more CRM platforms
- [ ] Advanced lead scoring models
- [ ] Predictive analytics
- [ ] Team collaboration features
- [ ] Audit logs and compliance tracking

## Deployment

### Vercel Deployment
```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys on push
# Set environment variables in Vercel dashboard
```

### Environment Variables
Create `.env.local`:
```bash
# API Keys
INSTANTLY_API_KEY=your_key
GAIA_API_KEY=your_key
CLOSE_API_KEY=your_key
SLACK_WEBHOOK_URL=your_webhook

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Support & Documentation

- **Agent Documentation**: See individual agent files in `lib/agents/`
- **API Documentation**: See `app/api/workflow/route.ts`
- **Dashboard Code**: See `app/page.tsx`
- **Type Definitions**: See `lib/types.ts`

## License

Proprietary - All rights reserved

---

**Built with ❤️ for luxury B2B sales teams**
