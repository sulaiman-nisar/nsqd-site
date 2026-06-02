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

  // Verbatim client testimonials, carried over from the previous site (cleared
  // to publish). Marked up as schema.org Review for AEO/LLM citation, but NOT
  // folded into `rating` above — Google does not surface stars for first-party
  // self-published reviews, and counting them would breach review guidelines.
  // `org` (optional) drives schema.org author.worksFor. `avatar` (optional) is a
  // path under /public; when absent the section renders an initials monogram.
  testimonials: [
    {
      quote:
        "I have used NSQD's printing and signage services for the past two years, and I couldn't be more satisfied with their services. As a creative freelancer, my needs are always varied, from last minute custom prop items to large scale projects with tight deadlines. Whether brainstorming innovative solutions or finding cost-effective materials, Sulaiman's expertise and willingness to collaborate make every project a success. They are not just vendors; they are partners in my creative process. Moreover, their versatility is impressive. From printing to prop making and working with environmentally friendly materials, the support from NSQD has been phenomenal. Their competitive pricing, outstanding quality, and passion for what they do make them a standout choice.",
      name: "Lindi Badenhorst",
      role: "Creative freelancer, art direction and props",
      org: "",
      avatar: "",
    },
    {
      quote:
        "Working with Sulaiman and his team is always a pleasure. He is incredibly responsive, always willing to help. His dedication and professionalism makes the projects smooth and successful. I highly recommend him for his great support and service.",
      name: "Farid Mimouni",
      role: "Founder, FM Consulting",
      org: "FM Consulting",
      avatar: "",
    },
  ],
} as const;
