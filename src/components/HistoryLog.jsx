import React from 'react';
import { History } from 'lucide-react';

const HistoryLog = ({ history }) => {
  return (
    <footer className="max-w-6xl mx-auto mt-8">
      <div className="bg-slate-800 text-slate-300 p-6 rounded-xl shadow-lg border border-slate-700">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <History size={20} className="text-blue-400" /> Ostatnie operacje
        </h2>
        <ul className="space-y-1 text-sm font-mono max-h-40 overflow-y-auto pr-2 custom-scrollbar">
          {history.map((item, i) => (
            <li key={i} className="border-b border-slate-700/50 py-1 opacity-80 hover:opacity-100 flex gap-2">
              <span className="text-blue-500">[{history.length - i}]</span>
              <span>{item}</span>
            </li>
          ))}
          {history.length === 0 && <li className="italic opacity-50">Brak wpisów w historii sesji</li>}
        </ul>
      </div>
    </footer>
  );
};

export default HistoryLog;