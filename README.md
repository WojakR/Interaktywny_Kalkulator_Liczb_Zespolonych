# Interaktywny Kalkulator Liczb Zespolonych 🧮

Edukacyjna aplikacja webowa stworzona w celu wizualizacji operacji matematycznych na liczbach zespolonych. Projekt pozwala na wykonywanie zaawansowanych obliczeń oraz dynamiczne renderowanie wyników na Płaszczyźnie Gaussa.

**Wersja demonstracyjna (Live):** [https://zespoloneedu.netlify.app](https://zespoloneedu.netlify.app)

## 👨‍🎓 Autor
* **Imię i Nazwisko:** Wojciech Regulski

## ✨ Funkcjonalności
* **Zaawansowane operacje:** Dodawanie, odejmowanie, mnożenie, dzielenie, potęgowanie oraz wyciąganie pierwiastków n-tego stopnia.
* **Rozbudowany parser:** Możliwość wprowadzania ułamków oraz pierwiastków jako części wejścia (np. `sqrt(3) + 2i`).
* **Trzy postaci liczby:** Automatyczna konwersja i wyświetlanie wyników w postaci algebraicznej, trygonometrycznej i wykładniczej.
* **Płaszczyzna Gaussa:** Dynamiczna wizualizacja wektorów za pomocą Canvas API z automatycznym skalowaniem osi. Posiada specjalny tryb rysowania równomiernie rozłożonych pierwiastków na okręgu.
* **Historia:** Sesyjny log operacji (ostatnie 10 działań).

## 🛠️ Stos Technologiczny
* **Frontend Framework:** React 18
* **Build Tool:** Vite
* **Logika matematyczna:** math.js (wersja 12+)
* **Wizualizacja:** Natywne HTML5 Canvas API
* **Stylizacja:** Tailwind CSS
* **Ikony:** Lucide React

## 🚀 Uruchomienie projektu

Aby uruchomić projekt na własnej maszynie, upewnij się, że posiadasz zainstalowane środowisko Node.js z oficjalnej strony. Następnie wykonaj poniższe kroki w terminalu:

**Krok 1:** Rozpakuj archiwum ZIP lub sklonuj projekt z repozytorium: `https://github.com/WojakR/Interaktywny_Kalkulator_Liczb_Zespolonych` i przejdź do głównego folderu projektu:
`cd Interaktywny_Kalkulator_Liczb_Zespolonych`

**Krok 2:** Zainstaluj wszystkie wymagane zależności (automatycznie utworzy się folder node_modules):
`npm install`

**Krok 3:** Uruchom deweloperski serwer lokalny:
`npm run dev`

**Krok 4:** Otwórz przeglądarkę i wejdź pod adres wygenerowany w terminalu (zazwyczaj jest to `http://localhost:5173/`).