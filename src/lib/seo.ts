const FALLBACK_ORIGIN = 'https://fromtesttotrust.com';

/** Absolute site origin, never with a trailing slash. */
export function siteOrigin(site: URL | undefined): string {
  return (site?.href ?? FALLBACK_ORIGIN).replace(/\/+$/, '');
}

/**
 * Clamp text to at most `n` characters, breaking on the last word boundary.
 * Falls back to a hard cut at `n` when the first `n` chars contain no space.
 */
export function clampText(s: string, n = 155): string {
  if (s.length <= n) return s;
  const space = s.lastIndexOf(' ', n);
  return `${s.slice(0, space > 0 ? space : n).trimEnd()}…`;
}
