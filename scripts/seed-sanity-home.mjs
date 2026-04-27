#!/usr/bin/env node
/**
 * seed-sanity-home.mjs
 * Seeduje Sanity CMS treściami strony głównej SpendGuru.
 * Dane źródłowe: src/data/placeholder-content.ts
 *
 * Uruchomienie:
 *   node --env-file=.env.local scripts/seed-sanity-home.mjs
 *   node --env-file=.env.local scripts/seed-sanity-home.mjs --dry-run
 *   node --env-file=.env.local scripts/seed-sanity-home.mjs --force
 *
 * Flagi:
 *   --dry-run  Wyświetla co zostałoby utworzone, nie zapisuje nic
 *   --force    Zastępuje istniejące dokumenty (createOrReplace)
 */

import { createClient } from 'next-sanity'

// ─── KONFIGURACJA ──────────────────────────────────────────────────────────

const DRY_RUN = process.argv.includes('--dry-run')
const FORCE = process.argv.includes('--force')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId) {
  console.error('❌  Brak NEXT_PUBLIC_SANITY_PROJECT_ID')
  console.error('    Uzupełnij .env.local i spróbuj ponownie.')
  process.exit(1)
}

if (!token && !DRY_RUN) {
  console.error('❌  Brak SANITY_API_WRITE_TOKEN')
  console.error('    Wygeneruj token na: https://sanity.io/manage → projekt → API → Tokens')
  console.error('    Wymagane uprawnienia: Editor (lub Administrator)')
  console.error('    Wklej token do .env.local jako SANITY_API_WRITE_TOKEN=...')
  console.error()
  console.error('    Aby tylko sprawdzić dane bez zapisu: dodaj flagę --dry-run')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: token || 'dry-run-placeholder',
  useCdn: false,
})

// ─── HELPERS ───────────────────────────────────────────────────────────────

/** Generuje krótki losowy _key dla elementów tablic Sanity */
function randomKey(prefix = 'k') {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

/** Tworzy pojedynczy blok PortableText z tekstu */
function ptBlock(text, style = 'normal') {
  return {
    _type: 'block',
    _key: randomKey('b'),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: randomKey('s'), text, marks: [] }],
  }
}

/** Zamienia string na tablicę bloków PortableText */
function toPortableText(text) {
  return [ptBlock(text)]
}

/**
 * Tworzy lub aktualizuje dokument w Sanity.
 * Idempotentne: sprawdza istnienie przed zapisem.
 * Z flagą --force zastępuje istniejący dokument.
 */
async function upsert(doc, label) {
  if (DRY_RUN) {
    console.log(`[DRY RUN] ${label}`)
    console.log(`          _id: ${doc._id}, _type: ${doc._type}`)
    return
  }

  const existing = await client.getDocument(doc._id)

  if (existing && !FORCE) {
    console.log(`⏭  Pominięto (już istnieje): ${label}`)
    console.log(`   Użyj --force aby zastąpić istniejący dokument.`)
    return
  }

  await client.createOrReplace(doc)
  console.log(`${existing ? '♻️  Zaktualizowano' : '✅ Utworzono'}: ${label} (${doc._id})`)
}

// ─── DANE: PERSONY ─────────────────────────────────────────────────────────

