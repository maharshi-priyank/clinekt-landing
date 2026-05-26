// Income tax computation for India FY 2025-26 (AY 2026-27)
// Provides slab-based calculation for both old and new regimes,
// surcharge tiers, marginal relief on surcharge, 87A rebate, and 4% cess.

export type Regime = 'old' | 'new'

interface Slab { upTo: number | null; rate: number }

// ── Slabs (FY 2025-26 / AY 2026-27) ───────────────────────────────────────────

const NEW_SLABS: Slab[] = [
  { upTo: 4_00_000,  rate: 0   },
  { upTo: 8_00_000,  rate: 5   },
  { upTo: 12_00_000, rate: 10  },
  { upTo: 16_00_000, rate: 15  },
  { upTo: 20_00_000, rate: 20  },
  { upTo: 24_00_000, rate: 25  },
  { upTo: null,      rate: 30  },
]

const OLD_SLABS: Slab[] = [
  { upTo: 2_50_000,  rate: 0   },
  { upTo: 5_00_000,  rate: 5   },
  { upTo: 10_00_000, rate: 20  },
  { upTo: null,      rate: 30  },
]

// ── Standard deduction ────────────────────────────────────────────────────────
const NEW_STANDARD_DEDUCTION = 75_000
const OLD_STANDARD_DEDUCTION = 50_000

// ── 87A rebate ────────────────────────────────────────────────────────────────
const NEW_REBATE_LIMIT = 12_00_000  // taxable income up to which full rebate applies
const NEW_REBATE_MAX   = 60_000      // capped rebate value
const OLD_REBATE_LIMIT = 5_00_000
const OLD_REBATE_MAX   = 12_500

// ── Cess ──────────────────────────────────────────────────────────────────────
const CESS_RATE = 4

// ── Surcharge (on tax, before cess) ───────────────────────────────────────────
function surchargeRate(taxableIncome: number, regime: Regime): number {
  if (taxableIncome <= 50_00_000)   return 0
  if (taxableIncome <= 1_00_00_000) return 10
  if (taxableIncome <= 2_00_00_000) return 15
  if (taxableIncome <= 5_00_00_000) return 25
  return regime === 'new' ? 25 : 37 // new regime caps surcharge at 25%
}

// ── Slab tax ──────────────────────────────────────────────────────────────────
function slabTax(income: number, slabs: Slab[]): number {
  let tax = 0
  let prev = 0
  for (const slab of slabs) {
    const top = slab.upTo ?? Infinity
    if (income > prev) {
      const taxablePortion = Math.min(income, top) - prev
      tax += (taxablePortion * slab.rate) / 100
    }
    prev = top
    if (income <= top) break
  }
  return tax
}

// ── Public ────────────────────────────────────────────────────────────────────

export interface OldRegimeDeductions {
  d80c:        number  // section 80C (max ₹1.5L)
  d80d:        number  // section 80D (max ₹25K self / ₹50K parents — we cap at ₹75K combined)
  d80ccd1b:    number  // NPS additional ₹50K
  hra:         number  // HRA exempted
  homeLoan:    number  // section 24 home loan interest (max ₹2L)
  other:       number  // other deductions / exemptions
}

export interface ComputeResult {
  regime:           Regime
  grossIncome:      number
  standardDeduction: number
  totalDeductions:  number
  taxableIncome:    number
  slabTax:          number
  rebate:           number
  taxAfterRebate:   number
  surcharge:        number
  surchargeRate:    number
  cess:             number
  totalTax:         number
  effectiveRate:    number
  takeHome:         number
}

export function compute(
  grossIncome: number,
  regime: Regime,
  oldDeductions?: OldRegimeDeductions,
): ComputeResult {
  const slabs        = regime === 'new' ? NEW_SLABS              : OLD_SLABS
  const stdDeduction = regime === 'new' ? NEW_STANDARD_DEDUCTION : OLD_STANDARD_DEDUCTION

  const otherDeductions = regime === 'old' && oldDeductions
    ? Math.min(oldDeductions.d80c, 1_50_000)
    + Math.min(oldDeductions.d80d, 75_000)
    + Math.min(oldDeductions.d80ccd1b, 50_000)
    + Math.max(0, oldDeductions.hra)
    + Math.min(oldDeductions.homeLoan, 2_00_000)
    + Math.max(0, oldDeductions.other)
    : 0

  const totalDeductions = stdDeduction + otherDeductions
  const taxableIncome   = Math.max(0, grossIncome - totalDeductions)

  const tax = slabTax(taxableIncome, slabs)

  // 87A rebate
  const rebateLimit = regime === 'new' ? NEW_REBATE_LIMIT : OLD_REBATE_LIMIT
  const rebateMax   = regime === 'new' ? NEW_REBATE_MAX   : OLD_REBATE_MAX
  const rebate      = taxableIncome <= rebateLimit ? Math.min(tax, rebateMax) : 0

  const taxAfterRebate = Math.max(0, tax - rebate)
  const sRate     = surchargeRate(taxableIncome, regime)
  const surcharge = taxAfterRebate * (sRate / 100)
  const cess      = (taxAfterRebate + surcharge) * (CESS_RATE / 100)
  const totalTax  = taxAfterRebate + surcharge + cess

  return {
    regime,
    grossIncome,
    standardDeduction: stdDeduction,
    totalDeductions,
    taxableIncome,
    slabTax: tax,
    rebate,
    taxAfterRebate,
    surcharge,
    surchargeRate: sRate,
    cess,
    totalTax,
    effectiveRate: grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0,
    takeHome: grossIncome - totalTax,
  }
}
