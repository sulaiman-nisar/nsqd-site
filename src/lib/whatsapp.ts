import { site } from "~/lib/site";

export type WhatsAppTarget = "projects" | "quotes";

export function whatsappUrl(target: WhatsAppTarget, message: string): string {
  const number = target === "quotes" ? site.whatsapp.quotes : site.whatsapp.projects;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const prefills = {
  general: "Hi Sulaiman, I'd like to discuss a project with NSQD.",
  caseStudy: (projectName: string) =>
    `Hi Sulaiman, saw your ${projectName} work — interested in something similar.`,
  capabilityQuote: (capability: string) =>
    `Hi NSQD, I'd like a quote on ${capability}.`,
  fork: {
    build: "Hi Sulaiman, I have a project in mind I'd like to build with NSQD.",
    part: "Hi NSQD, I need a quote on a specific capability.",
  },
} as const;
