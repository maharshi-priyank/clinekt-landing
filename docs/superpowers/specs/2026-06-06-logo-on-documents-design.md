# Logo on Documents — Design Spec

## Goal

Show the freelancer's business logo prominently inside every client-facing document (invoice, proposal, contract, client portal). Logo is optional and profile-level — set once, appears everywhere. If no logo is uploaded, the existing initial-avatar fallback renders unchanged.

## Scope

- `InvoiceViewPage.tsx`
- `ProposalViewPage.tsx`
- `ContractSignPage.tsx`
- `ClientPortalPage.tsx` (header upgrade only — no DocumentHeader component)

Not in scope: per-document logo toggle, logo in internal app views (editor, list pages), email notifications.

---

## Design Decisions

### Logo source
`user.logoUrl` from the API. Already stored on the User model and returned by `GET /users/me` and all document endpoints. No backend changes required.

### Profile-level only
No per-document toggle. Upload logo → shows on all documents. No logo → initial avatar on all documents. Clean, zero maintenance.

### Sticky nav bar
Unchanged. The nav bar already shows the logo (h-8) alongside the business name. No modification.

---

## Shared Component — `DocumentHeader`

**File:** `src/components/documents/DocumentHeader.tsx`

Used by Invoice, Proposal, and Contract views. Not used by Client Portal (which has its own header structure).

### Props

```ts
interface DocumentHeaderProps {
  logoUrl:      string | null
  senderName:   string
  senderEmail:  string
  gstNumber?:   string | null
  docType:      'Invoice' | 'Proposal' | 'Contract'
  docIdentifier: string        // invoice number (e.g. #INV-0042) OR proposal/contract title
  docDate:      string         // ISO date string, formatted inside component
  statusBadge?: React.ReactNode  // coloured pill — passed in by each page, varies per doc type
}
```

### Layout — Option A (tinted strip)

```
┌──────────────────────────────────────────────────────────┐
│  bg-[#F8F9FF]  border-b border-[#EAECF0]  px-7 py-5     │
│  print-color-adjust: exact                                │
│                                                           │
│  [logo | avatar]  senderName          docType label       │
│                   senderEmail         docIdentifier       │
│                   GST (if set)        docDate             │
│                                       statusBadge         │
└──────────────────────────────────────────────────────────┘
```

**Left side:**
- If `logoUrl`: `<img src={logoUrl} className="h-10 w-auto max-w-[140px] object-contain rounded-lg" />`
- If no `logoUrl`: `<div className="w-11 h-11 rounded-xl bg-[#2563EB] flex items-center justify-center text-white text-[17px] font-bold">{initial}</div>`
- `senderName` — `text-[14px] font-bold text-[#101828]`
- `senderEmail` — `text-[11px] text-[#667085]`
- `gstNumber` (if present) — `text-[10px] text-[#98A2B3]` prefixed with "GST: "

**Right side (text-right):**
- `docType` — `text-[10px] font-semibold text-[#98A2B3] uppercase tracking-widest`
- `docIdentifier` — `text-[19px] font-extrabold text-[#101828]` for Invoice numbers; `text-[15px] font-bold text-[#101828] max-w-[200px]` for Proposal/Contract titles (can be long)
- `docDate` — `text-[11px] text-[#667085]` formatted as "6 Jun 2026"
- `statusBadge` — rendered as-is (ReactNode passed from parent)

**Print:** The strip div must include `style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}` so the tinted background survives PDF export.

---

## InvoiceViewPage.tsx

**Replace** the current top section of the header card (the `div` containing the FileText icon, "Invoice" label, status badge, invoice number, and date) with `<DocumentHeader>`.

```tsx
<DocumentHeader
  logoUrl={invoice.user.logoUrl}
  senderName={senderName}
  senderEmail={invoice.user.email}
  gstNumber={invoice.user.gstNumber}
  docType="Invoice"
  docIdentifier={invoice.invoiceNumber}
  docDate={invoice.createdAt}
  statusBadge={
    <span className={cn('text-[10px] font-bold px-2.5 py-0.5 rounded-full', STATUS_STYLES[invoice.status])}>
      {invoice.status}
    </span>
  }
/>
```

The From/To grid and everything below remains untouched.

---

## ProposalViewPage.tsx

The proposal document card currently starts with the proposal title + "From …" metadata directly. **Prepend** `<DocumentHeader>` above the title block inside the card.

```tsx
<DocumentHeader
  logoUrl={proposal.user.logoUrl}
  senderName={senderName}
  senderEmail={proposal.user.email}
  docType="Proposal"
  docIdentifier={proposal.title}
  docDate={proposal.createdAt}
  statusBadge={
    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EFF8FF] text-[#175CD3]">
      {status}
    </span>
  }
/>
```

Existing proposal title heading, pricing, scope sections — all unchanged.

---

## ContractSignPage.tsx

Same pattern as Proposal. **Prepend** `<DocumentHeader>` inside the document card, above the contract title.

```tsx
<DocumentHeader
  logoUrl={contract.user.logoUrl}
  senderName={senderName}
  senderEmail={contract.user.email}
  docType="Contract"
  docIdentifier={contract.title}
  docDate={contract.createdAt}
  statusBadge={
    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#F9F5FF] text-[#6941C6]">
      {isAlreadySigned ? 'SIGNED' : contract.status}
    </span>
  }
/>
```

---

## ClientPortalPage.tsx — Header Upgrade

The portal has its own sticky header (not a document card). No `DocumentHeader` component used here. Instead, upgrade the existing fallback (currently renders just the business name in Roca font when no logo) to match the new avatar style:

**Current (no logo):**
```tsx
<span style={{ fontFamily: "'Roca Two', serif", ... }}>{freelancerName}</span>
```

**Updated (no logo):**
```tsx
<div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white text-[13px] font-bold">
  {freelancerName.charAt(0).toUpperCase()}
</div>
<span className="text-[13px] font-bold text-[#101828]">{freelancerName}</span>
```

This makes the portal header consistent with document headers — logo shows as image, no logo shows as initial avatar, both with the same size/style.

---

## File Summary

| Action | File |
|--------|------|
| Create | `src/components/documents/DocumentHeader.tsx` |
| Modify | `src/pages/public/InvoiceViewPage.tsx` |
| Modify | `src/pages/public/ProposalViewPage.tsx` |
| Modify | `src/pages/public/ContractSignPage.tsx` |
| Modify | `src/pages/public/ClientPortalPage.tsx` |

No backend changes. No DB migrations. No new dependencies.
