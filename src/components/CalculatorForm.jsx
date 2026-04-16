import React from 'react';
import { Info } from 'lucide-react';

const CalculatorForm = ({ z1Str, setZ1Str, z2Str, setZ2Str, operation, setOperation, n, setN, onCalculate }) => {
  const isTwoArg = ['add', 'sub', 'mul', 'div'].includes(operation);
  const isPowerOrRoot = ['pow', 'root'].includes(operation);

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Info size={20} className="text-blue-500" /> Dane wejściowe
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Liczba z₁ (np. sqrt(3) + i)</label>
          <input 
            type="text" 
            value={z1Str}
            placeholder="sqrt(3) + i"
            onChange={(e) => setZ1Str(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Operacja</label>
          <select 
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
          >
            <option value="add">Dodawanie (+)</option>
            <option value="sub">Odejmowanie (-)</option>
            <option value="mul">Mnożenie (*)</option>
            <option value="div">Dzielenie (/)</option>
            <option value="pow">Potęgowanie (zⁿ)</option>
            <option value="root">Pierwiastkowanie (ⁿ√z)</option>
          </select>
        </div>

        {isTwoArg && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Liczba z₂</label>
            <input 
              type="text" 
              value={z2Str}
              placeholder="2 - i"
              onChange={(e) => setZ2Str(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            />
          </div>
        )}

        {isPowerOrRoot && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Stopień n</label>
            <input 
              type="number" 
              value={n}
              onChange={(e) => setN(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            />
          </div>
        )}

        <button 
          onClick={onCalculate}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-bold"
        >
          OBLICZ
        </button>
      </div>
    </section>
  );
};

export default CalculatorForm;