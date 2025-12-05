/**
 * Traffic Logging Utility
 * 
 * Provides fire-and-forget logging functionality for tracking web traffic.
 * Uses Supabase Admin client to write logs without blocking request processing.
 */

import { supabaseAdmin } from './supabase/server';

/**
 * Log data structure matching the traffic_logs table schema
 */
export interface LogData {
  path: string;
  method?: string;
  ip?: string;
  user_agent?: string;
  is_bot?: boolean;
  bot_name?: string | null;
  referer?: string | null;
  country?: string | null;
  meta?: Record<string, unknown>;
}

/**
 * Logs a visit to the traffic_logs table
 * 
 * This is a fire-and-forget operation that does not block the request.
 * Errors are logged to console in development but do not throw exceptions.
 * 
 * @param data - The log data to insert
 */
export function logVisit(data: LogData): void {
  // Fire-and-forget: don't await, use async IIFE to handle errors asynchronously
  (async () => {
    try {
      const { error } = await supabaseAdmin
        .from('traffic_logs')
        .insert({
          path: data.path,
          method: data.method || null,
          ip: data.ip || null,
          user_agent: data.user_agent || null,
          is_bot: data.is_bot ?? false,
          bot_name: data.bot_name || null,
          referer: data.referer || null,
          country: data.country || null,
          meta: data.meta || null,
        });

      if (error) {
        // Only log errors in development to avoid noise in production
        if (process.env.NODE_ENV === 'development') {
          console.error('[Traffic Logger] Failed to log visit:', error);
        }
      }
    } catch (error) {
      // Catch any unexpected errors
      if (process.env.NODE_ENV === 'development') {
        console.error('[Traffic Logger] Unexpected error:', error);
      }
    }
  })();
}

