export const TOOLS = [
  {
    href:    '/tools/gst-invoice-generator',
    title:   'GST Invoice Generator',
    desc:    'Create professional GST invoices with auto CGST/SGST/IGST split and PDF download.',
    tags:    ['GST', 'Invoice', 'PDF'],
    popular: true,
  },
  {
    href:    '/tools/quote-generator',
    title:   'Quote / Estimate Generator',
    desc:    'Build a professional quotation with line items, optional GST, and PDF download.',
    tags:    ['Quote', 'Estimate', 'PDF'],
    popular: false,
  },
  {
    href:    '/tools/freelance-contract-generator',
    title:   'Freelance Contract Generator',
    desc:    'Generate a legally-worded freelance service agreement with IP transfer and terms.',
    tags:    ['Contract', 'Legal', 'PDF'],
    popular: true,
  },
  {
    href:    '/tools/gst-calculator',
    title:   'GST Calculator',
    desc:    'Add or remove GST at any rate with CGST/SGST/IGST split by state.',
    tags:    ['GST', 'Calculator'],
    popular: false,
  },
  {
    href:    '/tools/tds-calculator',
    title:   'TDS Calculator',
    desc:    'Calculate TDS under Sections 194J, 194JA, 194JB, and 194C with threshold detection.',
    tags:    ['TDS', 'Tax', 'Calculator'],
    popular: false,
  },
  {
    href:    '/tools/hourly-rate-calculator',
    title:   'Hourly Rate Calculator',
    desc:    'Work backwards from your income target to a minimum hourly rate after GST and TDS.',
    tags:    ['Pricing', 'Calculator'],
    popular: false,
  },
  {
    href:    '/tools/income-tax-calculator',
    title:   'Income Tax Calculator',
    desc:    'Compare old vs new tax regime for FY 2025-26 with deductions.',
    tags:    ['Income Tax', 'Calculator'],
    popular: false,
  },
  {
    href:    '/tools/invoice-number-generator',
    title:   'Invoice Number Generator',
    desc:    'Generate compliant invoice numbers with custom prefix, year, and sequence.',
    tags:    ['Invoice', 'Numbering'],
    popular: false,
  },
] as const

export type Tool = typeof TOOLS[number]
