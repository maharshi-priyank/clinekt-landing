const SUPABASE_BASE = import.meta.env.VITE_SUPABASE_URL as string | undefined
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON as string | undefined
const API_BASE      = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3000'
const TABLE         = 'waitlist_signups'

function supabaseHeaders() {
  return {
    'Content-Type':  'application/json',
    'apikey':        SUPABASE_ANON ?? '',
    'Authorization': `Bearer ${SUPABASE_ANON ?? ''}`,
  }
}

/** @deprecated Waitlist signups are no longer collected — users sign up directly */
export async function submitWaitlist(email: string): Promise<void> {
  if (!SUPABASE_BASE || !SUPABASE_ANON) {
    await new Promise(r => setTimeout(r, 800))
    return
  }
  const res = await fetch(`${SUPABASE_BASE}/rest/v1/${TABLE}`, {
    method:  'POST',
    headers: { ...supabaseHeaders(), 'Prefer': 'return=minimal' },
    body:    JSON.stringify({ email, source: 'landing', created_at: new Date().toISOString() }),
  })
  if (!res.ok && res.status !== 409) {
    throw new Error(`Supabase error ${res.status}`)
  }
}

/** Returns total registered user count from the ClearWork API */
export async function fetchPlatformUserCount(): Promise<number | null> {
  try {
    const res = await fetch(`${API_BASE}/public-profiles/stats`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json() as { userCount?: number }
    return data.userCount ?? null
  } catch {
    return null
  }
}
