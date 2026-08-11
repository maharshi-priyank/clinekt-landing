import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

type Stat = { value: number; suffix: string; text: string }

const stats: Stat[] = [
  { value: 80, suffix: '%', text: 'lose clients from no follow-up system' },
  { value: 65, suffix: '%', text: 'of proposals are never followed up' },
  { value: 72, suffix: '%', text: 'get paid 30+ days late' },
  { value: 6, suffix: ' hrs', text: 'wasted every week on admin' },
]

/* CountUp — animates 0 → value once in view, respects prefers-reduced-motion */
function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduceMotion = useReducedMotion()
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 70, damping: 18, mass: 0.6 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      spring.jump(value)
    } else {
      motionVal.set(value)
    }
  }, [inView, reduceMotion, value, motionVal, spring])

  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)))
    return unsub
  }, [spring])

  return (
    <span ref={ref} className="tabular-nums">
      {display}{suffix}
    </span>
  )
}

export default function StatStrip() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-12"
      style={{ background: '#FFFFFF' }}
    >
      <div className="max-w-5xl mx-auto px-5">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="text-center text-[11px] font-semibold text-stone-400 uppercase tracking-[0.14em] mb-7"
        >
          Why freelancers switch
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.text}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
              className="text-center p-5 rounded-2xl bg-white border border-stone-100 shadow-[0_1px_4px_rgba(0,0,0,0.05)]"
            >
              <div className="font-black text-indigo-600" style={{ fontSize: 'clamp(26px, 3.2vw, 34px)', letterSpacing: '-0.02em' }}>
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs text-stone-500 mt-2 leading-relaxed">{s.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
