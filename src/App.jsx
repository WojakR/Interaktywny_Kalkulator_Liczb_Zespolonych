import React, { useState, useEffect } from 'react';
import { 
  parseComplex, 
  calculateAddition, 
  calculateSubtraction, 
  calculateMultiplication, 
  calculateDivision, 
  calculatePower, 
  calculateRoots,
  formatAlgebraic 
} from './utils/complexMath';

// Import komponentów
import CalculatorForm from './components/CalculatorForm';
import ResultsPanel from './components/ResultsPanel';
import HistoryLog from './components/HistoryLog';
import GaussPlane from './components/GaussPlane';

// Import ikon
import { Calculator } from 'lucide-react';

function App() {
  // Stan wejść tekstowych
  const [z1Str, setZ1Str] = useState('');
  const [z2Str, setZ2Str] = useState('');
  const [operation, setOperation] = useState('add');
  const [n, setN] = useState(3);
  
  // Stan obiektów matematycznych (do wizualizacji)
  const [z1Obj, setZ1Obj] = useState(null);
  const [z2Obj, setZ2Obj] = useState(null);
  
  // Stan wyników i błędów
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  // Główna funkcja obliczeniowa
  const handleCalculate = () => {
    try {
      setError(null);
      
      // Parsowanie wejść
      const z1 = parseComplex(z1Str);
      let z2 = null;
      let res = [];

      // Wykonanie operacji
      switch (operation) {
        case 'add':
          z2 = parseComplex(z2Str);
          res = [calculateAddition(z1, z2)];
          break;
        case 'sub':
          z2 = parseComplex(z2Str);
          res = [calculateSubtraction(z1, z2)];
          break;
        case 'mul':
          z2 = parseComplex(z2Str);
          res = [calculateMultiplication(z1, z2)];
          break;
        case 'div':
          z2 = parseComplex(z2Str);
          if (z2.re === 0 && z2.im === 0) {
            throw new Error("Dzielenie przez zero jest niedozwolone.");
          }
          res = [calculateDivision(z1, z2)];
          break;
        case 'pow':
          res = [calculatePower(z1, n)];
          break;
        case 'root':
          res = calculateRoots(z1, n);
          break;
        default:
          break;
      }

      // Aktualizacja stanu obiektów do wykresu
      setZ1Obj(z1);
      setZ2Obj(z2);
      setResults(res);
      
      // Budowanie wpisu do historii
      const opSymbols = { add: '+', sub: '-', mul: '*', div: '/' };
      let entry = "";
      if (['pow', 'root'].includes(operation)) {
        entry = `${operation === 'pow' ? '(' + z1Str + ')^' + n : 'n=' + n + ' √(' + z1Str + ')'}`;
      } else {
        entry = `(${z1Str}) ${opSymbols[operation]} (${z2Str})`;
      }
      
      // Dodanie wyniku w postaci algebraicznej
      const resultStr = res.length === 1 ? formatAlgebraic(res[0]) : res.map(r => formatAlgebraic(r)).join(', ');
      entry += ` = ${resultStr}`;
      
      setHistory(prev => [entry, ...prev].slice(0, 10));
      
    } catch (err) {
      setError(err.message);
      // Nie czyścimy poprzednich obiektów, żeby wykres nie znikał przy błędzie wpisywania
    }
  };

  // Brak automatycznego uruchomienia przy starcie aplikacji
  // Użytkownik wykonuje obliczenia ręcznie przyciskiem

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* NAGŁÓWEK */}
      <header className="max-w-6xl mx-auto mb-8 text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center justify-center md:justify-start gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Calculator size={28} />
          </div>
          <span className="flex items-center">
            Zespolone<span className="text-blue-600">.edu</span>
          </span>
        </h1>
        <p className="text-slate-500 mt-2">
          Interaktywna platforma do nauki i wizualizacji liczb zespolonych
        </p>
      </header>

      {/* GŁÓWNA SEKCJA */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* KOLUMNA LEWA: Formularz i Historia (4/12) */}
        <div className="lg:col-span-4 space-y-6">
          <CalculatorForm 
            z1Str={z1Str} setZ1Str={setZ1Str}
            z2Str={z2Str} setZ2Str={setZ2Str}
            operation={operation} setOperation={setOperation}
            n={n} setN={setN}
            onCalculate={handleCalculate}
          />
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="hidden lg:block">
            <HistoryLog history={history} />
          </div>
        </div>

        {/* KOLUMNA PRAWA: Wykres i Wyniki (8/12) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Płaszczyzna Gaussa */}
          <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200">
            <GaussPlane 
              z1={z1Obj} 
              z2={z2Obj} 
              results={results} 
              operation={operation} 
            />
          </div>

          {/* Panel wyników */}
          <ResultsPanel results={results} />
          
          {/* Historia na mobilkach wyświetla się tutaj */}
          <div className="lg:hidden">
            <HistoryLog history={history} />
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-200 text-center text-slate-400 text-xs">
        Projekt Indywidualny: Kalkulator Liczb Zespolonych — Wojciech Regulski
      </footer>
    </div>
  );
}

export default App;