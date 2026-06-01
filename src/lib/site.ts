export const site = {
  name: "NSQD",
  longName: "Necessity Squared",
  url: import.meta.env.PUBLIC_SITE_URL ?? "https://nsqd.co",

  whatsapp: {
    projects: import.meta.env.PUBLIC_WHATSAPP_PROJECTS ?? "971551476222",
    quotes: import.meta.env.PUBLIC_WHATSAPP_QUOTES ?? "971502753175",
  },

  social: {
    instagram: import.meta.env.PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/nsqdae/",
    linkedin: import.meta.env.PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/company/nsqd",
  },

  offices: [
    {
      city: "Dubai",
      area: "Jebel Ali",
      address: "Jebel Ali, Dubai, United Arab Emirates",
      country: "UAE",
    },
    {
      city: "Cape Town",
      area: "Wynberg",
      address: "Wynberg 7800, Cape Town, South Africa",
      country: "South Africa",
    },
  ],

  emails: {
    projects: "sulaiman@nsqd.co",
    quotes: "pranav@nsqd.co",
  },

  capabilities: [
    "CO2 laser",
    "Fiber laser",
    "UV flatbed",
    "ECO solvent",
    "DTF",
    "3D printing",
    "CAD/CAM",
    "Assembly + install",
  ],

  plausibleDomain: import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN ?? "nsqd.co",

  // Mirrors the Google Business Profile rating for the Dubai listing.
  // Update value/count when the GBP rating changes. `url` should point at the
  // public Google reviews for the listing — swap in the exact GBP review link
  // when available (search URL is a safe default that resolves to the listing).
  rating: {
    value: "4.7",
    count: "6",
    best: "5",
    url: "https://www.google.com/search?q=Necessity+Squared+NSQD+Dubai+reviews",
  },
} as const;
