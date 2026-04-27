'use client'

import { useState } from 'react'
import { FormField } from '@/components/ui/FormField'
import { Button } from '@/components/ui/Button'
import { contactFormSchema, type ContactFormData } from '@/lib/validations'
import { CONTACT_INTEREST_OPTIONS } from '@/lib/constants'

type FieldErrors = Partial<Record<keyof ContactFormData, string>>

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const raw = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      company: formData.get('company') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string | undefined,
      position: formData.get('position') as string | undefined,
      message: formData.get('message') as string | undefined,
      interest: formData.get('interest') as string | undefined,
      consentDataProcessing: formData.get('consentDataProcessing') === 'on',
      consentMarketing: formData.get('consentMarketing') === 'on',
    }

    const result = contactFormSchema.safeParse(raw)
    if (!result.success) {
      const fieldErrors: FieldErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactFormData
        fieldErrors[field] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-success)] bg-green-50 p-8 text-center">
        <p className="text-lg font-semibold text-[var(--color-neutral-900)]">Dziękujemy!</p>
        <p className="mt-2 text-sm text-[var(--color-neutral-500)]">
          Odezwiemy się w ciągu 24 godzin roboczych.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          label="Imię"
          name="firstName"
          type="text"
          required
          autoComplete="given-name"
          error={errors.firstName}
        />
        <FormField
          label="Nazwisko"
          name="lastName"
          type="text"
          required
          autoComplete="family-name"
          error={errors.lastName}
        />
      </div>

      <FormField
        label="Firma"
        name="company"
        type="text"
        required
        autoComplete="organization"
        error={errors.company}
      />

      <FormField
        label="E-mail"
        name="email"
        type="email"
        required
        autoComplete="email"
        error={errors.email}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          label="Telefon (opcjonalnie)"
          name="phone"
          type="tel"
          autoComplete="tel"
          error={errors.phone}
        />
        <FormField
          label="Stanowisko (opcjonalnie)"
          name="position"
          type="text"
          error={errors.position}
        />
      </div>

      {/* Obszar zainteresowania */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="interest" className="text-sm font-medium text-[var(--color-neutral-700)]">
          Obszar zainteresowania
        </label>
        <select
          id="interest"
          name="interest"
          className="rounded-[var(--radius-md)] border border-[var(--color-neutral-300)] px-3 py-2.5 text-base focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20"
        >
          <option value="">Wybierz (opcjonalnie)</option>
          {CONTACT_INTEREST_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-[var(--color-neutral-700)]">
          Wiadomość (opcjonalnie)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="rounded-[var(--radius-md)] border border-[var(--color-neutral-300)] px-3 py-2.5 text-base focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 resize-none"
          placeholder="Opisz krótko swoją sytuację lub pytanie..."
        />
      </div>

      {/* Zgody */}
      <div className="flex flex-col gap-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="consentDataProcessing"
            className="mt-0.5 h-4 w-4 rounded border-[var(--color-neutral-300)] accent-[var(--color-primary)]"
            required
          />
          <span className="text-xs text-[var(--color-neutral-500)] leading-relaxed">
            Wyrażam zgodę na przetwarzanie moich danych osobowych przez Profitia Sp. z o.o. w celu odpowiedzi na zapytanie. *
          </span>
        </label>
        {errors.consentDataProcessing && (
          <p className="text-xs text-[var(--color-error)]" role="alert">{errors.consentDataProcessing}</p>
        )}

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="consentMarketing"
            className="mt-0.5 h-4 w-4 rounded border-[var(--color-neutral-300)] accent-[var(--color-primary)]"
          />
          <span className="text-xs text-[var(--color-neutral-500)] leading-relaxed">
            Wyrażam zgodę na kontakt marketingowy ze strony Profitia (opcjonalnie).
          </span>
        </label>
      </div>

      {status === 'error' && (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          Wystąpił błąd. Spróbuj ponownie lub napisz bezpośrednio na adres e-mail.
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === 'loading'}>
        {status === 'loading' ? 'Wysyłanie...' : 'Umów bezpłatne wsparcie'}
      </Button>
    </form>
  )
}
