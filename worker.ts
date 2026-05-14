// Cloudflare Worker entry for nsqd-site.
// Responsibilities:
//   1. POST /api/contact  → forward form submission to Resend, routed by Subject dropdown.
//   2. Anything else      → delegate to the ASSETS binding (static site under dist/).
//
// Why this exists: Cloudflare's newer Workers Static Assets deployment model does NOT
// auto-detect the Pages-style /functions/ directory convention. We need an explicit
// worker entry to handle dynamic routes. Static pages still serve from /dist directly.
//
// Env vars (Cloudflare → Settings → Variables and Secrets):
//   RESEND_API_KEY      [Secret]    re_xxx from resend.com/api-keys
//   CONTACT_TO_PROJECTS [Plaintext] sulaiman@nsqd.co
//   CONTACT_TO_QUOTES   [Plaintext] pranav@nsqd.co
//   CONTACT_FROM        [Plaintext] e.g. "NSQD Site <noreply@nsqd.co>" (verified domain)

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  RESEND_API_KEY: string;
  CONTACT_TO_PROJECTS: string;
  CONTACT_TO_QUOTES: string;
  CONTACT_FROM: string;
}

type Subject = "new_project" | "quote_request" | "partnership" | "other";

const SUBJECT_LABELS: Record<Subject, string> = {
  new_project: "New project",
  quote_request: "Quote request",
  partnership: "Partnership",
  other: "Other",
};

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );

function json(payload: unknown, status: number): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  // Fail loudly during local dev if env wiring is missing. In production this
  // will only fire if Cloudflare secrets weren't saved correctly.
  if (!env.RESEND_API_KEY || !env.CONTACT_FROM || !env.CONTACT_TO_PROJECTS || !env.CONTACT_TO_QUOTES) {
    console.error("Missing env vars", {
      hasKey: !!env.RESEND_API_KEY,
      hasFrom: !!env.CONTACT_FROM,
      hasProjects: !!env.CONTACT_TO_PROJECTS,
      hasQuotes: !!env.CONTACT_TO_QUOTES,
    });
    return json({ ok: false, error: "Server misconfigured" }, 500);
  }

  try {
    const form = await request.formData();

    const honeypot = String(form.get("website") ?? "");
    if (honeypot.trim() !== "") {
      // Bot submission. Silently succeed so spammers don't probe.
      return json({ ok: true }, 200);
    }

    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const countryCode = String(form.get("country_code") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const subject = String(form.get("subject") ?? "").trim() as Subject;
    const message = String(form.get("message") ?? "").trim();

    if (!name || !email || !message || !subject) {
      return json({ ok: false, error: "Missing required fields" }, 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ ok: false, error: "Invalid email" }, 400);
    }
    if (!(subject in SUBJECT_LABELS)) {
      return json({ ok: false, error: "Invalid subject" }, 400);
    }

    const to =
      subject === "quote_request" ? env.CONTACT_TO_QUOTES : env.CONTACT_TO_PROJECTS;

    const phoneLine = phone ? `${countryCode} ${phone}` : "—";
    const subjectLabel = SUBJECT_LABELS[subject];

    const text = [
      `New ${subjectLabel.toLowerCase()} via nsqd.co`,
      "",
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Phone:   ${phoneLine}`,
      `Subject: ${subjectLabel}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const html = `
      <div style="font-family:Poppins,-apple-system,system-ui,sans-serif;color:#0A0A0A;line-height:1.55">
        <h2 style="margin:0 0 12px;font-size:18px">New ${escapeHtml(subjectLabel)} via nsqd.co</h2>
        <table style="font-size:14px;border-collapse:collapse">
          <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666">Phone</td><td>${escapeHtml(phoneLine)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666">Subject</td><td>${escapeHtml(subjectLabel)}</td></tr>
        </table>
        <hr style="border:0;border-top:1px solid #eee;margin:18px 0" />
        <pre style="white-space:pre-wrap;font:14px/1.6 Poppins,system-ui,sans-serif;margin:0">${escapeHtml(message)}</pre>
      </div>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM,
        to: [to],
        reply_to: email,
        subject: `[nsqd.co] ${subjectLabel} — ${name}`,
        text,
        html,
      }),
    });

    if (!resendRes.ok) {
      const body = await resendRes.text();
      console.error("Resend error", resendRes.status, body);
      return json({ ok: false, error: "Email provider failed" }, 502);
    }

    return json({ ok: true }, 200);
  } catch (err) {
    console.error("contact handler error", err);
    return json({ ok: false, error: "Server error" }, 500);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      return handleContact(request, env);
    }

    // Everything else: static assets (handles index.html, /work/*, 404, etc.)
    return env.ASSETS.fetch(request);
  },
};
