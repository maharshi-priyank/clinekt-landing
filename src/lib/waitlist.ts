const BASE  = import.meta.env.VITE_SUPABASE_URL  as string | undefined
const ANON  = import.meta.env.VITE_SUPABASE_ANON as string | undefined
const TABLE = 'waitlist_signups'

function headers() {
  return {
    'Content-Type':  'application/json',
    'apikey':        ANON ?? '',
    'Authorization': `Bearer ${ANON ?? ''}`,
  }
}

export async function submitWaitlist(email: string): Promise<void> {
  if (!BASE || !ANON) {
    await new Promise(r => setTimeout(r, 800)) // dev fallback
    return
  }
  const res = await fetch(`${BASE}/rest/v1/${TABLE}`, {
    method:  'POST',
    headers: { ...headers(), 'Prefer': 'return=minimal' },
    body:    JSON.stringify({ email, source: 'landing', created_at: new Date().toISOString() }),
  })
  if (!res.ok && res.status !== 409) { // 409 = duplicate email, treat as success
    throw new Error(`Supabase error ${res.status}`)
  }
}

export async function fetchWaitlistCount(): Promise<number | null> {
  if (!BASE || !ANON) return null
  const res = await fetch(`${BASE}/rest/v1/${TABLE}?select=id`, {
    headers: { ...headers(), 'Prefer': 'count=exact', 'Range': '0-0' },
  })
  if (!res.ok) return null
  const range = res.headers.get('Content-Range') // e.g. "0-0/247"
  const total = range?.split('/')[1]
  return total ? Number(total) : null
}
