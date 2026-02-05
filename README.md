# 🚀 Luxury SDR System - Multi-Agent Sales Development Workflow

A production-ready, enterprise-grade multi-agent SDR (Sales Development Representative) system that automates the entire sales development workflow using 9 specialized AI agents.

**🔗 Live Dashboard**: [https://luxury-sdr.lindy.site](https://luxury-sdr.lindy.site)

## ✨ Key Features

### 🤖 9 Specialized AI Agents
- **ICP Strategy Agent**: Define ideal customer profiles and targeting playbooks
- **Lead Source Agent**: Source qualified leads from Instantly
- **Enrichment Agent**: Enrich leads with luxury positioning analysis and scoring
- **Outbound Sequencer Agent**: Build and launch personalized email sequences
- **Reply Classifier Agent**: Analyze inbound replies and classify intent
- **Gaia Phone Qualifier Agent**: AI-powered phone qualification calls
- **Meeting Booker Agent**: Calendar management and CRM synchronization
- **Notifications Agent**: Real-time Slack alerts and escalations
- **Reporting Agent**: Campaign metrics and insight generation

### 📊 Real-Time Dashboard
- Live campaign metrics and KPIs
- Performance visualization with charts
- Lead segmentation analysis
- Recent activity feed
- Agent status monitoring

### 🔗 Multi-Channel Integration
- **Instantly**: Email delivery and lead sourcing
- **Gaia**: AI-powered phone qualification
- **Close CRM**: Meeting management and synchronization
- **Slack**: Team notifications and alerts

### 🎯 Intelligent Lead Management
- ICP-based lead scoring (0-100 scale)
- Tier segmentation (Tier 1-4)
- Luxury positioning analysis
- Dynamic routing based on intent

## 🏗️ Architecture

### Workflow Flow

```
ICP Strategy Agent
    ↓ Creates targeting playbook
Lead Source Agent
    ↓ Sources leads from Instantly
Enrichment Agent
    ↓ Enriches and scores leads
Outbound Sequencer Agent
    ↓ Launches email sequences
Reply Classifier Agent (Continuous)
    ↓ Monitors replies and classifies intent
Gaia Phone Qualifier Agent (On Positive Intent)
    ↓ Initiates AI phone calls
Meeting Booker Agent (On Booking Request)
    ↓ Books meetings and syncs to CRM
Notifications Agent (Throughout)
    ↓ Sends Slack alerts
Reporting Agent (Continuous)
    ↓ Generates reports and insights
```

### Tech Stack

- **Frontend**: Next.js 15.5.6 (App Router), TypeScript, shadcn/ui, Tailwind CSS
- **Backend**: Next.js API Routes, Modular Agent Architecture
- **Visualization**: Recharts for data visualization
- **State Management**: React hooks
- **Styling**: Tailwind CSS with Radix Colors

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
```bash
cd /home/code/luxury-sdr-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open dashboard**
Navigate to `http://localhost:3001` (or the port shown in terminal)

### Environment Variables

Create `.env.local` with your API keys:

```bash
# Instantly API
INSTANTLY_API_KEY=your_instantly_api_key

# Gaia API
GAIA_API_KEY=your_gaia_api_key

# Close CRM API
CLOSE_API_KEY=your_close_api_key

# Slack Webhook
SLACK_WEBHOOK_URL=your_slack_webhook_url

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

## 📖 Usage

### Starting a Workflow

1. **Open Dashboard**: Navigate to https://luxury-sdr.lindy.site
2. **Click "▶️ Start Workflow"** button in Campaign Control section
3. **Monitor Progress**: Watch real-time metrics and activity feed

### API Endpoints

#### POST /api/workflow
Start a new SDR workflow

```bash
curl -X POST http://localhost:3001/api/workflow \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "client_001",
    "icpData": {
      "industry": "SaaS",
      "companySize": "100-5000",
      "revenue": "1M-500M",
      "painPoints": ["Sales Efficiency", "Revenue Growth"]
    }
  }'
```

Response (202 Accepted):
```json
{
  "success": true,
  "message": "Workflow initiated successfully",
  "clientId": "client_001",
  "workflowId": "workflow_1707000000000"
}
```

#### GET /api/workflow?workflowId=workflow_xxx
Get workflow status

```bash
curl http://localhost:3001/api/workflow?workflowId=workflow_1707000000000
```

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

## 📊 Dashboard Sections

### Overview Tab
- Email campaign metrics (opens, clicks, replies)
- Qualification metrics (Gaia calls, qualified leads, meetings booked)
- Conversion rates and performance indicators

### Performance Tab
- Line chart showing campaign performance over time
- Tracks opens, clicks, and replies across weeks
- Identifies trends and optimization opportunities

### Segments Tab
- Pie chart showing lead distribution by ICP score
- Tier 1 (80-100): Highest priority leads
- Tier 2 (60-79): High priority leads
- Tier 3 (40-59): Medium priority leads
- Tier 4 (0-39): Lower priority leads

### Activity Tab
- Real-time activity feed
- Recent events (meetings booked, positive replies, calls completed)
- Timestamps for each activity

## 🔧 Project Structure

```
luxury-sdr-system/
├── app/
│   ├── api/
│   │   └── workflow/
│   │       └── route.ts              # Workflow API endpoints
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Dashboard home page
│   └── globals.css                   # Global styles
├── lib/
│   ├── agents/
│   │   ├── index.ts                  # SDROrchestrator
│   │   ├── icp-strategy-agent.ts     # ICP & Strategy
│   │   ├── lead-source-agent.ts      # Lead Sourcing
│   │   ├── enrichment-agent.ts       # Lead Enrichment
│   │   ├── outbound-sequencer-agent.ts # Email Sequences
│   │   ├── reply-classifier-agent.ts # Reply Classification
│   │   ├── gaia-phone-qualifier-agent.ts # Phone Qualification
│   │   ├── meeting-booker-agent.ts   # Meeting Booking
│   │   ├── notifications-agent.ts    # Slack Notifications
│   │   └── reporting-agent.ts        # Reporting & Insights
│   └── types.ts                      # TypeScript interfaces
├── components/
│   └── ui/                           # shadcn/ui components
├── public/
│   └── images/                       # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🎯 Agent Details

