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

1. Utwórz projekt na sanity.io
2. Uzupełnij `NEXT_PUBLIC_SANITY_PROJECT_ID` w `.env.local`
3. Uruchom `npm run dev` i wejdź na `/studio`

### Typy dokumentów CMS

| Typ | Opis |
|---|---|
| `page` | Strony ogólne z blokami sekcji |
| `post` | Artykuly / wiedza |
| `resource` | Zasoby do pobrania |
| `caseStudy` | Case Studies |
| `landingPage` | Landing pages z kampanii |
| `useCase` | Zastosowania |
| `industry` | Branze |
| `persona` | Persony / dla kogo |
| `faq` | FAQ |

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
