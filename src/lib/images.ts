import type { ImageMetadata } from "astro";

// Optimised-image resolver. Source photos live in src/assets/** so they run
// through Astro's image pipeline (responsive widths + WebP at build time),
// but MDX frontmatter and component props keep referencing them by their
// old public-style paths ("/images/work/foo.jpg"). This maps one to the
// other, and doubles as the exists-guard: a path that doesn't resolve simply
// doesn't render — no empty boxes for shots that haven't been delivered yet.
const modules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/**/*.{jpg,jpeg,png,webp,avif}",
  { eager: true },
);

const byPublicPath = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(modules)) {
  byPublicPath.set(path.replace("/src/assets/", "/images/"), mod.default);
}

export function resolveImage(publicPath: string): ImageMetadata | undefined {
  return byPublicPath.get(publicPath);
}
