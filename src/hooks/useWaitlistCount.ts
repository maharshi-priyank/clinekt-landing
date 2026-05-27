import { useEffect, useState } from 'react'
import { fetchWaitlistCount } from '../lib/waitlist'

export function useWaitlistCount() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    fetchWaitlistCount().then(n => { if (n !== null) setCount(n) })
  }, [])

  return count
}
