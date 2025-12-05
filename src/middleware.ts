import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { detectBot } from './lib/bot-detector';
import { logVisit } from './lib/logger';

// Paths to exclude from logging (static assets, internal Next.js files)
const EXCLUDED_PATHS = [
  '/_next',
  '/favicon.ico',
  '/images',
  '/static',
  '/robots.txt',
  '/sitemap.xml',
  '/api', // API routes excluded by default
];

// Create the intl middleware
const intlMiddleware = createMiddleware(routing);

// Main middleware function
export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 1. Filter out static assets and excluded paths
  const isExcluded = EXCLUDED_PATHS.some((excludedPath) =>
    path.startsWith(excludedPath)
  );

  // 2. Log the visit if not excluded
  if (!isExcluded) {
    // Extract request metadata
    const userAgent = request.headers.get('user-agent') || '';
    const botInfo = detectBot(userAgent);
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const referer = request.headers.get('referer');

    // Extract country from headers if available (e.g., Cloudflare: CF-IPCountry)
    // Since we're self-hosting, geo data may not be available
    const country = request.headers.get('cf-ipcountry') || null;

    // Log the visit (fire-and-forget, non-blocking)
    logVisit({
      path,
      method: request.method,
      ip,
      user_agent: userAgent,
      is_bot: botInfo.isBot,
      bot_name: botInfo.name,
      referer,
      country,
    });
  }

  // 3. Proceed with intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en)/:path*'],
};

