import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  need?: string;
  message?: string;
};

/**
 * Contact form handler.
 *
 * Validates the submission server-side, then emails it to CONTACT_TO_EMAIL
 * through Resend (RESEND_API_KEY). CONTACT_FROM_EMAIL is optional and only
 * works once the sending domain is verified in Resend.
 */
export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const need = (body.need || "").trim();
  const message = (body.message || "").trim();

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "Email is invalid.";
  if (!need) errors.need = "Please select what you need.";
  if (!message) errors.message = "Message is required.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const submission = {
    name,
    company: (body.company || "").trim(),
    email,
    phone: (body.phone || "").trim(),
    need,
    message,
    receivedAt: new Date().toISOString(),
  };

  // --- Delivery -----------------------------------------------------------
  // Emails the enquiry via Resend. Reply-To is the visitor, so hitting Reply
  // answers them directly. The log line is kept as a backup record.
  console.log("[contact] new submission:", submission);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return NextResponse.json(
      { error: "Email delivery is not configured." },
      { status: 500 }
    );
  }

  const text = [
    `Name: ${submission.name}`,
    `Company: ${submission.company || "—"}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone || "—"}`,
    `Need: ${submission.need}`,
    "",
    submission.message,
    "",
    `Received: ${submission.receivedAt}`,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "ApexHub Labs <onboarding@resend.dev>",
      to: [to],
      reply_to: submission.email,
      subject: `New enquiry — ${submission.name}`,
      text,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error:", res.status, await res.text());
    return NextResponse.json(
      { error: "Could not send your message." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
