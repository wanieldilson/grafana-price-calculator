import React, { useState } from 'react';
import { PRICING_CONFIG } from './constants';
import { CalculatorState, EstimatorState } from './types';
import { InputSection } from './components/InputSection';
import { SummaryChart } from './components/SummaryChart';
import { EstimatorPanel } from './components/EstimatorPanel';
import { CounterInput } from './components/CounterInput';
import { LayoutDashboard, Settings2, HelpCircle, Server, Layers, Monitor, Users } from 'lucide-react';

const App: React.FC = () => {
  // Main Pricing State
  const [state, setState] = useState<CalculatorState>({
    metricsSeries: 15000,
    logsGB: 60,
    tracesGB: 0,
    profilesGB: 0,
    users: 5,
    enterpriseUsers: 0,
    irmUsers: 0,
    k6VUh: 0,
    k8sHostHours: 3650, // Default approx 5 hosts
    k8sContainerHours: 0,
    appHostHours: 3650,
    frontendSessions: 0,
    syntheticsAPIExecutions: 0,
    syntheticsBrowserExecutions: 0
  });

  // Estimator Toggle State
  const [showEstimator, setShowEstimator] = useState(false);
  const [estimatorState, setEstimatorState] = useState<EstimatorState>({
    hosts: 5,
    avgDailyLogsPerHostGB: 0.2,
    
    appInstances: 20,
    avgSeriesPerAppInstance: 450,
    avgDailyTracesPerAppInstanceGB: 0.5,
    avgDailyLogsPerAppInstanceGB: 0.1
  });

  const updateState = (key: keyof CalculatorState, value: number) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const handleEstimationApply = (estimates: Partial<CalculatorState>) => {
    if (showEstimator) {
      setState(prev => ({
        ...prev,
        ...estimates,
      }));
    }
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2 rounded-lg">
              <LayoutDashboard className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Grafana Cloud</h1>
              <p className="text-xs text-orange-400 font-medium">Pricing Estimator (Pro)</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button 
                onClick={() => setShowEstimator(!showEstimator)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  showEstimator 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
               <Settings2 size={16} />
               {showEstimator ? 'Hide Estimator' : 'Estimator Mode'}
             </button>
             <a href="https://grafana.com/pricing/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
               <HelpCircle size={20} />
             </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-2 space-y-8">
            
            {showEstimator && (
              <EstimatorPanel 
                estimatorState={estimatorState} 
                setEstimatorState={setEstimatorState}
                onApplyEstimation={handleEstimationApply}
              />
            )}

            {/* Infrastructure Section */}
            <div className="bg-slate-900 rounded-xl border border-slate-800/50">
              <div className="p-4 border-b border-slate-800 flex items-center gap-2">
                 <Server className="text-blue-500" size={20} />
                 <h2 className="text-lg font-bold text-white">Infrastructure & Core</h2>
              </div>
              <div className="p-6">
                <InputSection 
                  item={PRICING_CONFIG.metrics} 
                  value={state.metricsSeries} 
                  onChange={(v) => updateState('metricsSeries', v)}
                  max={3000000} 
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <InputSection 
                    item={PRICING_CONFIG.k8sHostHours} 
                    value={state.k8sHostHours} 
                    onChange={(v) => updateState('k8sHostHours', v)}
                    max={25000}
                  />
                   <InputSection 
                    item={PRICING_CONFIG.k8sContainerHours} 
                    value={state.k8sContainerHours} 
                    onChange={(v) => updateState('k8sContainerHours', v)}
                    max={500000} 
                  />
                </div>
                <InputSection 
                  item={PRICING_CONFIG.logs} 
                  value={state.logsGB} 
                  onChange={(v) => updateState('logsGB', v)}
                  max={2000}
                />
              </div>
            </div>

            {/* Application Observability Section */}
            <div className="bg-slate-900 rounded-xl border border-slate-800/50">
               <div className="p-4 border-b border-slate-800 flex items-center gap-2">
                 <Layers className="text-pink-500" size={20} />
                 <h2 className="text-lg font-bold text-white">Application Observability</h2>
              </div>
              <div className="p-6">
                <InputSection 
                  item={PRICING_CONFIG.appHostHours} 
                  value={state.appHostHours} 
                  onChange={(v) => updateState('appHostHours', v)}
                  max={750000}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputSection 
                    item={PRICING_CONFIG.traces} 
                    value={state.tracesGB} 
                    onChange={(v) => updateState('tracesGB', v)}
                    max={500}
                  />
                   <InputSection 
                    item={PRICING_CONFIG.profiles} 
                    value={state.profilesGB} 
                    onChange={(v) => updateState('profilesGB', v)}
                    max={500}
                  />
                </div>
              </div>
            </div>

            {/* User Experience Section */}
            <div className="bg-slate-900 rounded-xl border border-slate-800/50">
               <div className="p-4 border-b border-slate-800 flex items-center gap-2">
                 <Monitor className="text-yellow-500" size={20} />
                 <h2 className="text-lg font-bold text-white">Frontend & Testing</h2>
              </div>
              <div className="p-6">
                <InputSection 
                  item={PRICING_CONFIG.frontendSessions} 
                  value={state.frontendSessions} 
                  onChange={(v) => updateState('frontendSessions', v)}
                  max={1000000}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <InputSection 
                    item={PRICING_CONFIG.syntheticsAPI} 
                    value={state.syntheticsAPIExecutions} 
                    onChange={(v) => updateState('syntheticsAPIExecutions', v)}
                    max={1000000}
                  />
                   <InputSection 
                    item={PRICING_CONFIG.syntheticsBrowser} 
                    value={state.syntheticsBrowserExecutions} 
                    onChange={(v) => updateState('syntheticsBrowserExecutions', v)}
                    max={100000}
                  />
                </div>
                 <InputSection 
                  item={PRICING_CONFIG.k6} 
                  value={state.k6VUh} 
                  onChange={(v) => updateState('k6VUh', v)}
                  max={5000}
                />
              </div>
            </div>

             {/* Users & IRM Section */}
            <div className="bg-slate-900 rounded-xl border border-slate-800/50">
               <div className="p-4 border-b border-slate-800 flex items-center gap-2">
                 <Users className="text-purple-500" size={20} />
                 <h2 className="text-lg font-bold text-white">Users</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <CounterInput 
                    item={PRICING_CONFIG.users} 
                    value={state.users} 
                    onChange={(v) => updateState('users', v)}
                  />
                   <CounterInput 
                    item={PRICING_CONFIG.enterpriseUsers} 
                    value={state.enterpriseUsers} 
                    onChange={(v) => updateState('enterpriseUsers', v)}
                  />
                  <CounterInput 
                    item={PRICING_CONFIG.irmUsers} 
                    value={state.irmUsers} 
                    onChange={(v) => updateState('irmUsers', v)}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-1">
            <SummaryChart state={state} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
