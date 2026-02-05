# 🚀 Quick Start Guide - Luxury SDR System

Get up and running with the Multi-Agent SDR System in 5 minutes.

## 1️⃣ Installation (1 minute)

```bash
# Navigate to project directory
cd /home/code/luxury-sdr-system

# Install dependencies
npm install

# Start development server
npm run dev
```

The server will start on `http://localhost:3001`

## 2️⃣ Access Dashboard (30 seconds)

Open your browser and navigate to:
- **Local**: http://localhost:3001
- **Public**: https://luxury-sdr.lindy.site

You'll see the Luxury SDR System dashboard with:
- 📊 Real-time metrics (Total Leads, Leads Outreached, Positive Replies, Meetings Booked)
- 📈 Campaign performance charts
- 🎯 Lead segmentation analysis
- 🔔 Recent activity feed
- 🤖 Agent status monitoring

## 3️⃣ Start Your First Workflow (1 minute)

1. Click the **"▶️ Start Workflow"** button in the Campaign Control section
2. The system will automatically:
   - Create an ICP targeting playbook
   - Source leads from Instantly
   - Enrich and score leads
   - Launch personalized email sequences
   - Monitor for replies and qualify leads
   - Book meetings and sync to CRM
   - Send Slack notifications
   - Generate reports

3. Watch the dashboard update in real-time as the workflow progresses

## 4️⃣ Explore Dashboard Tabs (2 minutes)

### Overview Tab
- Email campaign metrics (opens, clicks, replies)
- Qualification metrics (Gaia calls, qualified leads, meetings)
- Conversion rates and performance indicators

### Performance Tab
- Line chart showing campaign performance over 4 weeks
- Tracks opens, clicks, and replies
- Identify trends and optimization opportunities

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

## 5️⃣ API Integration (Optional)

### Start Workflow via API

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

### Get Workflow Status

```bash
curl http://localhost:3001/api/workflow?workflowId=workflow_1707000000000
```

## 📊 Understanding the Workflow

### Step-by-Step Process

**Immediate Steps** (Sequential):
1. **ICP Strategy Agent** → Creates targeting playbook with buyer personas
2. **Lead Source Agent** → Sources leads from Instantly based on ICP
3. **Enrichment Agent** → Enriches leads and scores them (0-100)
4. **Outbound Sequencer Agent** → Launches personalized email sequences

**Continuous Monitoring** (Every 5 minutes):
5. **Reply Classifier Agent** → Monitors for new replies and classifies intent
6. **Gaia Phone Qualifier Agent** → Initiates AI phone calls on positive intent
7. **Meeting Booker Agent** → Books meetings and syncs to Close CRM
8. **Notifications Agent** → Sends Slack alerts for key events
9. **Reporting Agent** → Generates reports and insights

### Key Metrics

- **Total Leads**: 150 leads in current campaign
- **Leads Outreached**: 140 leads with emails sent
- **Email Open Rate**: 40% of emails opened
- **Click Rate**: 20% of emails clicked
- **Reply Rate**: 15% of emails replied
- **Positive Replies**: 12 leads with positive intent
- **Gaia Calls**: 12 AI phone calls initiated
- **Meetings Booked**: 8 confirmed meetings
- **Qualification Rate**: 83% of calls qualified
- **Meeting Booking Rate**: 67% of qualified leads booked meetings

## 🔧 Configuration

### Environment Variables

Create `.env.local` with your API keys:

```bash
# Instantly API (for lead sourcing and email)
INSTANTLY_API_KEY=your_instantly_api_key

# Gaia API (for AI phone qualification)
GAIA_API_KEY=your_gaia_api_key

# Close CRM API (for meeting management)
CLOSE_API_KEY=your_close_api_key

# Slack Webhook (for notifications)
SLACK_WEBHOOK_URL=your_slack_webhook_url

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

## 🎯 Next Steps

1. **Customize ICP Data**: Modify the ICP parameters in the workflow to match your target market
2. **Connect APIs**: Add your actual API keys for Instantly, Gaia, Close CRM, and Slack
3. **Monitor Campaigns**: Watch the dashboard as campaigns progress
4. **Analyze Results**: Review the Reporting Agent's insights and recommendations
5. **Optimize**: Use the data to refine your targeting and messaging

## 📚 Learn More

- **Full Documentation**: See [README.md](./README.md)
- **System Overview**: See [SYSTEM_OVERVIEW.md](./SYSTEM_OVERVIEW.md)
- **Agent Details**: See individual agent files in `lib/agents/`
- **API Documentation**: See `app/api/workflow/route.ts`

## 🆘 Troubleshooting

### Server won't start
```bash
# Check if port 3001 is in use
lsof -i :3001

# Kill process on port 3001 if needed
kill -9 <PID>

# Try starting again
npm run dev
```

### Dashboard not loading
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Check browser console for errors (F12)

### API calls failing
- Verify environment variables are set in `.env.local`
- Check that API keys are valid
- Review server logs for error messages

## 💡 Tips

- **Real-time Updates**: Dashboard updates automatically as workflow progresses
- **Mobile Friendly**: Dashboard is fully responsive on mobile devices
- **Dark Mode**: Use browser's dark mode for comfortable viewing
- **Keyboard Navigation**: Use Tab to navigate between sections

## 🚀 Production Deployment

When ready to deploy:

1. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

2. **Deploy to Vercel**:
   - Push to GitHub
   - Connect repository to Vercel
   - Set environment variables in Vercel dashboard
   - Vercel auto-deploys on push

3. **Monitor in production**:
   - Check Vercel analytics
   - Monitor API performance
   - Review Slack notifications for errors

---

**You're all set! 🎉 Start your first workflow and watch the magic happen.**

For detailed information, see the full [README.md](./README.md) and [SYSTEM_OVERVIEW.md](./SYSTEM_OVERVIEW.md).
