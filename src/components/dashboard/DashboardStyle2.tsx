'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  mockDashboardMetrics,
  mockAgentOperations,
} from '@/lib/mock-data/pilot-data';
import {
  Search,
  Bell,
  Info,
  TrendingUp,
  MoreVertical,
  CheckSquare,
  Square,
  Plus,
  Compass,
  Activity,
  Bot,
  PlayCircle,
  CheckCircle2,
  Scale,
  Zap,
  BarChart3,
  Settings,
  HelpCircle,
  PanelLeftClose,
  AlertTriangle,
} from 'lucide-react';

interface DashboardStyle2Props {
  userName: string;
  userImage: string | null;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good morning';
  if (hour >= 12 && hour < 17) return 'Good afternoon';
  if (hour >= 17 && hour < 21) return 'Good evening';
  return 'Good night';
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function DashboardStyle2({ userName, userImage }: DashboardStyle2Props) {
  const [activeNav, setActiveNav] = useState('overview');
  const [selectedWeekDay, setSelectedWeekDay] = useState('Tue');
  const [selectedItems, setSelectedItems] = useState<string[]>(['agent-1', 'agent-2']);
  const [chartMetric, setChartMetric] = useState<'throughput' | 'latency'>('throughput');

  const initials = getInitials(userName);
  const greeting = getGreeting();

  const toggleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === mockAgentOperations.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(mockAgentOperations.map((a) => a.id));
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5FC] text-zinc-900 font-sans flex flex-col md:flex-row antialiased">
      {/* Left Sidebar */}
      <aside className="w-full md:w-64 bg-white/95 backdrop-blur-xl border-r border-purple-100/80 flex flex-col justify-between p-4 shrink-0 shadow-sm">
        <div className="space-y-6">
          {/* Logo & Brand: Pilot AI */}
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-black flex items-center justify-center shadow-lg shadow-purple-500/20 border border-purple-200/60 shrink-0">
                <Image
                  src="/images/pilot-logo.jpg"
                  alt="Pilot AI Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-base font-bold tracking-tight text-zinc-900">Pilot AI</span>
            </div>
            <button className="text-zinc-400 hover:text-zinc-600 cursor-pointer">
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative px-1">
            <Search className="w-3.5 h-3.5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search agents, runs, metrics..."
              className="w-full pl-9 pr-8 py-2 bg-purple-50/30 border border-purple-100/80 rounded-xl text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-400 bg-white border border-zinc-200 rounded px-1 shadow-2xs">
              ⌘+F
            </span>
          </div>

