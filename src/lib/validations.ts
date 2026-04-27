import { z } from 'zod'

export const contactFormSchema = z.object({
  firstName: z.string().min(2, 'Imię jest wymagane'),
  lastName: z.string().min(2, 'Nazwisko jest wymagane'),
  company: z.string().min(2, 'Firma jest wymagana'),
  email: z.string().email('Podaj poprawny adres e-mail'),
  phone: z.string().optional(),
  position: z.string().optional(),
  message: z.string().optional(),
  interest: z.string().optional(),
  consentMarketing: z.boolean().optional(),
  consentDataProcessing: z
    .boolean()
    .refine((val) => val === true, 'Zgoda na przetwarzanie danych jest wymagana'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