const personas = [
  {
    _id: 'persona-cpo',
    _type: 'persona',
    title: 'Dyrektor Zakupów',
    slug: { _type: 'slug', current: 'dyrektor-zakupow' },
    role: 'CPO / Procurement Director',
    description:
      'Odpowiada za wyniki całego działu zakupów. Potrzebuje powtarzalnego standardu pracy negocjacyjnej i widoczności wyników wobec zarządu.',
    painPoints: [
      'Brak porównywalnych benchmarków rynkowych przed negocjacjami',
      'Nieuzasadnione podwyżki trudne do obrony bez danych',
      'Wyniki negocjacji zależą od indywidualnego kupca, nie od procesu',
    ],
    benefits: [],
  },
  {
    _id: 'persona-category-manager',
    _type: 'persona',
    title: 'Kupiec / Category Manager',
    slug: { _type: 'slug', current: 'kupiec-category-manager' },
    role: 'Buyer / Senior Buyer / Category Manager',
    description:
      'Prowadzi negocjacje w konkretnych kategoriach. Potrzebuje szybkiego dostępu do danych rynkowych i wsparcia eksperckiego.',
    painPoints: [
      'Dostawca zawsze przychodzi lepiej przygotowany',
      'Brak aktualnych benchmarków cenowych dla danej kategorii',
      'Presja terminów bez czasu na pełną analizę',
    ],
    benefits: [],
  },
  {
    _id: 'persona-cfo',
    _type: 'persona',
    title: 'CFO / Dyrektor Finansowy',
    slug: { _type: 'slug', current: 'cfo-dyrektor-finansowy' },
    role: 'CFO / Finance Director',
    description:
      'Odpowiada za budżet i rentowność. Chce widzieć, że zakupy bronią marży i ograniczają nieuzasadnione podwyżki kosztów.',
    painPoints: [
      'Brak transparentności wyników negocjacji zakupowych',
      'Trudno ocenić, czy dział zakupów osiąga dobre wyniki rynkowe',
      'Podwyżki od dostawców wpływają bezpośrednio na marżę i wynik',
    ],
    benefits: [],
  },
  {
    _id: 'persona-zarzad',
    _type: 'persona',
    title: 'Zarząd / Właściciel',
    slug: { _type: 'slug', current: 'zarzad-wlasciciel' },
    role: 'CEO / Owner / Managing Director',
    description:
      'Odpowiada za rentowność i wzrost firmy. Chce mieć pewność, że koszty zakupowe nie erodują marży i że firma jest konkurencyjnie pozycjonowana.',
    painPoints: [
      'Brak pewności, że negocjacje zakupowe chronią marżę',
      'Trudno porównać efektywność zakupową z rynkiem',
      'Podwyżki kosztów podważają planowane wyniki finansowe',
    ],
    benefits: [],
  },
  {
    _id: 'persona-finanse',
    _type: 'persona',
    title: 'Controlling / Finanse',
    slug: { _type: 'slug', current: 'controlling-finanse' },
    role: 'Controller / Head of Finance',
    description:
      'Monitoruje koszty i budżety. Potrzebuje uzasadnienia dla odchyleń kosztowych i narzędzi do obrony budżetu w obliczu podwyżek dostawców.',
    painPoints: [
      'Odchylenia kosztowe trudne do wyjaśnienia bez benchmarków',
      'Brak danych rynkowych do walidacji żądań dostawców',
      'Podwyżki zakupowe niekontrolowane na etapie planowania',
    ],
    benefits: [],
  },
]

// ─── DANE: FAQ ─────────────────────────────────────────────────────────────

const faqs = [
  {
    _id: 'faq-1-czym-rozni-sie',
    _type: 'faq',
    question: 'Czym różni się SpendGuru od systemu BI lub dashboardu zakupowego?',
    answer: toPortableText(
      'SpendGuru nie jest narzędziem do raportowania historii zakupowej. To Negotiation Intelligence - skupiamy się na przygotowaniu do konkretnych negocjacji z dostawcami. Dane, analizy i eksperci Profitii - w jednym miejscu, przed każdą ważną rozmową.',
    ),
    context: 'ogolny',
    order: 1,
  },
  {
    _id: 'faq-2-saas-czy-consulting',
    _type: 'faq',
    question: 'Czy SpendGuru to platforma SaaS, czy usługa konsultingowa?',
    answer: toPortableText(
      'SpendGuru łączy oba podejścia. Dostęp do danych, benchmarków i prognoz w formie platformy, wzbogacony o eksperckie wsparcie analityków i konsultantów Profitii. Nie kupujesz samego oprogramowania - kupujesz gotowość negocjacyjną.',
    ),
    context: 'ogolny',
    order: 2,
  },
  {
    _id: 'faq-3-kategorie',
    _type: 'faq',
    question: 'Dla jakich kategorii zakupowych działa SpendGuru?',
    answer: toPortableText(
      'SpendGuru obejmuje ponad 100 kategorii kosztowych - od surowców i opakowań, przez usługi logistyczne, energię i media, po kategorie produkcyjne i MRO. Zapytaj o swoją konkretną kategorię.',
    ),
    context: 'ogolny',
    order: 3,
  },
  {
    _id: 'faq-4-czas-przygotowania',
    _type: 'faq',
    question: 'Jak szybko można uzyskać wsparcie dla konkretnej negocjacji?',
    answer: toPortableText(
      'Czas przygotowania zależy od złożoności kategorii i zakresu analizy. Skontaktuj się z nami, żeby omówić Twój konkretny przypadek.',
    ),
    context: 'ogolny',
    order: 4,
  },
  {
    _id: 'faq-5-male-dzialy',
    _type: 'faq',
    question: 'Czy SpendGuru działa dla małych działów zakupów?',
    answer: toPortableText(
      'Tak. SpendGuru jest zaprojektowany zarówno dla dużych organizacji z rozbudowanymi działami zakupów, jak i dla mniejszych zespołów, które nie mają dedykowanych analityków rynkowych.',
    ),
    context: 'ogolny',
    order: 5,
  },
]

