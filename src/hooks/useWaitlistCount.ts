import { useEffect, useState } from 'react'
import { fetchPlatformUserCount } from '../lib/waitlist'

export function useWaitlistCount() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    fetchPlatformUserCount().then(n => { if (n !== null) setCount(n) })
  }, [])

  return count
}
