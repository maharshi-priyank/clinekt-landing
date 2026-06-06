# Logo on Documents Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a branded document header strip (logo or initial avatar + sender info on left, doc type/number/date/status on right) to all client-facing document views — Invoice, Proposal, Contract, and Client Portal.

**Architecture:** Create one shared `DocumentHeader` component used by Invoice, Proposal, and Contract pages. Client Portal gets a targeted fix to its existing header only (no shared component). Logo is profile-level: if `user.logoUrl` is set it shows everywhere; otherwise a blue initial avatar renders — zero visual regression.

**Tech Stack:** React, TypeScript, Tailwind CSS, `cn()` from `@/lib/utils`

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/components/documents/DocumentHeader.tsx` | Tinted strip component used by Invoice, Proposal, Contract |
| Modify | `src/pages/public/InvoiceViewPage.tsx` | Replace existing header top section with `<DocumentHeader>` |
| Modify | `src/pages/public/ProposalViewPage.tsx` | Prepend `<DocumentHeader>` inside hero card |
| Modify | `src/pages/public/ContractSignPage.tsx` | Prepend `<DocumentHeader>` inside hero card |
| Modify | `src/pages/public/ClientPortalPage.tsx` | Replace Roca-font fallback with initial avatar |

---

## Task 1: Create `DocumentHeader` component

**Files:**
- Create: `src/components/documents/DocumentHeader.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { cn } from '@/lib/utils'

interface DocumentHeaderProps {
  logoUrl:       string | null
  senderName:    string
  senderEmail:   string
  gstNumber?:    string | null
  docType:       'Invoice' | 'Proposal' | 'Contract'
  docIdentifier: string
  docDate:       string
  statusBadge?:  React.ReactNode
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function DocumentHeader({
  logoUrl, senderName, senderEmail, gstNumber,
  docType, docIdentifier, docDate, statusBadge,
}: DocumentHeaderProps) {
  const initial = senderName.charAt(0).toUpperCase()
  const isInvoice = docType === 'Invoice'

  return (
    <div
      className="flex items-center justify-between px-7 py-5 bg-[#F8F9FF] border-b border-[#EAECF0]"
      style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' } as React.CSSProperties}
    >
      {/* Left — logo / avatar + sender info */}
      <div className="flex items-center gap-3">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={senderName}
            className="h-10 w-auto max-w-[140px] object-contain rounded-lg"
          />
        ) : (
          <div className="w-11 h-11 rounded-xl bg-[#2563EB] flex items-center justify-center text-white text-[17px] font-bold shrink-0">
            {initial}
          </div>
        )}
        <div>
          <p className="text-[14px] font-bold text-[#101828] leading-snug">{senderName}</p>
          <p className="text-[11px] text-[#667085]">{senderEmail}</p>
          {gstNumber && (
            <p className="text-[10px] text-[#98A2B3] mt-0.5">GST: {gstNumber}</p>
          )}
        </div>
      </div>