// ─── DANE: STRONA GŁÓWNA — SEKCJE ─────────────────────────────────────────

const homeSections = [
  // 1. HERO
  {
    _type: 'heroBlock',
    _key: 'section-hero',
    heading: 'Lepsze przygotowanie. Lepsze negocjacje. Lepszy wynik.',
    subheading:
      'SpendGuru pomaga zespołom zakupowym lepiej przygotować negocjacje z dostawcami - dzięki połączeniu danych kosztowych, benchmarków, prognoz, analizy dostawców i doświadczenia ekspertów Profitii.',
    ctaPrimary: 'Umów bezpłatne wsparcie negocjacji',
    ctaPrimaryUrl: '/umow-bezplatne-wsparcie-negocjacji',
    ctaSecondary: 'Zobacz, jak to działa',
    ctaSecondaryUrl: '/jak-to-dziala',
  },

  // 2. PROOF BAR
  {
    _type: 'proofBarBlock',
    _key: 'section-proof-bar',
    label: 'SpendGuru w liczbach',
    items: [
      { _key: 'pb-1', value: '100+', label: 'kategorii kosztowych' },
      { _key: 'pb-2', value: '300 mln+', label: 'rekordów danych rynkowych' },
      { _key: 'pb-3', value: '13%', label: 'średnie oszczędności r/r' },
      { _key: 'pb-4', value: '85%+', label: 'trafność prognoz Crystal Ball' },
    ],
  },

  // 3. PROBLEM
  {
    _type: 'problemBlock',
    _key: 'section-problem',
    heading: 'Dlaczego negocjacje zakupowe są dziś trudniejsze niż kiedykolwiek?',
    subheading:
      'Dostawcy mają coraz więcej danych o swoich kosztach, marżach i sytuacji rynkowej. Większość zespołów zakupowych idzie na negocjacje bez równoważnego przygotowania.',
    cards: [
      {
        _key: 'card-1',
        title: 'Dostawca jest lepiej przygotowany',
        description:
          'Dostawca zna swoje koszty produkcji, marżę i alternatywy dla Twojego biznesu. Kupiec często dysponuje tylko historią zamówień.',
      },
      {
        _key: 'card-2',
        title: 'Podwyżki trudne do zakwestionowania bez danych',
        description:
          'Bez benchmarków rynkowych i analizy struktury kosztowej każda podwyżka brzmi jak "obiektywna konieczność".',
      },
      {
        _key: 'card-3',
        title: 'Warunki rynkowe zmieniają się szybciej',
        description:
          'Surowce, energia, logistyka - ceny zmieniają się co kwartał. Bez aktualnych prognoz nie wiesz, kiedy i jak mocno negocjować.',
      },
      {
        _key: 'card-4',
        title: 'Brak powtarzalnego standardu przygotowania',
        description:
          'Jakość negocjacji zależy od doświadczenia konkretnego kupca. Nie ma procesu, który można skalować w całym dziale.',
      },
    ],
  },

  // 4. 5 PYTAŃ
  {
    _type: 'fiveQuestionsBlock',
    _key: 'section-five-questions',
    heading: '5 pytań, na które Twój zespół powinien umieć odpowiedzieć przed każdą negocjacją',
    subheading:
      'Jeśli nie znasz odpowiedzi na te pytania, idziesz na negocjacje nieprzygotowany. SpendGuru pomaga znaleźć odpowiedzi szybko i w oparciu o dane.',
    questions: [
      {
        _key: 'q-1',
        number: 1,
        question: 'Jakie są realne koszty i cost drivery w tej kategorii?',
        context: 'Surowce, robocizna, energia, marża - co napędza cenę tego dostawcy?',
      },
      {
        _key: 'q-2',
        number: 2,
        question: 'Dokąd zmierza rynek w horyzoncie 3-12 miesięcy?',
        context: 'Czy warunki będą korzystniejsze za kwartał? Kiedy jest najlepszy moment na negocjacje?',
      },
      {
        _key: 'q-3',
        number: 3,
        question: 'Jaka jest pozycja i kondycja tego dostawcy?',
        context:
          'Jak bardzo zależy mu na tym kontrakcie? Czy ma nadwyżki mocy? Jakie ma alternatywne rynki?',
      },
      {
        _key: 'q-4',
        number: 4,
        question: 'Jakie są benchmarki rynkowe dla tej kategorii?',
        context:
          'Czy płacę więcej niż rynek? O ile? Na jakim argumencie mogę oprzeć roszczenie cenowe?',
      },
      {
        _key: 'q-5',
        number: 5,
        question: 'Jakie sygnały rynkowe i newsy mogą wpłynąć na rozmowę?',
        context:
          'Co nowego wydarzyło się w tej branży, co zmienia kontekst negocjacji?',
      },
    ],
  },

  // 5. PROCES
  {
    _type: 'processBlock',
    _key: 'section-process',
    heading: 'Jak SpendGuru pomaga przygotować negocjacje',
    steps: [
      {
        _key: 'step-1',
        number: 1,
        title: 'Poznaj koszt i cost drivery',
        description:
          'Rozkładamy strukturę kosztową kategorii na czynniki pierwsze. Wiesz, co napędza cenę i gdzie leży rzeczywisty margines dostawcy.',
      },
      {
        _key: 'step-2',
        number: 2,
        title: 'Zobacz, dokąd zmierza rynek',
        description:
          'Prognozy cen surowców, energii i usług logistycznych w horyzoncie 3-12 miesięcy. Wiesz, kiedy negocjować i z jaką siłą.',
      },
      {
        _key: 'step-3',
        number: 3,
        title: 'Oceń dostawcę i jego pozycję',
        description:
          'Analiza kondycji finansowej, zależności od Twojego kontraktu, dostępnych alternatyw i historii relacji z rynkiem.',
      },
      {
        _key: 'step-4',
        number: 4,
        title: 'Śledź sygnały rynkowe i newsy',
        description:
          'Informacje branżowe, zmiany regulacyjne i zdarzenia rynkowe, które mogą zmienić kontekst rozmowy z dostawcą.',
      },
      {
        _key: 'step-5',
        number: 5,
        title: 'Szybciej interpretuj dane',
        description:
          'Eksperci Profitii pomagają zrozumieć dane i wyciągnąć wnioski negocjacyjne - bez konieczności budowania wewnętrznego zespołu analityków.',
      },
      {
        _key: 'step-6',
        number: 6,
        title: 'Zamień analizę w plan rozmowy',
        description:
          'Gotowy brief negocjacyjny: argumenty, BATNA, punkty otwarcia i granice - zanim wejdziesz do sali.',
      },
    ],
  },

  // 6. EFEKTY BIZNESOWE
  {
    _type: 'businessOutcomesBlock',
    _key: 'section-business-outcomes',
    heading: 'Co zyskuje Twój dział zakupów',
    outcomes: [
      {
        _key: 'outcome-1',
        title: 'Niższe koszty zakupowe',
        description:
          'Lepsze przygotowanie przekłada się na lepszy wynik negocjacyjny. Oszczędności wynikają z wiedzy, nie ze szczęścia.',
        metric: null,
      },
      {
        _key: 'outcome-2',
        title: 'Ochrona marży przed podwyżkami',
        description:
          'Dane kosztowe i benchmarki pozwalają skutecznie kwestionować podwyżki i negocjować warunki wieloletnie.',
        metric: null,
      },
      {
        _key: 'outcome-3',
        title: 'Powtarzalny standard pracy',
        description:
          'Proces przygotowania negocjacji nie zależy od doświadczenia jednego kupca. Możesz go skalować w całym dziale.',
        metric: null,
      },
      {
        _key: 'outcome-4',
        title: 'Skrócenie czasu przygotowania',
        description:
          'Zamiast tygodni researchu - gotowa analiza w ciągu dni. Eksperckie wsparcie Profitii skraca czas dojścia do wniosków.',
        metric: null,
      },
    ],
  },

  // 7. PERSONY (referencje do dokumentów persona)
  {
    _type: 'personaBlock',
    _key: 'section-personas',
    heading: 'Dla kogo jest SpendGuru',
    personas: [
      { _type: 'reference', _ref: 'persona-cpo', _key: 'ref-cpo' },
      { _type: 'reference', _ref: 'persona-category-manager', _key: 'ref-cm' },
      { _type: 'reference', _ref: 'persona-cfo', _key: 'ref-cfo' },
    ],
  },

  // 8. USE CASE (historia z praktyki)
  {
    _type: 'useCaseStoryBlock',
    _key: 'section-use-case',
    label: 'Przykład z praktyki',
    heading: 'Jak dział zakupów sieci retail przygotował negocjacje roczne z dostawcą opakowań',
    context:
      'Dostawca zapowiedział podwyżkę o 12% argumentując wzrostem kosztów surowców. Dział zakupów miał 3 tygodnie do rundy negocjacyjnej.',
    steps: [
      'Analiza struktury kosztowej opakowań kartonowych (surowce, energia, konwersja)',
      'Prognoza cen celulozy i energii na kolejne 2 kwartały',
      'Ocena kondycji finansowej dostawcy i jego zależności od kontraktu',
      'Identyfikacja alternatywnych dostawców i ich dostępności',
      'Budowanie argumentacji: 4% uzasadnionej podwyżki zamiast 12%',
    ],
    result:
      'Uzgodniona podwyżka: 4,5%. Oszczędność vs. żądanie dostawcy: istotna. Czas przygotowania: 8 dni roboczych.',
    ctaLabel: 'Umów bezpłatne wsparcie negocjacji',
    ctaUrl: '/umow-bezplatne-wsparcie-negocjacji',
  },

  // 9. FAQ
  {
    _type: 'faqBlock',
    _key: 'section-faq',
    heading: 'Najczęstsze pytania',
    context: 'ogolny',
  },

  // 10. CTA
  {
    _type: 'ctaBlock',
    _key: 'section-cta',
    heading: 'Gotowy na lepsze negocjacje?',
    subheading:
      'Umów bezpłatne wsparcie negocjacyjne z ekspertem Profitii. Pokażemy Ci, jak SpendGuru może poprawić wyniki Twojego działu zakupów.',
    ctaLabel: 'Umów bezpłatne wsparcie',
    ctaUrl: '/umow-bezplatne-wsparcie-negocjacji',
    variant: 'brand',
  },
]