          {/* Nav Categories */}
          <div className="space-y-4">
            <div>
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-purple-400 mb-1">GENERAL</div>
              <nav className="space-y-0.5">
                {[
                  { id: 'overview', label: 'Overview', icon: <Compass className="w-4 h-4" /> },
                  { id: 'operations', label: 'Operations', icon: <Activity className="w-4 h-4" /> },
                  { id: 'agents', label: 'Agents', icon: <Bot className="w-4 h-4" /> },
                  { id: 'runs', label: 'Runs', icon: <PlayCircle className="w-4 h-4" />, badge: '12' },
                ].map((item) => {
                  const isActive = activeNav === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveNav(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-50 to-violet-50/50 text-purple-700 font-semibold border border-purple-200/80 shadow-xs'
                          : 'text-zinc-500 hover:text-zinc-900 hover:bg-purple-50/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={isActive ? 'text-purple-600' : 'text-zinc-400'}>{item.icon}</span>
                        {item.label}
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded bg-purple-100/80 text-purple-700 text-[10px] font-mono font-bold">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div>
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-purple-400 mb-1">TOOLS</div>
              <nav className="space-y-0.5">
                {[
                  { id: 'approvals', label: 'Approvals', icon: <CheckCircle2 className="w-4 h-4" />, badge: '3', alert: true },
                  { id: 'evaluations', label: 'Evaluations', icon: <Scale className="w-4 h-4" /> },
                  { id: 'optimizer', label: 'Optimizer', icon: <Zap className="w-4 h-4" /> },
                  { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" />, beta: true },
                ].map((item) => {
                  const isActive = activeNav === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveNav(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-50 to-violet-50/50 text-purple-700 font-semibold border border-purple-200/80 shadow-xs'
                          : 'text-zinc-500 hover:text-zinc-900 hover:bg-purple-50/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={isActive ? 'text-purple-600' : 'text-zinc-400'}>{item.icon}</span>
                        {item.label}
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-mono font-bold">
                          {item.badge}
                        </span>
                      )}
                      {item.beta && (
                        <span className="px-1.5 py-0.5 rounded bg-purple-100/80 text-purple-600 text-[9px] font-bold uppercase">
                          BETA
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div>
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-purple-400 mb-1">SUPPORT</div>
              <nav className="space-y-0.5">
                {[
                  { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
                  { id: 'help', label: 'Help', icon: <HelpCircle className="w-4 h-4" /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-zinc-500 hover:text-zinc-900 hover:bg-purple-50/40 transition-all cursor-pointer"
                  >
                    <span className="text-zinc-400">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* User Profile in Sidebar Bottom */}
        <div className="p-2.5 rounded-2xl bg-gradient-to-r from-purple-50 to-violet-50/60 border border-purple-200/80 flex items-center justify-between mt-4">
          <div className="flex items-center gap-2.5">
            {userImage ? (
              <Image
                src={userImage}
                alt={userName}
                width={36}
                height={36}
                className="w-9 h-9 rounded-xl object-cover border border-purple-200 shadow-md shadow-purple-500/20 shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-violet-600 border border-purple-200 flex items-center justify-center text-sm font-bold text-white shadow-md shadow-purple-500/20 shrink-0">
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <div className="text-xs font-bold text-zinc-900 truncate">{userName}</div>
              <div className="text-[10px] text-purple-600 font-mono font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Active Commander
              </div>
            </div>
          </div>
          <button className="text-zinc-400 hover:text-purple-700 p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer shrink-0">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-4 md:p-6 overflow-y-auto space-y-6">
        {/* Top Header */}
        <header className="flex items-center justify-between gap-4 pb-1">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-900">Dashboard</h1>
            <p className="text-xs text-zinc-500 mt-0.5">
              {greeting}, {userName.split(' ')[0]} — Here&apos;s what&apos;s happening across your agents.
            </p>
          </div>

          {/* Action buttons in header */}
          <div className="flex items-center gap-1.5 p-1 bg-white/90 backdrop-blur-md border border-purple-100 rounded-2xl shadow-xs">
            <div className="relative">
              <button className="p-2 text-zinc-500 hover:text-zinc-800 rounded-xl hover:bg-purple-50/50 cursor-pointer transition-colors">
                <Bell className="w-4 h-4 text-purple-600" />
              </button>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500" />
            </div>
            <button className="p-2 text-zinc-500 hover:text-zinc-800 rounded-xl hover:bg-purple-50/50 cursor-pointer transition-colors">
              <Plus className="w-4 h-4 text-purple-600" />
            </button>
          </div>
        </header>

        {/* Top 3 KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Active Agents Card */}
          <div className="bg-white/90 backdrop-blur-md p-5 rounded-3xl border border-purple-100/80 shadow-xs hover:shadow-md transition-all duration-300 space-y-3 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Agents
              </div>
              <Info className="w-3.5 h-3.5 text-purple-400 cursor-pointer" />
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-black tracking-tight text-zinc-900">
                {mockDashboardMetrics.activeAgentsCount} <span className="text-sm font-semibold text-zinc-400">Active</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold font-mono border border-emerald-200">
                <TrendingUp className="w-3 h-3" />
                15.8% ↗
              </span>
            </div>
            <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-fuchsia-500 h-full w-[85%] rounded-full" />
            </div>
            <div className="text-[11px] text-zinc-500 flex justify-between">
              <span>Swarm Capacity</span>
              <span className="font-bold text-purple-700">85% allocated</span>
            </div>
          </div>

          {/* Needs Attention Card */}
          <div className="bg-white/90 backdrop-blur-md p-5 rounded-3xl border border-purple-100/80 shadow-xs hover:shadow-md transition-all duration-300 space-y-3 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Needs You (Attention)
              </div>
              <Info className="w-3.5 h-3.5 text-purple-400 cursor-pointer" />
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-black tracking-tight text-zinc-900">
                {mockDashboardMetrics.needsAttentionCount} <span className="text-sm font-semibold text-zinc-400">Pending</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold font-mono border border-amber-200">
                3 Approvals
              </span>
            </div>
            <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full w-[35%] rounded-full" />
            </div>
            <div className="text-[11px] text-zinc-500 flex justify-between">
              <span>Intervention SLA</span>
              <span className="font-bold text-amber-600">Fast Response Req</span>
            </div>
          </div>

          {/* Success Rate Card */}
          <div className="bg-white/90 backdrop-blur-md p-5 rounded-3xl border border-purple-100/80 shadow-xs hover:shadow-md transition-all duration-300 space-y-3 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Success Rate
              </div>
              <Info className="w-3.5 h-3.5 text-purple-400 cursor-pointer" />
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-black tracking-tight text-zinc-900">
                {mockDashboardMetrics.successRatePercent}%
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold font-mono border border-emerald-200">
                <TrendingUp className="w-3 h-3" />
                +1.4% ↗
              </span>
            </div>
            <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full w-[94.7%] rounded-full" />
            </div>
            <div className="text-[11px] text-zinc-500 flex justify-between">
              <span>Goal Accuracy</span>
              <span className="font-bold text-emerald-600">Nominal 99.8% SLA</span>
            </div>
          </div>
        </section>

        {/* Middle Row: Glowing Purple Ribbon Stream Chart + Weekly Bar Chart */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Middle Left (2 cols): Multi-bar Ribbon Stream Chart with Glowing Purple Spline Waves */}
          <div className="lg:col-span-2 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-purple-100/80 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                  <Activity className="w-4 h-4 text-purple-600" />
                  Operations & Task Stream Velocity
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-black text-zinc-900">18.4M Tokens</span>
                  <span className="text-xs font-mono text-emerald-600 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    15.8% ↗ +143.5k ops
                  </span>
                </div>
              </div>

              {/* Chart Metric Toggle */}
              <div className="flex items-center gap-1.5 p-1 bg-purple-50/60 rounded-xl border border-purple-100">
                <button
                  onClick={() => setChartMetric('throughput')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    chartMetric === 'throughput' ? 'bg-white text-purple-700 shadow-xs' : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  Throughput
                </button>
                <button
                  onClick={() => setChartMetric('latency')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    chartMetric === 'latency' ? 'bg-white text-purple-700 shadow-xs' : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  Latency (ms)
                </button>
              </div>
            </div>

            {/* Glowing Interactive Purple Multi-Layer Wave Chart */}
            <div className="h-60 w-full relative pt-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="nexus-purple-1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9333ea" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#9333ea" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="nexus-purple-2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="nexus-purple-3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e879f9" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#e879f9" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                <line x1="0" y1="35" x2="500" y2="35" stroke="#f3e8ff" strokeWidth="1.5" strokeDasharray="4" />
                <line x1="0" y1="75" x2="500" y2="75" stroke="#f3e8ff" strokeWidth="1.5" strokeDasharray="4" />
                <line x1="0" y1="115" x2="500" y2="115" stroke="#f3e8ff" strokeWidth="1.5" strokeDasharray="4" />

                {/* Wave 3: Fuchsia */}
                <path
                  d="M 0 130 C 90 90, 160 140, 240 100 C 320 60, 410 110, 500 80 L 500 160 L 0 160 Z"
                  fill="url(#nexus-purple-3)"
                />
                <path
                  d="M 0 130 C 90 90, 160 140, 240 100 C 320 60, 410 110, 500 80"
                  fill="none"
                  stroke="#e879f9"
                  strokeWidth="2.5"
                />

                {/* Wave 2: Violet */}
                <path
                  d="M 0 110 C 80 50, 170 120, 250 70 C 330 30, 420 90, 500 45 L 500 160 L 0 160 Z"
                  fill="url(#nexus-purple-2)"
                />
                <path
                  d="M 0 110 C 80 50, 170 120, 250 70 C 330 30, 420 90, 500 45"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2.5"
                />

                {/* Wave 1: Deep Purple */}
                <path
                  d="M 0 85 C 90 30, 180 95, 260 40 C 340 10, 420 60, 500 20 L 500 160 L 0 160 Z"
                  fill="url(#nexus-purple-1)"
                />
                <path
                  d="M 0 85 C 90 30, 180 95, 260 40 C 340 10, 420 60, 500 20"
                  fill="none"
                  stroke="#9333ea"
                  strokeWidth="3"
                />

                {/* Glowing Nodes on Wave 1 */}
                <circle cx="260" cy="40" r="5" fill="#9333ea" stroke="#ffffff" strokeWidth="2.5" />
                <circle cx="500" cy="20" r="5" fill="#9333ea" stroke="#ffffff" strokeWidth="2.5" />
              </svg>

              {/* Tooltip on Active Node */}
              <div className="absolute left-[48%] top-2 px-3 py-1.5 rounded-xl bg-purple-950 text-white font-mono text-[11px] shadow-xl flex items-center gap-1.5 border border-purple-400/30">
                <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-ping" />
                <span>Peak: 9,345 ops/min</span>
              </div>

              {/* Legend with Interactive Pills */}
              <div className="flex items-center justify-between pt-4 border-t border-purple-100 text-[11px] text-zinc-500">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> Browser Automation (6/12)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-violet-500" /> Lead Synthesis (3/8)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500" /> Optimizer & QA (3/8)</span>
              </div>
            </div>
          </div>

          {/* Middle Right (1 col): Total Tasks Executed & Rounded 3D Weekly Bars */}
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-purple-100/80 shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-zinc-500">Weekly Run Distribution</div>
                <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold font-mono border border-purple-200">
                  Active Sprint
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-zinc-900">{mockDashboardMetrics.totalRunsCount.toLocaleString()}</span>
                <span className="text-xs font-mono text-emerald-600 font-bold">8.3% ↗ +749</span>
              </div>
            </div>

            {/* Weekly 3D Rounded Pill Bar Chart */}
            <div className="h-44 flex items-end justify-between gap-2.5 px-2 pt-6">
              {[
                { day: 'Sun', height: '35%' },
                { day: 'Mon', height: '55%' },
                { day: 'Tue', height: '90%', active: true, value: '3.8k' },
                { day: 'Wed', height: '45%' },
                { day: 'Thu', height: '70%' },
                { day: 'Fri', height: '65%' },
                { day: 'Sat', height: '30%' },
              ].map((b) => (
                <div
                  key={b.day}
                  onClick={() => setSelectedWeekDay(b.day)}
                  className="flex-1 flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  {b.active && (
                    <span className="text-[10px] font-black font-mono text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded-md shadow-xs">
                      {b.value}
                    </span>
                  )}
                  <div
                    style={{ height: b.height }}
                    className={`w-full rounded-full transition-all duration-300 ${
                      b.day === selectedWeekDay
                        ? 'bg-gradient-to-t from-purple-600 via-violet-600 to-fuchsia-400 shadow-lg shadow-purple-500/30 scale-105'
                        : 'bg-zinc-100 group-hover:bg-purple-100/60'
                    }`}
                  />
                  <span className={`text-[11px] font-semibold ${b.day === selectedWeekDay ? 'text-purple-900 font-bold' : 'text-zinc-400'}`}>
                    {b.day}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-gradient-to-r from-purple-50 to-violet-50/60 rounded-2xl text-xs text-zinc-700 flex items-center justify-between border border-purple-100">
              <span>Peak Day: <strong className="text-purple-950">Tuesday (3,874 ops)</strong></span>
              <button className="text-purple-700 font-bold hover:underline cursor-pointer">Inspect</button>
            </div>
          </div>
        </section>

        {/* Bottom Section: Full Width Live Agent Operations & Status */}
        <section className="w-full">
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-purple-100/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-zinc-900">Live Agent Operations & Status</h3>
                  <span className="px-2 py-0.5 rounded-full bg-purple-100/80 text-purple-700 text-[10px] font-mono font-bold">
                    {mockAgentOperations.length} Active Swarms
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">Autonomous agents executing across your deployment pipelines</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-400 font-mono">
                  {selectedItems.length} selected
                </span>
                <button
                  onClick={toggleSelectAll}
                  className="text-xs font-bold text-purple-600 hover:text-purple-700 cursor-pointer hover:underline"
                >
                  {selectedItems.length === mockAgentOperations.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[10px] font-bold uppercase tracking-wider text-purple-400 border-b border-purple-100 pb-2">
                    <th className="py-2.5 w-10"></th>
                    <th className="py-2.5">Agent / Codename</th>
                    <th className="py-2.5">Category</th>
                    <th className="py-2.5">Status</th>
                    <th className="py-2.5">Runtime</th>
                    <th className="py-2.5">Model Engine</th>
                    <th className="py-2.5">Latency</th>
                    <th className="py-2.5 text-right">Throughput / Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-50/80">
                  {mockAgentOperations.map((row) => {
                    const isChecked = selectedItems.includes(row.id);
                    return (
                      <tr key={row.id} className="hover:bg-purple-50/50 transition-colors group">
                        <td className="py-3.5">
                          <button onClick={() => toggleSelect(row.id)} className="cursor-pointer text-zinc-400 hover:text-purple-600">
                            {isChecked ? <CheckSquare className="w-4 h-4 text-purple-600" /> : <Square className="w-4 h-4" />}
                          </button>
                        </td>
                        <td className="py-3.5">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                                row.status === 'running'
                                  ? 'bg-emerald-500 animate-pulse'
                                  : row.status === 'approval_required'
                                  ? 'bg-amber-500'
                                  : 'bg-zinc-400'
                              }`}
                            />
                            <div>
                              <div className="font-bold text-zinc-900 group-hover:text-purple-900 transition-colors">
                                {row.name}
                              </div>
                              <div className="text-[10px] font-mono text-zinc-400">{row.codename}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5">
                          <span className="px-2 py-0.5 rounded-lg bg-purple-50 text-purple-700 text-[10px] font-semibold border border-purple-100">
                            {row.category}
                          </span>
                        </td>
                        <td className="py-3.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              row.status === 'running'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : row.status === 'approval_required'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-zinc-100 text-zinc-600'
                            }`}
                          >
                            {row.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3.5 font-mono text-zinc-600 font-semibold">{row.runtime}</td>
                        <td className="py-3.5 text-zinc-600 font-medium">{row.model}</td>
                        <td className="py-3.5 font-mono text-zinc-500">{row.latencyMs}ms</td>
                        <td className="py-3.5 text-right font-mono font-bold text-purple-950">{row.cost}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
