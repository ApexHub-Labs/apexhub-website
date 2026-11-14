"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/**
 * Link that works from any page. A "/#section" link is a plain in-page anchor
 * on the home page (the native smooth scroll is left alone) and routes home
 * first from anywhere else. Other internal paths use next/link; mailto: and
 * external URLs stay ordinary anchors.
 */
export default function SiteLink({
  href,
  ...rest
}: Omit<ComponentProps<"a">, "href"> & { href: string }) {
  const pathname = usePathname();

  if (href.startsWith("/#") && pathname === "/") {
    return <a href={href.slice(1)} {...rest} />;
  }
  if (href.startsWith("/")) {
    return <Link href={href} {...rest} />;
  }
  return <a href={href} {...rest} />;
}
