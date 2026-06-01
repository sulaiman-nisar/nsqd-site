import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

const SITE = process.env.PUBLIC_SITE_URL ?? "https://nsqd.co";

export default defineConfig({
  site: SITE,
  output: "static",
  // Canonical URLs carry a trailing slash, matching the directory-format build
  // output and the generated sitemap. Keeps internal links, canonical tags,
  // OG URLs and the sitemap all consistent on the same 200-serving URL (no
  // redirect hop, no mixed signals to search/AI crawlers).
  trailingSlash: "always",
  integrations: [
    mdx(),
    sitemap(),
    tailwind({ applyBaseStyles: false }),
  ],
  prefetch: { defaultStrategy: "viewport" },
  build: { inlineStylesheets: "auto" },
});
