import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: 'ixdiqa8z', // We will replace this with your actual Project ID
  dataset: 'production',
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
