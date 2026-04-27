# SpendGuru — strona www

Strona marketingowa SpendGuru (Profitia). Negotiation Intelligence dla zespołów zakupowych.

**Środowisko:** Profitia (git, GitHub, Vercel, OpenAI — konto Profitia)
**Git remote:** `git@github-profitia:profitia/spendguru-www.git` (SSH alias z `~/.ssh/config`)

---

## Stack technologiczny

- **Next.js 16** — App Router, TypeScript strict
- **Tailwind CSS v4**
- **Sanity CMS** — content-first, Studio pod `/studio`
- **Zod** — walidacja formularzy
- **Vercel** — hosting i CI/CD

---

## Uruchomienie lokalne

```bash
# 1. Sklonuj repozytorium
git clone git@github-profitia:profitia/spendguru-www.git
cd spendguru-www

# 2. Zainstaluj zależności
npm install

# 3. Skopiuj zmienne środowiskowe
cp .env.example .env.local
# Uzupełnij wartości w .env.local

# 4. Uruchom dev server
npm run dev
```

Strona: http://localhost:3000
Sanity Studio: http://localhost:3000/studio

---

## Zmienne środowiskowe

Plik `.env.local` (nie commituj — jest w `.gitignore`):

| Zmienna | Opis |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID projektu Sanity (z sanity.io/manage) |
| `NEXT_PUBLIC_SANITY_DATASET` | Domyślnie `production` |
| `SANITY_API_READ_TOKEN` | Token do odczytu danych z Sanity (opcjonalny dla publicznych) |
| `NEXT_PUBLIC_SITE_URL` | Docelowy URL strony (np. `https://spendguru.pl`) |
| `OPENAI_API_KEY` | Klucz OpenAI — konto Profitia |

---

## Skrypty npm

```bash
npm run dev          # Dev server (localhost:3000)
npm run build        # Build produkcyjny
npm run start        # Start po buildzie
npm run lint         # ESLint
npm run typecheck    # TypeScript check (tsc --noEmit)
```

---

## Struktura katalogów

```
src/
├── app/
│   ├── (site)/              # Route group — layout z Header/Footer
│   │   ├── page.tsx         # Strona główna
│   │   ├── jak-to-dziala/
│   │   ├── etapy-przygotowania-negocjacji/
│   │   ├── zastosowania/
│   │   ├── dla-kogo/
│   │   ├── branze/
│   │   ├── wiedza/          # Blog + [slug]
│   │   ├── o-profitii-i-spendguru/
│   │   └── umow-bezplatne-wsparcie-negocjacji/
│   ├── api/
│   │   └── contact/route.ts # Endpoint formularza (placeholder — bez wysyłki)
│   ├── studio/[[...tool]]/  # Sanity Studio (embedded)
│   ├── layout.tsx           # Root layout
│   └── globals.css
│
├── components/
│   ├── layout/              # Header, Footer, MobileNav, Container
│   ├── sections/            # HeroSection, ProblemSection, ProcessSection...
│   └── ui/                  # Button, Card, Badge, SectionHeader, FormField...
│
├── sanity/
│   ├── lib/                 # client.ts, image.ts, queries.ts
│   ├── schemas/             # Wszystkie schematy Sanity CMS
│   └── types/               # sanity.types.ts
│
├── lib/                     # seo.ts, routes.ts, utils.ts, constants.ts, validations.ts
├── data/                    # navigation.ts, placeholder-content.ts
└── styles/
    └── tokens.css           # Design tokens (placeholder)
```

---

## Konfiguracja Sanity CMS

### Pierwsze uruchomienie Studio

