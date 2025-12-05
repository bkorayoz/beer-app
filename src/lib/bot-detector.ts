/**
 * Bot Detection Utility
 * 
 * Detects common web crawlers and AI bots using User-Agent string analysis.
 * Returns bot classification information for traffic logging.
 */

export interface BotInfo {
  isBot: boolean;
  name: string | null;
}

/**
 * Common bot patterns for detection
 * Patterns are case-insensitive and match common crawlers and AI bots
 */
const BOT_PATTERNS: Array<{ pattern: RegExp; name: string }> = [
  // Search Engine Crawlers
  { pattern: /googlebot/i, name: 'Googlebot' },
  { pattern: /bingbot|msnbot/i, name: 'Bingbot' },
  { pattern: /slurp/i, name: 'Yahoo Slurp' },
  { pattern: /duckduckbot/i, name: 'DuckDuckBot' },
  { pattern: /baiduspider/i, name: 'Baiduspider' },
  { pattern: /yandexbot/i, name: 'YandexBot' },
  
  // AI/LLM Bots
  { pattern: /gptbot|chatgpt/i, name: 'GPTBot' },
  { pattern: /chatgpt-user/i, name: 'ChatGPT-User' },
  { pattern: /perplexitybot/i, name: 'PerplexityBot' },
  { pattern: /anthropic|claude/i, name: 'AnthropicBot' },
  { pattern: /ccbot|commoncrawl/i, name: 'CommonCrawl' },
  { pattern: /applebot/i, name: 'Applebot' },
  
  // Social Media Crawlers
  { pattern: /facebookexternalhit|facebookcatalog/i, name: 'FacebookBot' },
  { pattern: /twitterbot/i, name: 'TwitterBot' },
  { pattern: /linkedinbot/i, name: 'LinkedInBot' },
  { pattern: /whatsapp/i, name: 'WhatsAppBot' },
  { pattern: /telegrambot/i, name: 'TelegramBot' },
  
  // Other Common Crawlers
  { pattern: /ahrefsbot/i, name: 'AhrefsBot' },
  { pattern: /semrushbot/i, name: 'SEMrushBot' },
  { pattern: /mj12bot/i, name: 'MJ12bot' },
  { pattern: /dotbot/i, name: 'DotBot' },
  { pattern: /petalbot/i, name: 'PetalBot' },
  { pattern: /bytespider/i, name: 'Bytespider' },
  
  // Generic bot indicators (fallback)
  { pattern: /bot|crawler|spider|scraper/i, name: 'Unknown Bot' },
];

/**
 * Detects if a User-Agent string belongs to a bot
 * 
 * @param userAgent - The User-Agent string from the request header
 * @returns BotInfo object with isBot flag and bot name (if detected)
 */
export function detectBot(userAgent: string): BotInfo {
  if (!userAgent || userAgent.trim().length === 0) {
    return { isBot: false, name: null };
  }

  // Check against known bot patterns
  for (const { pattern, name } of BOT_PATTERNS) {
    if (pattern.test(userAgent)) {
      // Special case: Don't mark as bot if it's a generic pattern but looks like a real browser
      // This prevents false positives for browsers with "bot" in their name
      if (name === 'Unknown Bot') {
        // Additional check: if it contains common browser indicators, it's likely not a bot
        const browserIndicators = /chrome|firefox|safari|edge|opera|msie|trident/i;
        if (browserIndicators.test(userAgent)) {
          continue; // Skip this match, continue to next pattern
        }
      }
      
      return { isBot: true, name };
    }
  }

  return { isBot: false, name: null };
}

