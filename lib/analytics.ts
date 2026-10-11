import { sendGAEvent } from "@next/third-parties/google";

type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Fire a GA4 custom event.
 *
 * No-ops unless the <GoogleAnalytics /> component has initialized the data
 * layer — which only happens in production with NEXT_PUBLIC_GA_ID set (see
 * app/layout.tsx). So calls made in dev and on Vercel preview deployments are
 * silently ignored rather than warning or sending data.
 */
export function track(eventName: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  if (!Array.isArray(w.dataLayer)) return;
  sendGAEvent("event", eventName, params);
}
