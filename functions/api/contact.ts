// Cloudflare Pages Function — POST /api/contact
// Routes form submissions to Resend, keyed off the Subject dropdown.
//
// Env vars required (set in Cloudflare Pages → Settings → Environment variables):
//   RESEND_API_KEY      — re_xxx from resend.com/api-keys
//   CONTACT_TO_PROJECTS — sulaiman@nsqd.co
//   CONTACT_TO_QUOTES   — pranav@nsqd.co
//   CONTACT_FROM        — e.g. "NSQD Site <noreply@nsqd.co>" (must be a verified Resend domain)

interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO_PROJECTS: string;
  CONTACT_TO_QUOTES: string;
  CONTACT_FROM: string;
}

interface Context {
  request: Request;
  env: Env;
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

export const onRequestPost = async ({ request, env }: Context): Promise<Response> => {
  try {
    const form = await request.formData();

    const honeypot = String(form.get("website") ?? "");
    if (honeypot.trim() !== "") {
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
};

function json(payload: unknown, status: number): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  });
}
