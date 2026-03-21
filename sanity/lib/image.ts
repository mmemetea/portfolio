import { ImageLoader } from "next/image";
import createImageUrlBuilder, {
  type SanityImageSource,
} from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

/**
 * Generates an optimized image URL from a Sanity image source.
 * Accepts optional width and height params.
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Next.js ImageLoader compatible with Sanity images.
 * Usage in next/image: <Image loader={sanityImageLoader} src={imageUrl} ... />
 */
export const sanityImageLoader: ImageLoader = ({ src, width, quality }) => {
  return builder.image(src).width(width).quality(quality ?? 80).url();
};
