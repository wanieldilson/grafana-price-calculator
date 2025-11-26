import React from 'react';
import { PricingItem } from '../types';

interface InputSectionProps {
  item: PricingItem;
  value: number;
  onChange: (val: number) => void;
  max?: number;
  step?: number;
}

export const InputSection: React.FC<InputSectionProps> = ({ item, value, onChange, max = 10000, step }) => {
  // Use fixed max to prevent feedback loops during dragging.
  const sliderMax = max;

  // Helper to format unit price with up to 4 decimal places if needed (e.g. $0.001)
  const formatUnitPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    });
  };

  return (
    <div className="mb-6 p-4 bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-medium text-orange-500">{item.name}</h3>
          <p className="text-xs text-slate-400">{item.description}</p>
        </div>
        <div className="text-right">
          <span className="text-sm font-semibold text-slate-300">
            {item.included.toLocaleString()} {item.unit} included
          </span>
          <div className="text-xs text-slate-500">
            ${formatUnitPrice(item.pricePerUnit)} / {item.unitStep === 1 ? '' : `${item.unitStep.toLocaleString()} `}{item.unit}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <div className="flex-grow">
          <input
            type="range"
            min="0"
            max={sliderMax}
            step={step || item.unitStep}
            // Clamp value to max for the slider visual to prevent it from breaking out if manual input is higher
            value={Math.min(value, sliderMax)}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>
        <div className="flex-shrink-0 w-32">
          <input
            type="number"
            min="0"
            value={value}
            onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-right text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>
      
      <div className="mt-1 flex justify-between text-xs text-slate-500">
        <span>0</span>
        <span>{sliderMax.toLocaleString()}</span>
      </div>
    </div>
  );
};