### ICP Strategy Agent
Defines the Ideal Customer Profile and creates targeting playbooks.

**Key Methods**:
- `createTargetingPlaybook(icpData)`: Generate targeting strategy
- `defineBuyerPersonas()`: Create detailed buyer personas
- `identifyPainPoints()`: Extract key pain points

### Lead Source Agent
Sources qualified leads from Instantly based on ICP criteria.

**Key Methods**:
- `buildLeadList(playbook)`: Query and source leads
- `validateLeadQuality(leads)`: Validate lead fit
- `prioritizeLeads(leads)`: Rank leads by quality

### Enrichment Agent
Enriches leads with company data and luxury positioning analysis.

**Key Methods**:
- `enrichAndScore(leads)`: Enrich and score leads
- `analyzeCompanyData(company)`: Extract company metrics
- `identifyLuxuryOpportunities(lead)`: Find positioning angles

### Outbound Sequencer Agent
Builds and launches personalized email sequences.

**Key Methods**:
- `buildAndLaunchSequence(playbook, leads)`: Create and launch campaign
- `createPersonalizedSequence(lead)`: Generate personalized emails
- `trackEmailMetrics(campaignId)`: Monitor email performance

### Reply Classifier Agent
Analyzes inbound replies and classifies intent.

**Key Methods**:
- `checkForNewReplies(campaignId)`: Monitor for new replies
- `classifyReply(reply)`: Classify intent (Positive/Neutral/Objection/Negative)
- `extractKeyInfo(reply)`: Extract important information

### Gaia Phone Qualifier Agent
Manages AI-powered phone qualification calls.

**Key Methods**:
- `initiateQualificationCall(leadId)`: Start AI phone call
- `conductQualification(leadId)`: Run qualification conversation
- `confirmBookingOnCall(callId, booking)`: Confirm meeting on call

### Meeting Booker Agent
Handles calendar logic and CRM synchronization.

**Key Methods**:
- `bookMeeting(bookingRequest)`: Create calendar event
- `checkAvailability(timeSlot)`: Verify calendar availability
- `syncToCloseCRM(booking)`: Sync to Close CRM

### Notifications Agent
Manages Slack alerts and escalations.

**Key Methods**:
- `sendSlackNotification(event)`: Send Slack message
- `escalateHighPriority(lead)`: Escalate important leads
- `trackSystemHealth()`: Monitor system status

### Reporting Agent
Aggregates metrics and generates insights.

**Key Methods**:
- `generateInsightReport(campaignId)`: Create comprehensive report
- `calculateMetrics(campaign)`: Compute KPIs
- `identifyOptimizations(campaign)`: Suggest improvements

## 📈 Metrics & KPIs

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

## 🔄 Workflow Execution

### Immediate Steps (Sequential)
1. **ICP Strategy**: Create targeting playbook
2. **Lead Sourcing**: Source leads from Instantly
3. **Enrichment**: Enrich and score leads
4. **Outbound**: Launch email sequences

### Continuous Monitoring (Every 5 minutes)
5. **Reply Classification**: Monitor for replies
6. **Intent Routing**: Route based on intent
7. **Phone Qualification**: Initiate Gaia calls on positive intent
8. **Meeting Booking**: Book meetings and sync to CRM
9. **Notifications**: Send Slack alerts
10. **Reporting**: Generate reports and insights

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**
```bash
git push origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Set environment variables in Vercel dashboard

3. **Deploy**
- Vercel automatically deploys on push to main branch

### Environment Variables (Production)
Set these in your Vercel dashboard:
- `INSTANTLY_API_KEY`
- `GAIA_API_KEY`
- `CLOSE_API_KEY`
- `SLACK_WEBHOOK_URL`
- `NEXT_PUBLIC_APP_URL` (your production domain)

## 🛠️ Development

### Build for Production
```bash
npm run build
npm start
```

### Run Tests
```bash
npm test
```

### Lint Code
```bash
npm run lint
```

## 📚 Documentation

- **System Overview**: See [SYSTEM_OVERVIEW.md](./SYSTEM_OVERVIEW.md)
- **Agent Documentation**: See individual agent files in `lib/agents/`
- **API Documentation**: See `app/api/workflow/route.ts`
- **Dashboard Code**: See `app/page.tsx`
- **Type Definitions**: See `lib/types.ts`

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📝 License

Proprietary - All rights reserved

## 🎯 Roadmap

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

## 💬 Support

For issues, questions, or feature requests, please open an issue on GitHub.

---

**Built with ❤️ for luxury B2B sales teams**

**Last Updated**: February 4, 2026