// ─── DOKUMENT STRONY GŁÓWNEJ ───────────────────────────────────────────────

const homeDocument = {
  _id: 'singleton.home',
  _type: 'page',
  title: 'Strona główna',
  slug: { _type: 'slug', current: 'home' },
  language: 'pl',
  sections: homeSections,
  seo: {
    _type: 'seo',
    metaTitle: 'SpendGuru — Lepsze przygotowanie negocjacji zakupowych',
    metaDescription:
      'SpendGuru pomaga zespołom zakupowym lepiej przygotować negocjacje z dostawcami dzięki połączeniu danych kosztowych, benchmarków, prognoz, analizy dostawców i doświadczenia ekspertów Profitii.',
    ogTitle: 'SpendGuru — Negotiation Intelligence dla zakupów',
    ogDescription:
      'Lepsze przygotowanie. Lepsze negocjacje. Lepszy wynik. SpendGuru i Profitia.',
    noIndex: false,
  },
  publishedAt: new Date().toISOString(),
}

// ─── GŁÓWNA FUNKCJA ────────────────────────────────────────────────────────

async function main() {
  console.log()
  console.log('SpendGuru — Sanity Seed: Strona główna')
  console.log('═'.repeat(50))
  console.log(`Projekt:  ${projectId}`)
  console.log(`Dataset:  ${dataset}`)
  console.log(`Tryb:     ${DRY_RUN ? 'DRY RUN (nic nie zostanie zapisane)' : FORCE ? 'FORCE (zastępuje istniejące)' : 'NORMAL (pomija istniejące)'}`)
  console.log()

  // 1. Persony
  console.log('── Persony (' + personas.length + ') ──')
  for (const persona of personas) {
    await upsert(persona, `Persona: ${persona.title}`)
  }
  console.log()

  // 2. FAQ
  console.log('── FAQ (' + faqs.length + ') ──')
  for (const faq of faqs) {
    await upsert(faq, `FAQ: ${faq.question.slice(0, 60)}…`)
  }
  console.log()

  // 3. Strona główna
  console.log('── Strona główna ──')
  await upsert(homeDocument, 'Strona: Strona główna (singleton.home)')
  console.log()

  if (DRY_RUN) {
    console.log('✔  DRY RUN zakończony. Żadnych zmian nie zapisano.')
  } else {
    console.log('✔  Seed zakończony.')
    console.log()
    console.log('Sprawdź wynik w Sanity Studio:')
    console.log('  - Lokalne:    http://localhost:3000/studio')
    console.log('  - Produkcja:  https://spendguru-website.onrender.com/studio')
  }
  console.log()
}

main().catch((err) => {
  console.error()
  console.error('❌  Błąd podczas seedowania:')
  console.error(err.message || err)
  if (err.statusCode === 401 || err.statusCode === 403) {
    console.error()
    console.error('Sprawdź, czy SANITY_API_WRITE_TOKEN jest poprawny i ma uprawnienia Editor/Administrator.')
  }
  process.exit(1)
})
