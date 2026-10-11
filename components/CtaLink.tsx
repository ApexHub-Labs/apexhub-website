"use client";

import { track } from "@/lib/analytics";

/**
 * Anchor that fires a `cta_click` GA event. Used for primary calls-to-action
 * so they can be wired from Server Components (which can't carry onClick).
 */
export default function CtaLink({
  href,
  ctaLabel,
  ctaLocation,
  className,
  children,
}: {
  href: string;
  ctaLabel: string;
  ctaLocation: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className={className}
      href={href}
      onClick={() =>
        track("cta_click", { cta_label: ctaLabel, cta_location: ctaLocation })
      }
    >
      {children}
    </a>
  );
}
