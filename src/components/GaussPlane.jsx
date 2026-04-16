import React, { useRef, useEffect } from 'react';

const GaussPlane = ({ z1, z2, results, operation }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // KLUCZOWA POPRAWKA: .current zamiast .ref
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Ustawienia wymiarów
    const size = 500;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    // 2. Przygotowanie danych (odfiltrowanie nullowych wartości)
    const allNumbers = [z1, z2, ...results].filter(n => n && typeof n.abs === 'function');
    
    // Obliczamy maksymalny moduł, żeby dobrać skalę (minimum 1, żeby nie dzielić przez 0)
    const maxMag = allNumbers.length > 0 
      ? Math.max(...allNumbers.map(n => n.abs())) 
      : 1;
    
    // Skala: zostawiamy 40px marginesu od krawędzi
    const scale = (size / 2 - 40) / Math.max(maxMag, 0.1);

    const centerX = size / 2;
    const centerY = size / 2;

    const toPx = (re, im) => ({
      x: centerX + re * scale,
      y: centerY - im * scale
    });

    // 3. RYSOWANIE
    ctx.clearRect(0, 0, size, size);

    // Tło siatki
    ctx.strokeStyle = '#f1f5f9';
    ctx.beginPath();
    for(let i = 0; i <= size; i += 50) {
      ctx.moveTo(i, 0); ctx.lineTo(i, size);
      ctx.moveTo(0, i); ctx.lineTo(size, i);
    }
    ctx.stroke();

    // Główne osie
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY); ctx.lineTo(size, centerY); // Oś Re
    ctx.moveTo(centerX, 0); ctx.lineTo(centerX, size); // Oś Im
    ctx.stroke();

    // Funkcja rysująca wektor
    const drawVector = (z, color, width = 2, label = '') => {
      if (!z) return;
      const pos = toPx(z.re, z.im);
      
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = width;

      // Linia
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();

      // Grot strzałki
      const angle = Math.atan2(centerY - pos.y, pos.x - centerX);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(pos.x - 12 * Math.cos(angle - Math.PI / 8), pos.y + 12 * Math.sin(angle - Math.PI / 8));
      ctx.lineTo(pos.x - 12 * Math.cos(angle + Math.PI / 8), pos.y + 12 * Math.sin(angle + Math.PI / 8));
      ctx.fill();

      // Podpis
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.fillText(label, pos.x + 8, pos.y - 8);
    };

    // 4. Rysowanie okręgu pomocniczego (dla pierwiastków lub potęg)
    if ((operation === 'root' || operation === 'pow') && z1) {
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = '#e2e8f0';
        const r = (operation === 'root' && results.length > 0 ? results[0].abs() : z1.abs()) * scale;
        ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    // 5. Wyświetlanie wektorów wejściowych (szare)
    if (z1) drawVector(z1, '#94a3b8', 1.5, 'z₁');
    if (z2 && ['add', 'sub', 'mul', 'div'].includes(operation)) {
      drawVector(z2, '#94a3b8', 1.5, 'z₂');
    }

    // 6. Wyświetlanie wyników (niebieskie)
    results.forEach((res, i) => {
      const label = results.length > 1 ? `w${i}` : 'Wynik';
      drawVector(res, '#2563eb', 3, label);
    });

  }, [z1, z2, results, operation]); // Reaguj na każdą zmianę danych

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white p-4">
      <div className="relative border border-slate-100 rounded-lg shadow-inner bg-slate-50">
        <canvas 
          ref={canvasRef} 
          className="max-w-full h-auto cursor-crosshair"
          style={{ touchAction: 'none' }}
        />
      </div>
      <div className="mt-4 flex gap-4 text-[10px] font-bold uppercase tracking-widest">
        <span className="flex items-center gap-1 text-slate-400">
          <span className="w-3 h-0.5 bg-slate-400"></span> Dane (z)
        </span>
        <span className="flex items-center gap-1 text-blue-600">
          <span className="w-3 h-1 bg-blue-600"></span> Wynik
        </span>
      </div>
    </div>
  );
};

export default GaussPlane;