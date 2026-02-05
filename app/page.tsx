/**
 * Dashboard Home Page
 * Main interface for the Multi-Agent SDR System
 * Displays workflow status, metrics, and controls
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data for demonstration
const campaignMetrics = {
  totalLeads: 150,
  leadsEnriched: 145,
  leadsOutreached: 140,
  emailsSent: 140,
  emailsOpened: 56,
  emailsClicked: 28,
  emailsReplied: 21,
  positiveReplies: 12,
  gaiaCalls: 12,
  meetingsBooked: 8,
  openRate: 40,
  clickRate: 20,
  replyRate: 15,
};

const performanceData = [
  { name: 'Week 1', opens: 30, clicks: 12, replies: 5 },
  { name: 'Week 2', opens: 35, clicks: 15, replies: 7 },
  { name: 'Week 3', opens: 40, clicks: 18, replies: 9 },
  { name: 'Week 4', opens: 45, clicks: 22, replies: 12 },
];

const segmentData = [
  { name: 'Tier 1 (80-100)', value: 35, color: '#10b981' },
  { name: 'Tier 2 (60-79)', value: 45, color: '#3b82f6' },
  { name: 'Tier 3 (40-59)', value: 40, color: '#f59e0b' },
  { name: 'Tier 4 (0-39)', value: 30, color: '#ef4444' },
];

const recentActivity = [
  {
    id: 1,
    event: 'Meeting Booked',
    prospect: 'John Doe, Acme Corp',
    time: '2 hours ago',
    status: 'success',
  },
  {
    id: 2,
    event: 'Positive Reply',
    prospect: 'Jane Smith, TechVision Inc',
    time: '4 hours ago',
    status: 'success',
  },
  {
    id: 3,
    event: 'Gaia Call Completed',
    prospect: 'Mike Johnson, DataFlow LLC',
    time: '6 hours ago',
    status: 'success',
  },
  {
    id: 4,
    event: 'Campaign Launched',
    prospect: '140 leads outreached',
    time: '1 day ago',
    status: 'info',
  },
];

export default function Dashboard() {
  const [isRunning, setIsRunning] = useState(false);

  const handleStartWorkflow = async () => {
    setIsRunning(true);

    try {
      const response = await fetch('/api/workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: 'client_demo_001',
          icpData: {
            industry: 'SaaS',
            companySize: '100-5000',
            revenue: '1M-500M',
            painPoints: ['Sales Efficiency', 'Revenue Growth'],
          },
        }),
      });

      const data = await response.json();
      console.log('Workflow started:', data);
    } catch (error) {
      console.error('Error starting workflow:', error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            🚀 Luxury SDR System
          </h1>
          <p className="text-lg text-slate-600">
            Multi-Agent Sales Development Workflow
          </p>
        </div>

        {/* Control Panel */}
        <Card className="mb-8 p-6 bg-white border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Campaign Control
              </h2>
              <p className="text-slate-600">
                Start a new campaign to initiate the complete SDR workflow
              </p>
            </div>
            <Button
              onClick={handleStartWorkflow}
              disabled={isRunning}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isRunning ? '⏳ Starting...' : '▶️ Start Workflow'}
            </Button>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Total Leads"
            value={campaignMetrics.totalLeads}
            icon="📊"
            color="blue"
          />
          <MetricCard
            title="Leads Outreached"
            value={campaignMetrics.leadsOutreached}
            icon="📧"
            color="green"
          />
          <MetricCard
            title="Positive Replies"
            value={campaignMetrics.positiveReplies}
            icon="💬"
            color="purple"
          />
          <MetricCard
            title="Meetings Booked"
            value={campaignMetrics.meetingsBooked}
            icon="📅"
            color="orange"
          />
        </div>

        {/* Tabs for detailed views */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="segments">Segments</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Email Metrics */}
              <Card className="p-6 bg-white border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  📧 Email Campaign Metrics
                </h3>
                <div className="space-y-3">
                  <MetricRow
                    label="Emails Sent"
                    value={campaignMetrics.emailsSent}
                  />
                  <MetricRow
                    label="Open Rate"
                    value={`${campaignMetrics.openRate}%`}
                  />
                  <MetricRow
                    label="Click Rate"
                    value={`${campaignMetrics.clickRate}%`}
                  />
                  <MetricRow
                    label="Reply Rate"
                    value={`${campaignMetrics.replyRate}%`}
                  />
                  <MetricRow
                    label="Positive Replies"
                    value={campaignMetrics.positiveReplies}
                  />
                </div>
              </Card>

              {/* Qualification Metrics */}
              <Card className="p-6 bg-white border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  📞 Qualification Metrics
                </h3>
                <div className="space-y-3">
                  <MetricRow
                    label="Gaia Calls Initiated"
                    value={campaignMetrics.gaiaCalls}
                  />
                  <MetricRow
                    label="Qualified Leads"
                    value={Math.round(campaignMetrics.gaiaCalls * 0.83)}
                  />
                  <MetricRow
                    label="Qualification Rate"
                    value="83%"
                  />
                  <MetricRow
                    label="Meetings Booked"
                    value={campaignMetrics.meetingsBooked}
                  />
                  <MetricRow
                    label="Meeting Booking Rate"
                    value="67%"
                  />
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance">
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                📈 Campaign Performance Over Time
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="opens"
                    stroke="#3b82f6"
                    name="Opens"
                  />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="#10b981"
                    name="Clicks"
                  />
                  <Line
                    type="monotone"
                    dataKey="replies"
                    stroke="#f59e0b"
                    name="Replies"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          {/* Segments Tab */}
          <TabsContent value="segments">
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                🎯 Lead Segmentation by ICP Score
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={segmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {segmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                🔔 Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <div>
                      <p className="font-medium text-slate-900">
                        {activity.event}
                      </p>
                      <p className="text-sm text-slate-600">
                        {activity.prospect}
                      </p>
                    </div>
                    <p className="text-sm text-slate-500">{activity.time}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Agent Status */}
        <Card className="p-6 bg-white border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            🤖 Agent Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-9 gap-3">
            {[
              { name: 'ICP Strategy', emoji: '📋' },
              { name: 'Lead Source', emoji: '🔍' },
              { name: 'Enrichment', emoji: '💎' },
              { name: 'Outbound', emoji: '📧' },
              { name: 'Reply Handler', emoji: '📬' },
              { name: 'Gaia Phone', emoji: '📞' },
              { name: 'Meeting Booker', emoji: '📅' },
              { name: 'Notifications', emoji: '📢' },
              { name: 'Reporting', emoji: '📊' },
            ].map((agent) => (
              <div
                key={agent.name}
                className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 text-center"
              >
                <p className="text-2xl mb-1">{agent.emoji}</p>
                <p className="text-xs font-medium text-slate-700">
                  {agent.name}
                </p>
                <p className="text-xs text-green-600 mt-1">✓ Ready</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/**
 * Metric Card Component
 * Displays a single metric with icon and color
 */
function MetricCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: string;
  color: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    green: 'bg-green-50 border-green-200 text-green-900',
    purple: 'bg-purple-50 border-purple-200 text-purple-900',
    orange: 'bg-orange-50 border-orange-200 text-orange-900',
  };

  return (
    <Card className={`p-6 border ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <p className="text-4xl">{icon}</p>
      </div>
    </Card>
  );
}

/**
 * Metric Row Component
 * Displays a metric label and value in a row
 */
function MetricRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-b-0">
      <span className="text-slate-600">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}
