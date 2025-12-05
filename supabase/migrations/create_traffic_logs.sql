-- Traffic Logs Migration
-- This migration creates the traffic_logs table for tracking all web traffic (humans & bots)
-- Compatible with PostgreSQL 17+

-- 1. Create the Universal Logs Table
create table if not exists traffic_logs (
  time        timestamptz not null default now(),
  path        text not null,
  method      text,
  ip          text,           -- User IP
  user_agent  text,           -- Full UA string
  is_bot      boolean default false, -- Classification
  bot_name    text,           -- e.g. "Googlebot", "GPTBot" (Nullable)
  referer     text,           -- Where did they come from?
  country     text,           -- (Optional) if available in headers
  meta        jsonb           -- Extra data
);

-- 2. Indexes (Critical for analytics)
create index if not exists idx_traffic_logs_time on traffic_logs (time desc);
create index if not exists idx_traffic_logs_is_bot on traffic_logs (is_bot);
create index if not exists idx_traffic_logs_path on traffic_logs (path);

-- 3. RLS (Row Level Security)
alter table traffic_logs enable row level security;

-- Allow Service Role to Insert (Public cannot write)
-- Drop policy if it exists to avoid conflicts
drop policy if exists "Service Role can insert logs" on traffic_logs;

create policy "Service Role can insert logs"
on traffic_logs for insert
to service_role
with check (true);