1. Zaloguj się lub utwórz konto na [sanity.io](https://sanity.io)
2. Utwórz nowy projekt lub użyj istniejącego (`1me4kdi5`)
3. Uzupełnij `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=1me4kdi5
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
4. Uruchom `npm run dev`
5. Otwórz **http://localhost:3000/studio**
6. Zaloguj się kontem Sanity (google lub email)
7. W panelu Sanity (`manage.sanity.io`) dodaj CORS origin:
   - `http://localhost:3000` (dev)
   - `https://spendguru-website.onrender.com` (produkcja)
   - `https://spendguru.pl` (docelowo)

### Typy dokumentów

| Typ | Opis | Gotowy do użycia |
|---|---|---|
| `page` | Strony ogólne — bloki sekcji + SEO + język | ✅ |
| `post` | Artykuły / baza wiedzy | ✅ |
| `resource` | Zasoby do pobrania (PDF, whitepaper) | ✅ |
| `caseStudy` | Case Studies | ✅ |
| `landingPage` | Landing pages z kampanii | ✅ |
| `useCase` | Zastosowania SpendGuru | ✅ |
| `industry` | Branże (retail, produkcja…) | ✅ |
| `persona` | Persony / Dla kogo | ✅ |
| `faq` | Pytania i odpowiedzi | ✅ |

### Bloki sekcji (page builder)

Strony budowane są z gotowych bloków. Każda strona typu `page` lub `landingPage` ma pole `Sekcje strony`.

| Blok | Odpowiada sekcji na stronie głównej |
|---|---|
| `Hero` | HeroSection |
| `Proof Bar (loga/liczby)` | ProofBar |
| `Problem` | ProblemSection |
| `5 pytań przed negocjacjami` | FiveQuestionsSection ✨ |
| `Proces` | ProcessSection |
| `Efekty biznesowe` | BusinessOutcomesSection ✨ |
| `Dla kogo` | PersonaSection |
| `Przykład z praktyki (historia)` | UseCaseSection ✨ |
| `FAQ` | FaqSection |
| `CTA Section` | CtaSection |
| `Etapy przygotowania` | Podstrona /etapy |
| `Zastosowania` | Siatka use cases |
| `Branże` | Siatka branż |
| `Siatka zasobów` | Siatka artykułów |
| `Formularz` | ContactForm |

✨ — bloki dodane w Phase 2

### SEO

Każdy dokument `page`, `post`, `caseStudy`, `landingPage` posiada pole SEO:

| Pole | Opis |
|---|---|
| Meta Title | Tytuł w wynikach wyszukiwania |
| Meta Description | Opis w wynikach (max 160 znaków) |
| Canonical URL | Kanoniczny URL |
| OG Title | Tytuł dla social media |
| OG Description | Opis dla social media |
| OG Image | Grafika dla social media |
| No Index | Ukryj przed wyszukiwarkami |

### Wielojęzyczność (PL/EN)

Dokument `page` ma pole `Język` (pl/en). Routing i18n na poziomie frontendu — do zaimplementowania w kolejnym etapie.

---

## Seedowanie danych (Sanity)

Skrypt `scripts/seed-sanity-home.mjs` załaduje pierwszą treść do Sanity: stronę główną ze wszystkimi sekcjami, personami i FAQ.

### 1. Wygeneruj token do zapisu

1. Otwórz [sanity.io/manage](https://sanity.io/manage)
2. Wybierz projekt SpendGuru (`1me4kdi5`)
3. Przejdź do: **API → Tokens → Add API token**
4. Nazwa: np. `seed-local`, uprawnienia: **Editor**
5. Skopiuj token

### 2. Dodaj token do .env.local

```bash
# .env.local
SANITY_API_WRITE_TOKEN=sk...twój_token_tutaj
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 3. Uruchom seed

```bash
# Podgląd bez zapisu (bezpieczne)
npm run seed:sanity:home:dry

# Pierwsze uruchomienie — tworzy dokumenty
npm run seed:sanity:home

# Nadpisanie istniejących dokumentów
npm run seed:sanity:home:force
```

### 4. Sprawdź wynik w Studio

- Lokalne: http://localhost:3000/studio
- Produkcja: https://spendguru-website.onrender.com/studio

Przejdź do **Strony** — powinien pojawić się dokument `Strona główna` ze wszystkimi sekcjami.
Przejdź do **Persona / Dla kogo** — 5 person.
Przejdź do **FAQ** — 5 pytań z kontekstem `ogolny`.

### Idempotentność

Skrypt jest bezpieczny przy wielokrotnym uruchomieniu:
- Bez flag: pomija dokumenty, które już istnieją (wyświetla ⏭)
- Z `--force`: zastępuje istniejące (`createOrReplace`)
- Z `--dry-run`: wyświetla co zostałoby zapisane, nic nie zmienia

---

## Deploy na Vercel

1. Podlacz repo z GitHub (konto Profitia)
2. Ustaw zmienne srodowiskowe w Vercel Dashboard
3. Framework preset: Next.js
4. Deploy branch: main

---

## Elementy placeholder

- Tresci sekcji — dane statyczne z `src/data/placeholder-content.ts`
- `/api/contact` — waliduje dane, loguje do konsoli, nie wysyla emaila
- Design tokens — neutralna paleta B2B, do nadpisania przy benchmarkach wizualnych

---

## Decyzje architektoniczne

- Route group `(site)` — wspolny layout bez wplywu na URL
- Sanity embedded Studio — CMS pod `/studio` w tym samym projekcie
- Design tokens w CSS — jedna warstwa zmiany dla calego systemu
- Placeholder content — strona dziala bez Sanity, docelowo 100% CMS
- Zod walidacja — wspolny schemat frontend + API route
- Przygotowanie pod i18n — `language` w modelu Page, routing do dodania

---

## Nastepne kroki

1. Podlaczyc repo do GitHub (konto Profitia) i Vercel
2. Skonfigurowac projekt Sanity i uzupelnic `.env.local`
3. Dodac pierwsze tresci w CMS
4. Przekazac benchmarki wizualne — nadpisac `tokens.css` i ostylowac komponenty
5. Zintegrowac `/api/contact` z Office365 Profitia (Microsoft Graph API)
6. Dodac integracje z Calendly dla CTA
7. Dodac wersje EN (routing i18n, tlumaczenia w CMS)
8. Dodac PortableText renderer dla tresci blokowych
