import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion'
import { FadeIn } from './ui/FadeIn'

interface IconDef {
  label: string; src: string; fallbackBg: string; fallbackInitial: string
  cxPct: number; cyPct: number; dx: number; dy: number
}

const ICONS: IconDef[] = [
  { label: 'WhatsApp',    src: '/brand-icons/whatsapp.svg',   fallbackBg: '#25D366', fallbackInitial: 'W', cxPct: 0.50, cyPct: 0.20, dx:  0.00, dy: -1.00 },
  { label: 'Canva',       src: '/brand-icons/canva.svg',      fallbackBg: '#8B3DFF', fallbackInitial: 'C', cxPct: 0.27, cyPct: 0.27, dx: -0.75, dy: -0.85 },
  { label: 'Google Docs', src: '/brand-icons/googledocs.svg', fallbackBg: '#4285F4', fallbackInitial: 'D', cxPct: 0.73, cyPct: 0.27, dx:  0.75, dy: -0.85 },
  { label: 'Gmail',       src: '/brand-icons/gmail.svg',      fallbackBg: '#EA4335', fallbackInitial: 'G', cxPct: 0.18, cyPct: 0.50, dx: -1.00, dy:  0.00 },
  { label: 'Notion',      src: '/brand-icons/notion.svg',     fallbackBg: '#1a1a1a', fallbackInitial: 'N', cxPct: 0.82, cyPct: 0.50, dx:  1.00, dy:  0.00 },
  { label: 'ClickUp',     src: '/brand-icons/clickup.svg',    fallbackBg: '#7B68EE', fallbackInitial: 'C', cxPct: 0.32, cyPct: 0.76, dx: -0.65, dy:  1.00 },
  { label: 'Claude AI',   src: '/brand-icons/claude.svg',     fallbackBg: '#D97757', fallbackInitial: 'A', cxPct: 0.68, cyPct: 0.76, dx:  0.65, dy:  1.00 },
]

// Scroll thresholds (section=300vh → 200vh scroll range)
// Hub phase: visible from 0 → 0.25 (50vh hold), then scatter 0.25→0.60
// Campaign: TRIGGERED (not scroll-driven) once progress hits 0.38 — plays via animation
const T = { scatterStart: 0.25, scatterEnd: 0.60, centerOut: 0.48, campaignTrigger: 0.38 }
const GAP_CENTER = 165
const GAP_ICON   = 42

