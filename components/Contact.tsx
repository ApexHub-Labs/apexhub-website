"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import Magnetic from "./Magnetic";
import { ArrowRight, ArrowUpRight } from "./icons";

const NEEDS = [
  "Digital Presence (website, branding, marketing)",
  "Business System (LMS, CRM, ERP, automation)",
  "Software Product (web, mobile, SaaS, MVP)",
  "Innovation (AI, automation, emerging tech)",
  "Not sure yet — let's talk",
];

type Errors = Partial<Record<string, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [done, setDone] = useState(false);

  function validate(data: FormData): Errors {
    const e: Errors = {};
    if (!String(data.get("name") || "").trim()) e.name = "Please add your name";
    const email = String(data.get("email") || "").trim();
    if (!email) e.email = "Please add your email";
    else if (!EMAIL_RE.test(email)) e.email = "Enter a valid email";
    if (!String(data.get("need") || "")) e.need = "Please choose one";
    if (!String(data.get("message") || "").trim())
      e.message = "Tell us a little about it";
    return e;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("error");
      setStatusMsg("Please check the highlighted fields.");
      return;
    }

    setStatus("sending");
    setStatusMsg("Sending…");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setDone(true);
      setStatus("idle");
      setStatusMsg("");
    } catch {
      setStatus("error");
      setStatusMsg(
        "Something went wrong. Please email us at hello@apexhublabs.com."
      );
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <Reveal className="eyebrow contact__index" delay={0}>
          06 — Start a Conversation
        </Reveal>
        <div className="contact__grid">
          <div>
            <SplitText
              as="h2"
              text="Have something you want to build?"
              className="head contact__title"
              stagger={0.045}
            />
            <p className="lead contact__lead">
              Tell us about your organization, idea, or challenge. Let&apos;s
              explore what we can build together.
            </p>

            <div className="contact__alt">
              <a href="mailto:hello@apexhublabs.com">
                <ArrowUpRight size={16} />
                <span>hello@apexhublabs.com</span>
              </a>
              <a
                href="https://www.linkedin.com/company/apexhub-labs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowUpRight size={16} />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.facebook.com/apexhublabs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowUpRight size={16} />
                <span>Facebook</span>
              </a>
            </div>
          </div>

          <Reveal delay={100}>
            {done ? (
              <div className="form__success" role="status">
                <h3>Message received.</h3>
                <p>
                  Thank you for reaching out. A member of the ApexHub Labs team
                  will get back to you shortly to start the conversation.
                </p>
              </div>
            ) : (
              <form className="form" onSubmit={onSubmit} noValidate>
                <div className="field" data-error={!!errors.name}>
                  <label htmlFor="name">
                    Name <span className="req">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <span className="field__error">{errors.name}</span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="company">Company / Organization</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Organization name"
                  />
                </div>

                <div className="field" data-error={!!errors.email}>
                  <label htmlFor="email">
                    Email <span className="req">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@organization.com"
                  />
                  {errors.email && (
                    <span className="field__error">{errors.email}</span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="phone">Phone (optional)</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+251 …"
                  />
                </div>

                <div className="field field--full" data-error={!!errors.need}>
                  <label htmlFor="need">
                    What do you need? <span className="req">*</span>
                  </label>
                  <select id="need" name="need" defaultValue="">
                    <option value="" disabled>
                      Select an option
                    </option>
                    {NEEDS.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  {errors.need && (
                    <span className="field__error">{errors.need}</span>
                  )}
                </div>

                <div
                  className="field field--full"
                  data-error={!!errors.message}
                >
                  <label htmlFor="message">
                    Tell us about your project <span className="req">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="What are you trying to build, transform, or solve?"
                  />
                  {errors.message && (
                    <span className="field__error">{errors.message}</span>
                  )}
                </div>

                <div className="form__actions">
                  <Magnetic strength={0.3}>
                    <button
                      className="btn"
                      type="submit"
                      disabled={status === "sending"}
                    >
                      {status === "sending"
                        ? "Sending…"
                        : "Start the Conversation"}
                      <ArrowRight />
                    </button>
                  </Magnetic>
                  {statusMsg && (
                    <span
                      className="form__status"
                      data-tone={status === "error" ? "error" : "info"}
                      role="status"
                    >
                      {statusMsg}
                    </span>
                  )}
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
