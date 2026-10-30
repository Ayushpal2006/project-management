import { parseArgs } from 'node:util';
import { createCarouselPost } from '../src/carousel.js';

const usage = `Usage: npm run post -- --caption "Text" --account instagram:ACCOUNT_ID [--account linkedin:ACCOUNT_ID] [--schedule 2026-11-01T10:00:00Z | --now] slide1.png slide2.png ...

Without --schedule or --now the carousel is saved as a draft.`;

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    caption: { type: 'string' },
    account: { type: 'string', multiple: true },
    schedule: { type: 'string' },
    now: { type: 'boolean', default: false },
  },
});

if (!values.caption || !values.account?.length || positionals.length === 0) {
  console.error(usage);
  process.exit(1);
}
if (values.schedule && values.now) {
  console.error('Use either --schedule or --now, not both.');
  process.exit(1);
}

const accounts = values.account.map((pair) => {
  const [platform, accountId] = pair.split(':');
  if (!platform || !accountId) {
    console.error(`Bad --account value "${pair}", expected platform:accountId`);
    process.exit(1);
  }
  return { platform, accountId };
});

const post = await createCarouselPost({
  caption: values.caption,
  imagePaths: positionals,
  accounts,
  scheduledFor: values.schedule,
  publishNow: values.now,
});

const state = values.now ? 'published' : values.schedule ? `scheduled for ${values.schedule}` : 'saved as a draft';
console.log(`Carousel ${state}. Zernio post id: ${post._id}`);
