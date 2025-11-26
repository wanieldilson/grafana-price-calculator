import React from 'react';
import { PricingItem } from '../types';
import { Minus, Plus } from 'lucide-react';

interface CounterInputProps {
  item: PricingItem;
  value: number;
  onChange: (val: number) => void;
}

export const CounterInput: React.FC<CounterInputProps> = ({ item, value, onChange }) => {
  const handleDecrement = () => onChange(Math.max(0, value - 1));
  const handleIncrement = () => onChange(value + 1);

  // Helper to format unit price
  const formatUnitPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col gap-3 h-full justify-between hover:border-slate-600 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-md font-medium text-purple-400">{item.name}</h3>
          <p className="text-xs text-slate-400 mt-1">{item.description}</p>
        </div>
        <div className="text-right flex-shrink-0 ml-2">
          <div className="text-xs text-slate-500 whitespace-nowrap">
            {item.included} included
          </div>
          <div className="text-xs font-semibold text-slate-300 whitespace-nowrap">
            ${formatUnitPrice(item.pricePerUnit)} / user
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-slate-900/50 p-2 rounded-lg border border-slate-700/50 w-full justify-between mt-2">
        <button
          onClick={handleDecrement}
          className="w-10 h-10 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-600 active:scale-95"
          aria-label="Decrease count"
        >
          <Minus size={18} />
        </button>
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
          className="bg-transparent text-center text-2xl font-bold text-white w-full outline-none appearance-none"
        />
        <button
          onClick={handleIncrement}
          className="w-10 h-10 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-600 active:scale-95"
          aria-label="Increase count"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
};
