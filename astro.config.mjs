import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

const SITE = process.env.PUBLIC_SITE_URL ?? "https://nsqd.co";

export default defineConfig({
  site: SITE,
  output: "static",

  integrations: [
    mdx(),
    sitemap(),
    tailwind({ applyBaseStyles: false }),
  ],

  prefetch: { defaultStrategy: "viewport" },
  build: { inlineStylesheets: "auto" },
  adapter: cloudflare()
});