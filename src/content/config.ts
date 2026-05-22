import { defineCollection, z } from "astro:content";

const work = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    client: z.string(),
    type: z.string(),
    year: z.number().optional(),
    outcome: z.string(),
    hero: z.string(),
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
