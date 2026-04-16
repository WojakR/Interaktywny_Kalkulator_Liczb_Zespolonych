import React from 'react';
import { formatAlgebraic, formatTrigonometric, formatExponential } from '../utils/complexMath';

const ResultsPanel = ({ results }) => {
  if (results.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold mb-4">Wyniki</h2>
      <div className="space-y-6">
        {results.map((res, idx) => (
          <div key={idx} className="p-4 bg-slate-50 rounded-lg border-l-4 border-blue-500 transition-all hover:bg-white hover:shadow-md">
            {results.length > 1 && <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Pierwiastek w{idx}</span>}
            <div className="grid md:grid-cols-3 gap-4 mt-2">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Postać Algebraiczna</p>
                <p className="font-mono font-bold text-slate-800">{formatAlgebraic(res)}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Postać Trygonometryczna</p>
                <p className="font-mono text-sm text-slate-700 break-words">{formatTrigonometric(res)}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Postać Wykładnicza</p>
                <p className="font-mono text-sm text-slate-700">{formatExponential(res)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPanel;