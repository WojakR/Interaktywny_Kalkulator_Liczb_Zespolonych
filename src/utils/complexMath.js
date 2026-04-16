import { evaluate, complex, round, pow, add, subtract, multiply, divide } from 'mathjs';

// --- FUNKCJE POMOCNICZE ---

// Zaokrąglanie, aby uniknąć dziwnych wyników np. 1.0000000000000002i
const precision = 4;
const roundCplx = (val) => round(val, precision);

/**
 * Bezpiecznie ewaluuje ciąg znaków do obiektu liczby zespolonej.
 * Obsługuje wpisy typu "sqrt(3) + 2i", "4", "5i" itp.
 */
export const parseComplex = (expression) => {
  try {
    const result = evaluate(expression);
    // Upewniamy się, że wynik zawsze jest traktowany jako liczba zespolona
    return complex(result);
  } catch (error) {
    throw new Error("Błąd składni. Sprawdź poprawność wpisanego wyrażenia.");
  }
};

// --- GŁÓWNE OPERACJE MATEMATYCZNE ---

export const calculateAddition = (z1, z2) => add(z1, z2);
export const calculateSubtraction = (z1, z2) => subtract(z1, z2);
export const calculateMultiplication = (z1, z2) => multiply(z1, z2);
export const calculateDivision = (z1, z2) => divide(z1, z2);
export const calculatePower = (z, n) => pow(z, n);

/**
 * Wyciąganie pierwiastka n-tego stopnia z liczby zespolonej.
 * Zwraca tablicę n liczb zespolonych.
 */
export const calculateRoots = (z, n) => {
  if (n <= 0 || !Number.isInteger(n)) {
    throw new Error("Stopień pierwiastka musi być liczbą całkowitą dodatnią.");
  }
  
  const roots = [];
  const r = z.toPolar().r;     // moduł
  const phi = z.toPolar().phi; // argument (w radianach)
  
  const rootR = Math.pow(r, 1 / n);

  for (let k = 0; k < n; k++) {
    const angle = (phi + 2 * Math.PI * k) / n;
    // Tworzymy nową liczbę z postaci biegunowej (r, phi)
    roots.push(complex({ r: rootR, phi: angle }));
  }
  
  return roots;
};

// --- FORMATOWANIE DO RÓŻNYCH POSTACI ---

/**
 * Zwraca postać algebraiczną: a + bi
 */
export const formatAlgebraic = (z) => {
  const re = roundCplx(z.re);
  const im = roundCplx(z.im);
  
  if (re === 0 && im === 0) return "0";
  if (re === 0) return `${im}i`;
  if (im === 0) return `${re}`;
  
  const sign = im > 0 ? "+" : "-";
  return `${re} ${sign} ${Math.abs(im)}i`;
};

/**
 * Zwraca postać trygonometryczną: r(cos(φ) + i sin(φ))
 */
export const formatTrigonometric = (z) => {
  const polar = z.toPolar();
  const r = roundCplx(polar.r);
  let phi = roundCplx(polar.phi); // Zwraca w radianach

  // Math.js czasem zwraca ujemne radiany, ładniej wygląda gdy jest od 0 do 2PI
  if (phi < 0) phi += 2 * Math.PI;
  phi = roundCplx(phi);

  if (r === 0) return "0";
  
  return `${r}(cos(${phi}) + i sin(${phi}))`;
};

/**
 * Zwraca postać wykładniczą: r * e^(iφ)
 */
export const formatExponential = (z) => {
  const polar = z.toPolar();
  const r = roundCplx(polar.r);
  let phi = roundCplx(polar.phi);

  if (phi < 0) phi += 2 * Math.PI;
  phi = roundCplx(phi);

  if (r === 0) return "0";
  
  return `${r}e^(i${phi})`;
};