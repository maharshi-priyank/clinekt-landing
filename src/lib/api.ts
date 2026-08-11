/**
 * ClearWork API base URL — must include the `/api/v1` prefix.
 * Local: http://localhost:3000/api/v1
 * Prod:  https://rupway-backend.fly.dev/api/v1
 */
export const API_BASE = (
  import.meta.env.VITE_API_URL as string | undefined
)?.replace(/\/$/, '') ?? 'http://localhost:3000/api/v1'
