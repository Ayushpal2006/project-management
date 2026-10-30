import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { zernio } from './zernio.js';

const CONTENT_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

export async function listAccounts() {
  const { data } = await zernio.accounts.listAccounts({ throwOnError: true });
  return data.accounts;
}

// Uploads a local image to Zernio media storage and returns its public URL.
export async function uploadImage(filePath) {
  const contentType = CONTENT_TYPES[path.extname(filePath).toLowerCase()];
  if (!contentType) {
    throw new Error(`Unsupported image type: ${filePath}`);
  }

  const { size } = await stat(filePath);
  const { data: presign } = await zernio.media.getMediaPresignedUrl({
    body: { filename: path.basename(filePath), contentType, size },
    throwOnError: true,
  });

  const res = await fetch(presign.uploadUrl, {
    method: 'PUT',
    body: await readFile(filePath),
    headers: { 'Content-Type': contentType },
  });
  if (!res.ok) {
    throw new Error(`Upload of ${filePath} failed: ${res.status} ${res.statusText}`);
  }
  return presign.publicUrl;
}

// Creates a multi-image (carousel) post. With neither scheduledFor nor
// publishNow the post is saved as a draft in Zernio.
export async function createCarouselPost({ caption, imagePaths, accounts, scheduledFor, publishNow = false }) {
  if (imagePaths.length < 2) {
    throw new Error('A carousel needs at least two images.');
  }

  const mediaItems = [];
  for (const imagePath of imagePaths) {
    mediaItems.push({ type: 'image', url: await uploadImage(imagePath) });
  }

  const { data } = await zernio.posts.createPost({
    body: {
      content: caption,
      mediaItems,
      platforms: accounts.map(({ platform, accountId }) => ({ platform, accountId })),
      ...(scheduledFor && { scheduledFor }),
      ...(publishNow && { publishNow: true }),
    },
    throwOnError: true,
  });
  return data.post;
}
