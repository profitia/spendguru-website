import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const result = contactFormSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: result.error.issues },
      { status: 422 },
    )
  }

  const data = result.data

  // TODO: Integracja z CRM / Office365 / notyfikacja e-mail (Profitia)
  // Możliwe opcje:
  // - Microsoft Graph API (Office365 - send mail jako tomasz.uscinski@profitia.pl)
  // - HubSpot / Pipedrive API
  // - Webhook do n8n / Make
  // Docelowo: send_mail.py pattern z Profitia (Azure Delegated Auth)

  console.log('[contact] Nowe zgłoszenie:', {
    name: `${data.firstName} ${data.lastName}`,
    company: data.company,
    email: data.email,
    interest: data.interest,
  })

  return NextResponse.json(
    { success: true, message: 'Zgłoszenie przyjęte.' },
    { status: 200 },
  )
}
