import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PRICING_CONFIG } from '../constants';
import { CalculatorState } from '../types';

interface SummaryChartProps {
  state: CalculatorState;
}

// Extended colors to cover more categories
const COLORS = [
  '#F97316', // Orange (Metrics)
  '#3B82F6', // Blue (Logs)
  '#10B981', // Emerald (Traces)
  '#14B8A6', // Teal (Profiles)
  '#A855F7', // Purple (Users)
  '#9333EA', // Dark Purple (Enterprise Users)
  '#D946EF', // Fuchsia (IRM)
  '#F43F5E', // Rose (K6)
  '#6366F1', // Indigo (K8s Hosts)
  '#8B5CF6', // Violet (K8s Containers)
  '#EC4899', // Pink (App O11y)
  '#EAB308', // Yellow (Frontend)
  '#F97316', // Orange-500 (Synthetics)
];

export const SummaryChart: React.FC<SummaryChartProps> = ({ state }) => {
  
  // Logic: Calculate credits for Active Series based on Host Hours
  // 1 billable host hour = 600 active series included.
  const hostCountEquivalent = state.k8sHostHours / 730;
  const k8sSeriesCredits = Math.floor(hostCountEquivalent * 600);
  
  const calculateCost = (value: number, config: { included: number, unitStep: number, pricePerUnit: number }, credits: number = 0) => {
    const totalIncluded = config.included + credits;
    const billable = Math.max(0, value - totalIncluded);
    const units = Math.ceil(billable / config.unitStep); // Pricing is per unit step (e.g. per 1k)
    return units * config.pricePerUnit;
  };

  const costs = [
    { name: 'Metrics', value: calculateCost(state.metricsSeries, PRICING_CONFIG.metrics, k8sSeriesCredits) },
    { name: 'Logs', value: calculateCost(state.logsGB, PRICING_CONFIG.logs) },
    { name: 'Traces', value: calculateCost(state.tracesGB, PRICING_CONFIG.traces) },
    { name: 'Profiles', value: calculateCost(state.profilesGB, PRICING_CONFIG.profiles) },
    { name: 'K8s Hosts', value: calculateCost(state.k8sHostHours, PRICING_CONFIG.k8sHostHours) },
    { name: 'K8s Containers', value: calculateCost(state.k8sContainerHours, PRICING_CONFIG.k8sContainerHours) },
    { name: 'App O11y Hosts', value: calculateCost(state.appHostHours, PRICING_CONFIG.appHostHours) },
    { name: 'Frontend Sessions', value: calculateCost(state.frontendSessions, PRICING_CONFIG.frontendSessions) },
    { name: 'Synthetics (API)', value: calculateCost(state.syntheticsAPIExecutions, PRICING_CONFIG.syntheticsAPI) },
    { name: 'Synthetics (Browser)', value: calculateCost(state.syntheticsBrowserExecutions, PRICING_CONFIG.syntheticsBrowser) },
    { name: 'Standard Users', value: calculateCost(state.users, PRICING_CONFIG.users) },
    { name: 'Enterprise Users', value: calculateCost(state.enterpriseUsers, PRICING_CONFIG.enterpriseUsers) },
    { name: 'IRM Users', value: calculateCost(state.irmUsers, PRICING_CONFIG.irmUsers) },
    { name: 'k6 Testing', value: calculateCost(state.k6VUh, PRICING_CONFIG.k6) },
  ];

  const totalCost = costs.reduce((acc, curr) => acc + curr.value, 0);

  // Filter out zero values for the chart
  const data = costs.filter(c => c.value > 0);

  const formatCurrency = (val: number, decimals = 2) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(val);

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl sticky top-6">
      <h2 className="text-xl font-bold text-white mb-2">Estimated Monthly Cost</h2>
      <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-6">
        {formatCurrency(totalCost)}
        <span className="text-base text-slate-400 font-normal ml-2">/ month</span>
      </div>

      <div className="h-64 w-full mb-6">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number, name: any) => {
                  const isHighPrecision = name === 'K8s Hosts' || name === 'K8s Containers' || name === 'App O11y Hosts';
                  return formatCurrency(value, isHighPrecision ? 3 : 2);
                }}
                contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#F8FAFC' }}
                itemStyle={{ color: '#F8FAFC' }}
              />
              <Legend iconType="circle" wrapperStyle={{fontSize: '10px'}} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 flex-col">
            <span className="text-2xl mb-2">🎉</span>
            <p>Within Free Tier Limits</p>
          </div>
        )}
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {costs.map((item, idx) => {
          const isHighPrecision = item.name.includes('Hosts') || item.name.includes('Containers');
          return (
            <div key={item.name} className="flex justify-between items-center text-sm border-b border-slate-700 pb-2 last:border-0">
              <div className="flex items-center gap-2">
                <div 
                  className={`w-3 h-3 rounded-full flex-shrink-0`} 
                  style={{ backgroundColor: COLORS[idx % COLORS.length], opacity: item.value > 0 ? 1 : 0.3 }}
                ></div>
                <span className={item.value > 0 ? 'text-slate-200' : 'text-slate-500'}>{item.name}</span>
              </div>
              <span className={item.value > 0 ? 'text-white font-mono' : 'text-slate-600 font-mono'}>
                {formatCurrency(item.value, isHighPrecision ? 3 : 2)}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Credits Breakdown */}
      <div className="mt-6 pt-4 border-t border-slate-700">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Metrics Credits</h4>
        <div className="space-y-1 text-sm text-slate-500">
           <div className="flex justify-between">
              <span>Standard Included</span>
              <span className="text-slate-300">10,000</span>
           </div>
           {k8sSeriesCredits > 0 && (
            <div className="flex justify-between">
                <span className="text-blue-400">K8s Host Credits</span>
                <span className="text-blue-300">+{k8sSeriesCredits.toLocaleString()}</span>
            </div>
           )}
           <div className="flex justify-between border-t border-slate-700 pt-1 mt-1 font-mono text-slate-300">
              <span>Total Included</span>
              <span>{(10000 + k8sSeriesCredits).toLocaleString()}</span>
           </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700 text-xs text-slate-500">
        *Estimates are based on Grafana Cloud Pro list prices. Active Series credits applied based on {state.k8sHostHours.toLocaleString()} billable K8s host hours.
      </div>
    </div>
  );
};