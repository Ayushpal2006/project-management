import 'dotenv/config';
import Zernio from '@zernio/node';

// The SDK reads ZERNIO_API_KEY from the environment. Fail early with a clear
// message instead of letting the first API call come back as a 401.
if (!process.env.ZERNIO_API_KEY) {
  throw new Error('ZERNIO_API_KEY is not set. Copy .env.example to .env and add your key.');
}

export const zernio = new Zernio();