      {/* Right — doc type, identifier, date, status */}
      <div className="text-right">
        <p className="text-[10px] font-semibold text-[#98A2B3] uppercase tracking-widest mb-1">
          {docType}
        </p>
        <p className={cn(
          'font-extrabold text-[#101828] leading-snug',
          isInvoice ? 'text-[19px]' : 'text-[15px] max-w-[200px]',
        )}>
          {docIdentifier}
        </p>
        <p className="text-[11px] text-[#667085] mt-1">{fmtDate(docDate)}</p>
        {statusBadge && <div className="mt-1.5">{statusBadge}</div>}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-app && npx tsc --noEmit 2>&1 | head -20
```

Expected: no output (zero errors).

- [ ] **Step 3: Commit**

```bash
git add src/components/documents/DocumentHeader.tsx
git commit -m "feat: add DocumentHeader component — tinted strip with logo/avatar"
```

---

## Task 2: Wire `DocumentHeader` into InvoiceViewPage

**Files:**
- Modify: `src/pages/public/InvoiceViewPage.tsx`

Context: The header card currently starts at line ~222 with a `<div className="bg-white rounded-2xl ...">`. Inside it, the first child div (lines ~223–243) contains the FileText icon, "Invoice" label, status badge, invoice number, and date. This entire first child div is replaced by `<DocumentHeader>`.

The `STATUS_STYLES` record is already defined in the file and maps invoice status strings to Tailwind class strings.

- [ ] **Step 1: Add the import**

At the top of `src/pages/public/InvoiceViewPage.tsx`, after the existing imports, add:

```tsx
import DocumentHeader from '@/components/documents/DocumentHeader'
```

- [ ] **Step 2: Replace the header card's top section**

Find this block (starts around line 222):

```tsx
        {/* Header card */}
        <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm overflow-hidden">
          <div className="px-7 py-7 border-b border-[#F2F4F7]">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={15} className="text-[#2563EB]" />
              <span className="text-[11px] font-semibold text-[#98A2B3] uppercase tracking-widest">Invoice</span>
              <span className={cn(
                'ml-auto text-[11px] font-bold px-2.5 py-0.5 rounded-full',
                STATUS_STYLES[invoice.status] ?? 'bg-[#F2F4F7] text-[#667085]',
              )}>
                {invoice.status}
              </span>
            </div>
            <h1 className="text-[22px] font-extrabold text-[#101828]">
              {invoice.invoiceNumber}
              {currency !== 'INR' && (
                <span className="ml-2 inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB]">
                  {currency}
                </span>
              )}
            </h1>
            <p className="text-[13px] text-[#667085] mt-1">{fmtDate(invoice.createdAt)}</p>
          </div>
```

Replace with:

```tsx
        {/* Header card */}
        <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm overflow-hidden">
          <DocumentHeader
            logoUrl={invoice.user.logoUrl}
            senderName={senderName}
            senderEmail={invoice.user.email}
            gstNumber={invoice.user.gstNumber}
            docType="Invoice"
            docIdentifier={invoice.invoiceNumber}
            docDate={invoice.createdAt}
            statusBadge={
              <span className={cn('text-[10px] font-bold px-2.5 py-0.5 rounded-full', STATUS_STYLES[invoice.status] ?? 'bg-[#F2F4F7] text-[#667085]')}>
                {invoice.status}
              </span>
            }
          />
```

Note: the `FileText` icon import can remain (it may be used elsewhere in the file — check before removing).

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-app && npx tsc --noEmit 2>&1 | head -20
```

Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add src/pages/public/InvoiceViewPage.tsx
git commit -m "feat: DocumentHeader in invoice view"
```

---

## Task 3: Wire `DocumentHeader` into ProposalViewPage

**Files:**
- Modify: `src/pages/public/ProposalViewPage.tsx`

Context: The proposal hero card starts around line 368: `<div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm overflow-hidden">`. Inside it, the first child div (lines ~369–383) contains `"Proposal"` label, the `<h1>` title, and the from/date metadata row. Replace this first child div with `<DocumentHeader>` followed by the existing title+metadata block — but since the title is already shown in `docIdentifier` in the strip, keep the existing title heading in the card body for full display (the strip title is truncated at 200px; the full title appears below as always).

The `status` variable is already derived: `const status = actionDone === 'accepted' ? 'ACCEPTED' : actionDone === 'declined' ? 'DECLINED' : proposal.status`

The status badge colour logic for proposals:
- `ACCEPTED` → `bg-[#ECFDF3] text-[#027A48]`
- `DECLINED` / `EXPIRED` → `bg-[#FEF3F2] text-[#B42318]`
- `SENT` / `OPENED` → `bg-[#EFF8FF] text-[#175CD3]`
- default → `bg-[#F2F4F7] text-[#667085]`

- [ ] **Step 1: Add the import**

At the top of `src/pages/public/ProposalViewPage.tsx`, after the existing imports:

```tsx
import DocumentHeader from '@/components/documents/DocumentHeader'
```

- [ ] **Step 2: Add status badge helper constant**

After the `senderName` / `status` / `canAct` declarations, add:

```tsx
  const PROPOSAL_STATUS_STYLES: Record<string, string> = {
    ACCEPTED: 'bg-[#ECFDF3] text-[#027A48]',
    DECLINED:  'bg-[#FEF3F2] text-[#B42318]',
    EXPIRED:   'bg-[#FEF3F2] text-[#B42318]',
    SENT:      'bg-[#EFF8FF] text-[#175CD3]',
    OPENED:    'bg-[#EFF8FF] text-[#175CD3]',
  }
```

- [ ] **Step 3: Replace the hero card's first section**

Find this block (around line 368):

```tsx
        {/* ── Hero ── */}
        <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm overflow-hidden">
          <div className="px-8 py-8 border-b border-[#F2F4F7]">
            <p className="text-[11px] font-semibold text-[#98A2B3] uppercase tracking-widest mb-2">Proposal</p>
            <h1 className="text-[26px] font-extrabold text-[#101828] leading-tight">{proposal.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-[12px] text-[#667085]">
              <span>From <span className="font-semibold text-[#344054]">{senderName}</span></span>
              <span className="text-[#D0D5DD]">·</span>
              <span>Created {fmtDate(proposal.createdAt)}</span>
              {proposal.validUntil && (
                <>
                  <span className="text-[#D0D5DD]">·</span>
                  <span>Valid until <span className="font-semibold text-[#344054]">{fmtDate(proposal.validUntil)}</span></span>
                </>
              )}
            </div>
          </div>
```

Replace with:

```tsx
        {/* ── Hero ── */}
        <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm overflow-hidden">
          <DocumentHeader
            logoUrl={proposal.user.logoUrl}
            senderName={senderName}
            senderEmail={proposal.user.email}
            docType="Proposal"
            docIdentifier={proposal.title}
            docDate={proposal.createdAt}
            statusBadge={
              <span className={cn('text-[10px] font-bold px-2.5 py-0.5 rounded-full', PROPOSAL_STATUS_STYLES[status] ?? 'bg-[#F2F4F7] text-[#667085]')}>
                {status}
              </span>
            }
          />
          <div className="px-8 py-8 border-b border-[#F2F4F7]">
            <h1 className="text-[26px] font-extrabold text-[#101828] leading-tight">{proposal.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-[12px] text-[#667085]">
              <span>From <span className="font-semibold text-[#344054]">{senderName}</span></span>
              <span className="text-[#D0D5DD]">·</span>
              <span>Created {fmtDate(proposal.createdAt)}</span>
              {proposal.validUntil && (
                <>
                  <span className="text-[#D0D5DD]">·</span>
                  <span>Valid until <span className="font-semibold text-[#344054]">{fmtDate(proposal.validUntil)}</span></span>
                </>
              )}
            </div>
          </div>
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-app && npx tsc --noEmit 2>&1 | head -20
```

Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add src/pages/public/ProposalViewPage.tsx
git commit -m "feat: DocumentHeader in proposal view"
```

---

## Task 4: Wire `DocumentHeader` into ContractSignPage

**Files:**
- Modify: `src/pages/public/ContractSignPage.tsx`

Context: The contract hero card starts around line 184: `<div className="bg-white rounded-2xl border ...">`. Inside, the first child (lines ~185–201) contains the FileSignature icon, "Contract" label, title `<h1>`, and from/to/date metadata. Replace this first child div with `<DocumentHeader>` + keep the title block below.

`isAlreadySigned` is already declared: `const isAlreadySigned = contract.status === 'SIGNED' || !!signed`

Contract status badge colours:
- `SIGNED` → `bg-[#ECFDF3] text-[#027A48]`
- `PENDING` → `bg-[#F9F5FF] text-[#6941C6]`
- `DECLINED` → `bg-[#FEF3F2] text-[#B42318]`
- default → `bg-[#F2F4F7] text-[#667085]`

- [ ] **Step 1: Add the import**

At the top of `src/pages/public/ContractSignPage.tsx`, after existing imports:

```tsx
import DocumentHeader from '@/components/documents/DocumentHeader'
```

- [ ] **Step 2: Add status badge helper constant**

After `isAlreadySigned` / `displayContract` declarations:

```tsx
  const CONTRACT_STATUS_STYLES: Record<string, string> = {
    SIGNED:   'bg-[#ECFDF3] text-[#027A48]',
    PENDING:  'bg-[#F9F5FF] text-[#6941C6]',
    DECLINED: 'bg-[#FEF3F2] text-[#B42318]',
  }
  const contractStatus = isAlreadySigned ? 'SIGNED' : contract.status
```

- [ ] **Step 3: Replace the hero card's first section**

Find this block (around line 184):

```tsx
        {/* Hero */}
        <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm overflow-hidden">
          <div className="px-8 py-8 border-b border-[#F2F4F7]">
            <div className="flex items-center gap-2 mb-3">
              <FileSignature size={16} className="text-[#2563EB]" />
              <span className="text-[11px] font-semibold text-[#98A2B3] uppercase tracking-widest">Contract</span>
            </div>
            <h1 className="text-[22px] font-extrabold text-[#101828] leading-tight">{contract.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-[12px] text-[#667085]">
              <span>From <span className="font-semibold text-[#344054]">{senderName}</span></span>
              {contract.client && (
                <>
                  <span className="text-[#D0D5DD]">·</span>
                  <span>To <span className="font-semibold text-[#344054]">{contract.client.name}</span></span>
                </>
              )}
              <span className="text-[#D0D5DD]">·</span>
              <span>{fmtDate(contract.createdAt)}</span>
            </div>
          </div>
```

Replace with:

```tsx
        {/* Hero */}
        <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm overflow-hidden">
          <DocumentHeader
            logoUrl={contract.user.logoUrl}
            senderName={senderName}
            senderEmail={contract.user.email}
            docType="Contract"
            docIdentifier={contract.title}
            docDate={contract.createdAt}
            statusBadge={
              <span className={cn('text-[10px] font-bold px-2.5 py-0.5 rounded-full', CONTRACT_STATUS_STYLES[contractStatus] ?? 'bg-[#F2F4F7] text-[#667085]')}>
                {contractStatus}
              </span>
            }
          />
          <div className="px-8 py-8 border-b border-[#F2F4F7]">
            <h1 className="text-[22px] font-extrabold text-[#101828] leading-tight">{contract.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-[12px] text-[#667085]">
              <span>From <span className="font-semibold text-[#344054]">{senderName}</span></span>
              {contract.client && (
                <>
                  <span className="text-[#D0D5DD]">·</span>
                  <span>To <span className="font-semibold text-[#344054]">{contract.client.name}</span></span>
                </>
              )}
              <span className="text-[#D0D5DD]">·</span>
              <span>{fmtDate(contract.createdAt)}</span>
            </div>
          </div>
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-app && npx tsc --noEmit 2>&1 | head -20
```

Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add src/pages/public/ContractSignPage.tsx
git commit -m "feat: DocumentHeader in contract view"
```

---

## Task 5: Upgrade Client Portal header avatar fallback

**Files:**
- Modify: `src/pages/public/ClientPortalPage.tsx`

Context: The portal sticky header (around line 130–150) already handles `data.freelancer.logoUrl` correctly — it shows the logo image when present. The fallback (no logo) currently renders the business name in a custom Roca font with no avatar. Replace this fallback with a consistent initial-avatar + name, matching the style used in document headers.

- [ ] **Step 1: Find the no-logo fallback in the portal header**

Locate this block (around line 141):

```tsx
            ) : (
              <span style={{ fontFamily: "'Roca Two', serif", fontWeight: 700, fontSize: 22, letterSpacing: '-0.05em', color: '#101828', lineHeight: 1 }}>
                {freelancerName}
              </span>
            )}
