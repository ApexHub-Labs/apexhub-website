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
 * Validates the submission server-side. By default it logs the enquiry so the
 * site works out of the box. To deliver emails, wire an email provider
 * (Resend, SendGrid, Postmark, SMTP, …) where indicated below.
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
  // Default behaviour: record the enquiry to the server log.
  // Replace this block with your email/CRM integration, e.g.:
  //
  //   await resend.emails.send({
  //     from: "site@apexhublabs.com",
  //     to: "hello@apexhublabs.com",
  //     subject: `New enquiry — ${submission.name}`,
  //     text: JSON.stringify(submission, null, 2),
  //   });
  //
  console.log("[contact] new submission:", submission);

  return NextResponse.json({ ok: true }, { status: 200 });
}