function AppIcon({ def, index, scrollYProgress, vpW, vpH }: {
  def: IconDef; index: number; scrollYProgress: MotionValue<number>; vpW: number; vpH: number
}) {
  const [imgOk, setImgOk] = useState(true)
  const stagger = index * 0.012
  const x = useTransform(scrollYProgress, [T.scatterStart + stagger, T.scatterEnd], [0, def.dx * vpW * 1.5], { clamp: true })
  const y = useTransform(scrollYProgress, [T.scatterStart + stagger, T.scatterEnd], [0, def.dy * vpH * 1.5], { clamp: true })
  const opacity = useTransform(scrollYProgress, [T.scatterStart + stagger, T.scatterStart + stagger + 0.12], [1, 0], { clamp: true })
  const scale   = useTransform(scrollYProgress, [T.scatterStart + stagger, T.scatterStart + stagger + 0.12], [1, 0.75], { clamp: true })

  return (
    <div style={{ position: 'absolute', left: `${def.cxPct * 100}%`, top: `${def.cyPct * 100}%`, transform: 'translate(-50%,-50%)', zIndex: 10, pointerEvents: 'none' }}>
      <motion.div style={{ x, y, opacity, scale }}>
        {imgOk ? (
          <img src={def.src} alt={def.label} width={68} height={68}
            style={{ display: 'block', objectFit: 'contain', filter: 'drop-shadow(0 6px 22px rgba(0,0,0,0.14)) drop-shadow(0 1px 5px rgba(0,0,0,0.07))' }}
            onError={() => setImgOk(false)} />
        ) : (
          <div style={{ width: 68, height: 68, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', background: def.fallbackBg, color: '#fff', fontWeight: 800, fontSize: 26, fontFamily: '"Plus Jakarta Sans", sans-serif', filter: 'drop-shadow(0 6px 22px rgba(0,0,0,0.14))' }}>
            {def.fallbackInitial}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default function HubSpokeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stickyRef  = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ w: 1440, h: 900 })

  // Once triggered, campaign stays visible — not scroll-driven
  const [campaignVisible, setCampaignVisible] = useState(false)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setCampaignVisible(v >= T.campaignTrigger)
  })

  useEffect(() => {
    const update = () => {
      if (!stickyRef.current) return
      const r = stickyRef.current.getBoundingClientRect()
      setDims({ w: r.width, h: r.height })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const linesOpacity  = useTransform(scrollYProgress, [T.scatterStart, T.centerOut], [1, 0], { clamp: true })
  const centerOpacity = useTransform(scrollYProgress, [T.scatterStart, T.campaignTrigger], [1, 0], { clamp: true })
  const centerY       = useTransform(scrollYProgress, [T.scatterStart, T.campaignTrigger], [0, -20], { clamp: true })

  const lineSegments = ICONS.map(ic => {
    const cx = dims.w * 0.5, cy = dims.h * 0.5
    const ix = dims.w * ic.cxPct, iy = dims.h * ic.cyPct
    const dx = ix - cx, dy = iy - cy
    const len = Math.sqrt(dx * dx + dy * dy)
    if (len < GAP_CENTER + GAP_ICON + 20) return null
    const ux = dx / len, uy = dy / len
    return {
      x1: cx + ux * GAP_CENTER, y1: cy + uy * GAP_CENTER,
      x2: ix - ux * GAP_ICON,   y2: iy - uy * GAP_ICON,
      gx1: cx, gy1: cy, gx2: ix, gy2: iy,
    }
  })

  return (
    <>
    {/* ── Mobile: static fallback (300vh scroll is unusable on phones) ── */}
    <div className="md:hidden py-16 px-5 relative overflow-hidden" style={{ background: '#f4f2ef' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #C9CDD6 1.2px, transparent 1.2px)', backgroundSize: '30px 30px', opacity: 0.28 }} />
      <div className="relative z-10 max-w-sm mx-auto">

        <FadeIn className="text-center mb-8">
          <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 400, fontSize: 22, color: '#111827', lineHeight: 1.38, letterSpacing: '-0.025em' }}>
            Your work is spread across{' '}
            <strong style={{ fontWeight: 800 }}>too many places?</strong>
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-4 gap-3 justify-items-center mb-10">
            {ICONS.map((ic, i) => (
              <img key={i} src={ic.src} alt={ic.label} width={52} height={52}
                style={{ objectFit: 'contain', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))' }} />
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.18} className="text-center mb-8">
          <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 36, color: '#0F172A', letterSpacing: '-0.04em', lineHeight: 1.0, margin: 0 }}>
            Say hi to{' '}<span style={{ color: '#4F46E5' }}>ClearWork.</span>
          </h2>
          <p style={{ marginTop: 8, fontSize: 14, color: '#6B7280' }}>Your client management platform.</p>
        </FadeIn>

        <FadeIn delay={0.26}>
          <div style={{ borderRadius: '12px 12px 0 0', overflow: 'hidden', boxShadow: '0 -4px 40px rgba(15,23,42,0.10)', border: '1px solid rgba(0,0,0,0.07)', borderBottom: 'none' }}>
            <img src="/screenshots/dashboard-reveal.png" alt="ClearWork dashboard" style={{ width: '100%', display: 'block' }} loading="lazy" />
          </div>
        </FadeIn>

      </div>
    </div>

    {/* ── Desktop: full 300vh scroll-driven animation ── */}
    <section ref={sectionRef} className="hidden md:block" style={{ height: '300vh' }}>
      <div ref={stickyRef} style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Backgrounds */}
        <div style={{ position: 'absolute', inset: 0, background: '#f4f2ef' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, backgroundImage: 'radial-gradient(circle, #C9CDD6 1.2px, transparent 1.2px)', backgroundSize: '30px 30px', opacity: 0.28 }} />
        <div style={{ position: 'absolute', zIndex: 1, left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '55vw', height: '55vw', maxWidth: 800, maxHeight: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(230,235,255,0.55) 0%, rgba(245,247,255,0.25) 50%, transparent 70%)', pointerEvents: 'none' }} />
        {/* Soft edge vignette — reduced opacity so edge icons stay visible */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', background: 'radial-gradient(ellipse 95% 90% at 50% 50%, transparent 45%, rgba(249,250,251,0.55) 100%)' }} />

        {/* Spoke lines */}
        <motion.svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: linesOpacity, zIndex: 3, pointerEvents: 'none' }} viewBox={`0 0 ${dims.w} ${dims.h}`} preserveAspectRatio="none">
          <defs>
            {lineSegments.map((seg, i) => seg && (
              <linearGradient key={i} id={`lg${i}`} x1={seg.gx1} y1={seg.gy1} x2={seg.gx2} y2={seg.gy2} gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#A0A8B8" stopOpacity="0.80" />
                <stop offset="100%" stopColor="#A0A8B8" stopOpacity="0.08" />
              </linearGradient>
            ))}
          </defs>
          {lineSegments.map((seg, i) => seg && (
            <line key={i} x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2} stroke={`url(#lg${i})`} strokeWidth="1.2" />
          ))}
        </motion.svg>

        {/* Icons */}
        {ICONS.map((ic, i) => (
          <AppIcon key={i} def={ic} index={i} scrollYProgress={scrollYProgress} vpW={dims.w} vpH={dims.h} />
        ))}

        {/* Center question text — hidden once campaign triggers */}
        {!campaignVisible && (
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 12, pointerEvents: 'none' }}>
            <motion.div style={{ opacity: centerOpacity, y: centerY, textAlign: 'center' }}>
              <div style={{ position: 'absolute', width: 330, height: 330, borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(237,240,255,1) 0%, rgba(242,244,255,0.75) 40%, transparent 72%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1, maxWidth: 260, margin: '0 auto', padding: '0 8px' }}>
                <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 400, fontSize: 'clamp(19px, 2vw, 26px)', color: '#111827', lineHeight: 1.38, letterSpacing: '-0.025em', margin: 0 }}>
                  Your work is spread across{' '}
                  <strong style={{ fontWeight: 800 }}>too many places?</strong>
                </p>
              </div>
            </motion.div>
          </div>
        )}

        {/* ── CAMPAIGN — headline + dashboard in one grouped container ── */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', zIndex: 22, pointerEvents: 'none' }}>

          {/* Headline sits directly above the dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={campaignVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center', marginBottom: 60 }}
          >
            <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 'clamp(32px, 4.5vw, 62px)', color: '#0F172A', letterSpacing: '-0.04em', lineHeight: 1.0, margin: 0 }}>
              Say hi to{' '}
              <span style={{ color: '#4F46E5' }}>ClearWork.</span>
            </h2>
            <p style={{ marginTop: 8, fontFamily: '"DM Sans", sans-serif', fontSize: 'clamp(13px, 1vw, 15px)', color: '#6B7280', fontWeight: 400 }}>
              Your client management platform.
            </p>
          </motion.div>

          {/* Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.93 }}
            animate={campaignVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.93 }}
            transition={{ duration: 0.80, ease: [0.22, 1, 0.36, 1], delay: 0.10 }}
            style={{ width: 'min(920px, 90vw)', transformOrigin: 'bottom center' }}
          >
            <div style={{ position: 'absolute', inset: '-16px -24px', borderRadius: 36, background: 'radial-gradient(ellipse at 50% 70%, rgba(99,102,241,0.10) 0%, transparent 65%)', filter: 'blur(14px)', pointerEvents: 'none' }} />
            <div style={{ borderRadius: '16px 16px 0 0', overflow: 'hidden', boxShadow: '0 -4px 60px rgba(15,23,42,0.12), 0 0 0 1px rgba(0,0,0,0.06)', position: 'relative' }}>
              <img src="/screenshots/dashboard-reveal.png" alt="ClearWork dashboard" style={{ width: '100%', display: 'block', maxHeight: '62vh', objectFit: 'cover', objectPosition: 'top' }} loading="lazy" />
            </div>
          </motion.div>
        </div>


      </div>
    </section>
    </>
  )
}