```

Replace with:

```tsx
            ) : (
              <>
                <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white text-[13px] font-bold shrink-0">
                  {freelancerName.charAt(0).toUpperCase()}
                </div>
                <span className="text-[13px] font-bold text-[#101828]">{freelancerName}</span>
              </>
            )}
```

Note: the `<span>` for `freelancerName` that follows the logo block (line ~138) is already there when the logo IS present — make sure you are only replacing the else branch, not the logo branch.

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-app && npx tsc --noEmit 2>&1 | head -20
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add src/pages/public/ClientPortalPage.tsx
git commit -m "feat: consistent avatar fallback in client portal header"
```

---

## Task 6: Final verification

- [ ] **Step 1: Full TypeScript check both repos**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-app && npx tsc --noEmit 2>&1
```

Expected: no output.

- [ ] **Step 2: Visual smoke test**

Open these URLs (assuming the dev server is running on port 5174):
- An existing invoice public link → should show tinted strip with avatar/logo, invoice number on right
- An existing proposal public link → should show strip above the title card
- An existing contract public link → should show strip above the title card
- The client portal → no-logo fallback should show blue initial avatar instead of Roca text

- [ ] **Step 3: Upload a logo in Settings → Profile, revisit all four pages**

Logo should appear in the strip on all three document views and in the portal header.

- [ ] **Step 4: Remove logo from profile, revisit**

Blue initial avatar should appear everywhere — zero visual regression.
