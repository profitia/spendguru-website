// Sanity Studio dostępne pod /studio
// eslint-disable-next-line @typescript-eslint/no-require-imports
const NextStudio = require('next-sanity/studio').NextStudio
import sanityConfig from '../../../../sanity.config'

export const dynamic = 'force-static'

export default function StudioPage() {
  return <NextStudio config={sanityConfig} />
}
