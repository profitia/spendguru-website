import { type SchemaTypeDefinition } from 'sanity'

import { seoType } from './seo'
import { blockContentType } from './blockContent'
import { pageType } from './page'
import { postType } from './post'
import { resourceType } from './resource'
import { caseStudyType } from './caseStudy'
import { landingPageType } from './landingPage'
import {
  useCaseType,
  industryType,
  personaType,
  faqType,
} from './entities'
import {
  heroBlock,
  proofBarBlock,
  problemBlock,
  fiveQuestionsBlock,
  processBlock,
  businessOutcomesBlock,
  stepsBlock,
  personaBlock,
  useCaseBlock,
  useCaseStoryBlock,
  industryBlock,
  resourceGridBlock,
  faqBlock,
  ctaBlock,
  formBlock,
} from './sections'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Shared types
    seoType,
    blockContentType,

    // Documents
    pageType,
    postType,
    resourceType,
    caseStudyType,
    landingPageType,
    useCaseType,
    industryType,
    personaType,
    faqType,

    // Section blocks — strona główna
    heroBlock,
    proofBarBlock,
    problemBlock,
    fiveQuestionsBlock,
    processBlock,
    businessOutcomesBlock,
    stepsBlock,
    personaBlock,
    useCaseBlock,
    useCaseStoryBlock,
    industryBlock,
    resourceGridBlock,
    faqBlock,
    ctaBlock,
    formBlock,
  ],
}
