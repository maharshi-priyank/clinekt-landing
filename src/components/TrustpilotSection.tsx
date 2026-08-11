import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function TrustpilotSection() {
  const ref    = useRef<HTMLDivElement>(null)
  const widget = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  // Trustpilot's bootstrap script auto-initialises widgets it finds on load,
  // but since this component mounts after the script has already run we need
  // to manually trigger initialisation on mount.
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tp = (window as any).Trustpilot
    if (tp && widget.current) {
      tp.loadFromElement(widget.current, true)
    }
  }, [])

  return (
    <section ref={ref} className="py-16 px-5" style={{ background: '#FFFFFF' }}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="text-center mb-8"
        >
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            Reviews
          </p>
          <h3 className="text-2xl font-bold text-gray-900">
            Trusted by Indian freelancers
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Using ClearWork? Share your experience and help others decide.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease }}
        >
          {/* TrustBox widget — Review Collector */}
          <div
            ref={widget}
            className="trustpilot-widget"
            data-locale="en-US"
            data-template-id="56278e9abfbbba0bdcd568bc"
            data-businessunit-id="6a377673deb2e4ff01db5947"
            data-style-height="52px"
            data-style-width="100%"
            data-token="4a8c610b-a2b7-42f9-a1d9-680261c80820"
            data-theme="light"
          >
            <a
              href="https://www.trustpilot.com/review/getclearwork.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#00b67a] font-semibold hover:underline"
            >
              Review ClearWork on Trustpilot
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
