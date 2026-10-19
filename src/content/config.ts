import { defineCollection, z } from "astro:content";

const work = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    client: z.string(),
    type: z.string(),
    year: z.number().optional(),
    outcome: z.string(),
    // Optional meta description override. The default is built from
    // outcome + type, which can run past Bing's 160-char cap.
    description: z.string().optional(),
    hero: z.string(),
    // Optional grid-tile image for when the hero's framing doesn't suit the
    // 4:3 tile (e.g. a wide hero for a tall subject). Falls back to hero.
    tile: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    sectors: z.array(z.string()).default([]),
    capabilities: z.array(z.string()).default([]),
    materials: z.array(z.string()).optional(),
    quantity: z.string().optional(),
    leadTime: z.string().optional(),
    deliveredAt: z.string().optional(),
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work };
