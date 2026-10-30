import { listAccounts } from '../src/carousel.js';

const accounts = await listAccounts();
if (accounts.length === 0) {
  console.log('No social accounts connected yet. Connect them in the Zernio dashboard: https://zernio.com');
}
for (const account of accounts) {
  console.log(`${account.platform.padEnd(12)} ${account._id ?? account.id}  @${account.username ?? ''}`);
}
