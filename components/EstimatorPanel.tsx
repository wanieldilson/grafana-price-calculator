import React, { useEffect } from 'react';
import { EstimatorState, CalculatorState } from '../types';
import { ESTIMATOR_DEFAULTS } from '../constants';
import { Calculator, Server, HardDrive, Layers, Activity, FileText, Clock } from 'lucide-react';

interface EstimatorPanelProps {
  estimatorState: EstimatorState;
  setEstimatorState: (s: EstimatorState) => void;
  onApplyEstimation: (s: Partial<CalculatorState>) => void;
}

export const EstimatorPanel: React.FC<EstimatorPanelProps> = ({ estimatorState, setEstimatorState, onApplyEstimation }) => {
  
  // Calculate Infrastructure Metrics
  const infraSeries = estimatorState.hosts * ESTIMATOR_DEFAULTS.SERIES_PER_HOST;
  const infraLogs = estimatorState.hosts * estimatorState.avgDailyLogsPerHostGB * 30; // Monthly
  const infraHostHours = estimatorState.hosts * 730; // Approx hours per month per host

  // Calculate APM / Application Metrics
  const appSeries = estimatorState.appInstances * estimatorState.avgSeriesPerAppInstance;
  const appLogs = estimatorState.appInstances * estimatorState.avgDailyLogsPerAppInstanceGB * 30; // Monthly
  const appTraces = estimatorState.appInstances * estimatorState.avgDailyTracesPerAppInstanceGB * 30; // Monthly

  const totalSeries = infraSeries + appSeries;
  const totalLogs = infraLogs + appLogs;
  const totalTraces = appTraces;

  useEffect(() => {
    onApplyEstimation({
      metricsSeries: Math.round(totalSeries),
      logsGB: Math.round(totalLogs),
      tracesGB: Math.round(totalTraces),
      k8sHostHours: Math.round(infraHostHours),
      k8sContainerHours: Math.round(infraHostHours * 8), // Rough estimate: 8 containers per host
      appHostHours: Math.round(infraHostHours), // Assume App O11y runs on the same hosts
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estimatorState, totalSeries, totalLogs, totalTraces, infraHostHours]);

  const handleChange = (key: keyof EstimatorState, val: number) => {
    setEstimatorState({ ...estimatorState, [key]: val });
  };

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-indigo-500/30 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Calculator size={160} />
      </div>
      
      <div className="relative z-10">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-indigo-400 flex items-center gap-2">
            <Calculator size={20} /> Usage Estimator
          </h3>
          <p className="text-sm text-slate-400">
            Adjust infrastructure and application details to estimate monthly Series, Logs, Traces, and Host Hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Infrastructure Section */}
          <div className="bg-slate-900/50 p-5 rounded-lg border border-slate-700/50">
            <h4 className="text-slate-200 font-medium mb-4 flex items-center gap-2 pb-2 border-b border-slate-700/50">
              <Server size={16} className="text-blue-400" /> Infrastructure
            </h4>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  Hosts / Nodes
                </label>
                <div className="flex items-center gap-3">
                  <input 
                    type="range"
                    min="0" max="100" step="1"
                    value={estimatorState.hosts}
                    onChange={(e) => handleChange('hosts', Number(e.target.value))}
                    className="flex-grow h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <input 
                    type="number" 
                    min="0"
                    value={estimatorState.hosts}
                    onChange={(e) => handleChange('hosts', Number(e.target.value))}
                    className="w-16 bg-slate-800 border border-slate-600 rounded p-1 text-center text-sm text-white focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  Daily Logs / Host (GB)
                </label>
                 <div className="flex items-center gap-2">
                    <input 
                      type="range" 
                      min="0.1" max="5" step="0.1"
                      value={estimatorState.avgDailyLogsPerHostGB}
                      onChange={(e) => handleChange('avgDailyLogsPerHostGB', Number(e.target.value))}
                      className="flex-grow h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <span className="text-xs text-blue-300 font-mono w-14 text-right">
                        {estimatorState.avgDailyLogsPerHostGB.toFixed(1)} GB
                    </span>
                </div>
              </div>
            </div>
          </div>

          {/* Applications / APM Section */}
          <div className="bg-slate-900/50 p-5 rounded-lg border border-slate-700/50">
             <h4 className="text-slate-200 font-medium mb-4 flex items-center gap-2 pb-2 border-b border-slate-700/50">
              <Layers size={16} className="text-pink-400" /> APM & Applications
            </h4>

            <div className="space-y-5">
               <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  App Instances
                </label>
                <div className="flex items-center gap-3">
                  <input 
                    type="range"
                    min="0" max="200" step="1"
                    value={estimatorState.appInstances}
                    onChange={(e) => handleChange('appInstances', Number(e.target.value))}
                    className="flex-grow h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                  <input 
                    type="number" 
                    min="0"
                    value={estimatorState.appInstances}
                    onChange={(e) => handleChange('appInstances', Number(e.target.value))}
                    className="w-16 bg-slate-800 border border-slate-600 rounded p-1 text-center text-sm text-white focus:border-pink-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  Metrics / Instance (Series)
                </label>
                <div className="flex items-center gap-2">
                    <input 
                      type="range" 
                      min="100" max="2000" step="50"
                      value={estimatorState.avgSeriesPerAppInstance}
                      onChange={(e) => handleChange('avgSeriesPerAppInstance', Number(e.target.value))}
                      className="flex-grow h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
                    />
                    <span className="text-xs text-pink-300 font-mono w-14 text-right">
                        {estimatorState.avgSeriesPerAppInstance}
                    </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  Daily Traces / Instance (GB)
                </label>
                <div className="flex items-center gap-2">
                    <input 
                      type="range" 
                      min="0" max="5" step="0.1"
                      value={estimatorState.avgDailyTracesPerAppInstanceGB}
                      onChange={(e) => handleChange('avgDailyTracesPerAppInstanceGB', Number(e.target.value))}
                      className="flex-grow h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
                    />
                    <span className="text-xs text-pink-300 font-mono w-14 text-right">
                        {estimatorState.avgDailyTracesPerAppInstanceGB.toFixed(1)} GB
                    </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-6 p-4 bg-indigo-900/20 border border-indigo-500/20 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
           <div className="flex flex-col">
             <span className="text-slate-400 text-xs flex items-center gap-1"><Activity size={12}/> Est. Series</span>
             <span className="text-indigo-200 font-mono text-lg">{Math.round(totalSeries).toLocaleString()}</span>
           </div>
           <div className="flex flex-col">
             <span className="text-slate-400 text-xs flex items-center gap-1"><HardDrive size={12}/> Est. Logs (GB)</span>
             <span className="text-indigo-200 font-mono text-lg">{Math.round(totalLogs).toLocaleString()}</span>
           </div>
            <div className="flex flex-col">
             <span className="text-slate-400 text-xs flex items-center gap-1"><FileText size={12}/> Est. Traces (GB)</span>
             <span className="text-indigo-200 font-mono text-lg">{Math.round(totalTraces).toLocaleString()}</span>
           </div>
           <div className="flex flex-col">
             <span className="text-slate-400 text-xs flex items-center gap-1"><Clock size={12}/> Est. Host Hours</span>
             <span className="text-indigo-200 font-mono text-lg">{Math.round(infraHostHours).toLocaleString()}</span>
           </div>
        </div>
      </div>
    </div>
  );
};