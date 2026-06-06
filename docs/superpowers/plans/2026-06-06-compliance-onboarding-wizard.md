# GST Compliance + Onboarding Wizard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add HSN/SAC codes + international invoicing (LUT zero-rated) to the invoice flow, move Razorpay keys to per-user storage, and build a 5-step onboarding wizard that gets new users to their first compliant document in one session.

**Architecture:** Compliance fields are additive DB columns + JSON shape extensions (no breaking changes). Per-user Razorpay keys replace the global env var pattern across `portal.service.ts` and `proposals.service.ts`. The wizard is a single React component rendered as a full-screen overlay inside `AppShell`, gated by `user.onboardingComplete`.

**Tech Stack:** NestJS + Prisma (API), React + Vite + TanStack Query + React Hook Form + Framer Motion + canvas-confetti (App)

---

## File Map

### API (`pakka-api`)
| File | Change |
|------|--------|
| `prisma/schema.prisma` | Add 5 fields to `User`, 3 fields to `Invoice` |
| `prisma/seed-onboarding.ts` | One-time script: set `onboardingComplete=true` for existing users |
| `src/modules/invoices/dto/create-invoice.dto.ts` | Add `hsnSac?: string` to `LineItemDto`; add `currency`, `exchangeRate`, `lutNumber` to `CreateInvoiceDto` |
| `src/modules/invoices/invoices.service.ts` | Skip GST when `currency !== 'INR'`; copy `lutNumber` from user at creation |
| `src/modules/portal/portal.service.ts` | Replace global Razorpay singleton with per-user key lookup |
| `src/modules/proposals/proposals.service.ts` | Replace constructor-level Razorpay with per-request key lookup |
| `src/modules/users/dto/upsert-user.dto.ts` | Add `defaultHsnSac`, `defaultLutNumber`, `razorpayKeyId`, `razorpayKeySecret`, `onboardingComplete` |

### App (`pakka-app`)
| File | Change |
|------|--------|
| `src/features/settings/hooks/useProfile.ts` | Add new fields to `UserProfile` interface |
| `src/features/invoices/schemas/invoice.schema.ts` | Add `hsnSac?: string` to `LineItem`; add `currency`, `lutNumber` to form schema |
| `src/features/invoices/components/InvoiceEditor.tsx` | HSN/SAC input per line item; currency dropdown; international mode (GST collapses, LUT field) |
| `src/pages/public/InvoiceViewPage.tsx` | HSN/SAC column in line items table; LUT declaration footer; currency-aware symbols and display |
| `src/features/settings/components/ProfileTab.tsx` | Add Compliance card (defaultHsnSac, defaultLutNumber) + Payments card (bank fields, Razorpay keys) |
| `src/features/onboarding/OnboardingWizard.tsx` | **NEW** — 5-step split-panel wizard, Framer Motion transitions, canvas-confetti |
| `src/components/layout/AppShell.tsx` | Show `<OnboardingWizard>` when `!user.onboardingComplete` |

---

## Task 1: DB Migration

**Files:**
- Modify: `pakka-api/prisma/schema.prisma`
- Create: `pakka-api/prisma/seed-onboarding.ts`

- [ ] **Step 1: Add fields to schema**

Open `pakka-api/prisma/schema.prisma`. In the `User` model, add after the `upiQrUrl` field:

```prisma
  defaultHsnSac           String?
  defaultLutNumber        String?
  onboardingComplete      Boolean  @default(false)
  razorpayKeyId           String?
  razorpayKeySecret       String?
```

In the `Invoice` model, add after the `tdsRate` field:

```prisma
  currency      String   @default("INR")
  exchangeRate  Decimal?
  lutNumber     String?
```

- [ ] **Step 2: Generate and run migration**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-api
npx prisma migrate dev --name add_compliance_and_onboarding_fields
```

Expected: Migration created and applied, Prisma Client regenerated.

- [ ] **Step 3: Create the backfill script**

Create `pakka-api/prisma/seed-onboarding.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const result = await prisma.user.updateMany({
    where: { onboardingComplete: false },
    data:  { onboardingComplete: true },
  })
  console.log(`Set onboardingComplete=true for ${result.count} existing users`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

- [ ] **Step 4: Run the backfill**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-api
npx ts-node --project tsconfig.json prisma/seed-onboarding.ts
```

Expected output: `Set onboardingComplete=true for N existing users`

- [ ] **Step 5: Commit**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-api
git add prisma/schema.prisma prisma/migrations/ prisma/seed-onboarding.ts
git commit -m "feat: add compliance + onboarding fields to User and Invoice models"
```

---

## Task 2: Per-User Razorpay Key Migration (Backend)

**Files:**
- Modify: `pakka-api/src/modules/portal/portal.service.ts`
- Modify: `pakka-api/src/modules/proposals/proposals.service.ts`

### portal.service.ts

- [ ] **Step 1: Replace the global Razorpay singleton**

Current `portal.service.ts` has a class-level `private _razorpay: Razorpay | null` singleton initialized lazily from `config.get('razorpay.keyId')`. Replace the entire class with per-request key lookup:

Remove the `_razorpay` field and the `get razorpay()` getter. Add this private method instead:

```typescript
private makeRazorpay(keyId: string | null, keySecret: string | null): Razorpay {
  if (!keyId || !keySecret) {
    throw new BadRequestException('Connect your Razorpay account in Settings to enable online payments')
  }
  return new Razorpay({ key_id: keyId, key_secret: keySecret })
}
```

- [ ] **Step 2: Update `createInvoiceOrder` to use user keys**

Currently `createInvoiceOrder` looks up the client and invoice but never fetches the user's keys. Update the client lookup to also include the user's Razorpay keys:

```typescript
async createInvoiceOrder(token: string, invoiceId: string) {
  const client = await this.prisma.client.findUnique({
    where: { portalToken: token },
    include: {
      user: { select: { razorpayKeyId: true, razorpayKeySecret: true } },
    },
  });
  if (!client) throw new NotFoundException('Portal link is invalid or has expired');

  const invoice = await this.prisma.invoice.findFirst({
    where: { id: invoiceId, clientId: client.id },
  });
  if (!invoice) throw new NotFoundException('Invoice not found');
  if (!['SENT', 'OVERDUE', 'VIEWED'].includes(invoice.status)) {
    throw new BadRequestException('Invoice is not payable');
  }

  const razorpay = this.makeRazorpay(
    client.user.razorpayKeyId,
    client.user.razorpayKeySecret,
  );

  const amountPaise = Math.round(Number(invoice.total) * 100);
  const order = await (razorpay.orders.create as any)({
    amount:   amountPaise,
    currency: 'INR',
    receipt:  invoice.invoiceNumber,
  });

  await this.prisma.invoice.update({
    where: { id: invoiceId },
    data:  { razorpayOrderId: order.id },
  });

  return {
    orderId:  order.id,
    amount:   amountPaise,
    currency: 'INR',
    keyId:    client.user.razorpayKeyId,
  };
}
```

Also remove the `ConfigService` import and constructor injection from `portal.service.ts` if it's only used for Razorpay (check first — if it's used elsewhere, keep it):

```typescript
// Check: grep for config.get in portal.service.ts beyond razorpay usage
// If only razorpay — remove ConfigService from constructor
constructor(
  private readonly prisma: PrismaService,
  // Remove: private readonly config: ConfigService,
) {}
```

- [ ] **Step 3: Update the module if ConfigService removed**

If `ConfigService` was removed from `portal.service.ts`, check `portal.module.ts` and remove it from `imports` if no other service in the module uses it.

### proposals.service.ts

- [ ] **Step 4: Remove constructor-level Razorpay instantiation**

In `proposals.service.ts`, the current constructor instantiates Razorpay with global env keys:

```typescript
// REMOVE this from constructor:
this.razorpay = new Razorpay({
  key_id:     this.config.get<string>('razorpay.keyId')!,
  key_secret: this.config.get<string>('razorpay.keySecret')!,
});
```

Remove the `private readonly razorpay: Razorpay` class field.

Add the same `makeRazorpay` helper:

```typescript
private makeRazorpay(keyId: string | null, keySecret: string | null): Razorpay {
  if (!keyId || !keySecret) {
    throw new BadRequestException('Connect your Razorpay account in Settings to enable online payments')
  }
  return new Razorpay({ key_id: keyId, key_secret: keySecret })
}
```

- [ ] **Step 5: Find all places in proposals.service.ts that use `this.razorpay`**

```bash
grep -n "this\.razorpay\|this\.config\.get.*razorpay" /Users/mvaghela/Documents/MyProjects/pakka-api/src/modules/proposals/proposals.service.ts
```

For each usage (typically `createDepositOrder` and `verifyDeposit`), fetch the user's keys from DB first:

```typescript
// Example pattern for createDepositOrder:
async createDepositOrder(userId: string, proposalId: string) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
    select: { razorpayKeyId: true, razorpayKeySecret: true },
  });
  const razorpay = this.makeRazorpay(user?.razorpayKeyId ?? null, user?.razorpayKeySecret ?? null);
  // ... rest of existing logic using local `razorpay` variable instead of `this.razorpay`
}
```

Apply the same pattern to every method that previously used `this.razorpay`.

- [ ] **Step 6: Type-check**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-api
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 7: Commit**

```bash
git add src/modules/portal/portal.service.ts src/modules/proposals/proposals.service.ts
git commit -m "fix: move Razorpay key storage from env config to per-user DB fields"
```

---

## Task 3: Backend Invoice Service — Currency + LUT + Zero-Rated GST

**Files:**
- Modify: `pakka-api/src/modules/invoices/dto/create-invoice.dto.ts`
- Modify: `pakka-api/src/modules/invoices/invoices.service.ts`

- [ ] **Step 1: Extend LineItemDto with hsnSac**

In `create-invoice.dto.ts`, find `LineItemDto` and add:

```typescript
@ApiPropertyOptional()
@IsOptional()
@IsString()
hsnSac?: string;
```

- [ ] **Step 2: Add currency/exchangeRate/lutNumber to CreateInvoiceDto**

In `CreateInvoiceDto`, add:

```typescript
@ApiPropertyOptional({ default: 'INR', enum: ['INR', 'USD', 'EUR', 'GBP', 'AED'] })
@IsOptional()
@IsString()
currency?: string;

@ApiPropertyOptional()
@IsOptional()
@IsNumber()
exchangeRate?: number;

@ApiPropertyOptional()
@IsOptional()
@IsString()
lutNumber?: string;
```

Add `IsNumber` to the class-validator imports if not already there.

- [ ] **Step 3: Update invoices.service.ts create() method**

In `invoices.service.ts`, the `create()` method at line 98 currently calls `calcTotals(dto.lineItems, gstType)` unconditionally. Update it to skip GST when currency is non-INR and to copy `lutNumber` from the user profile if not provided:

```typescript
async create(userId: string, dto: CreateInvoiceDto) {
  const currency = dto.currency ?? 'INR';
  const isExport = currency !== 'INR';

  // For export invoices, force EXEMPT so calcTotals skips GST entirely
  const gstType = isExport ? GstType.EXEMPT : (dto.gstType ?? GstType.IGST);
  const { subtotal, gstAmount, total } = calcTotals(dto.lineItems, gstType);

  // Copy lutNumber from user profile if not supplied on the invoice
  let lutNumber = dto.lutNumber ?? null;
  if (isExport && !lutNumber) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { defaultLutNumber: true },
    });
    lutNumber = user?.defaultLutNumber ?? null;
  }

  const now = new Date();
  const recurrenceNextDate =
    dto.isRecurring && dto.recurrenceCycle && dto.recurrenceDay
      ? this.computeNextRecurrenceDate(now, dto.recurrenceCycle, dto.recurrenceDay)
      : null;

  return createInvoiceWithRetry(this.prisma, userId, {
    userId,
    contractId:        dto.contractId,
    clientId:          dto.clientId,
    lineItems:         dto.lineItems as object[],
    subtotal,
    gstAmount,
    total,
    gstType,
    tdsRate:           dto.tdsRate  != null ? dto.tdsRate  : null,
    dueDate:           dto.dueDate  ? new Date(dto.dueDate)  : null,
    currency,
    exchangeRate:      dto.exchangeRate ?? null,
    lutNumber,
    isRecurring:       dto.isRecurring        ?? false,
    recurrenceCycle:   dto.recurrenceCycle    ?? null,
    recurrenceDay:     dto.recurrenceDay      ?? null,
    recurrenceEndDate: dto.recurrenceEndDate  ? new Date(dto.recurrenceEndDate) : null,
    recurrenceNextDate,
  }, INCLUDE_FULL);
}
```

- [ ] **Step 4: Type-check**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-api
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/modules/invoices/dto/create-invoice.dto.ts src/modules/invoices/invoices.service.ts
git commit -m "feat: add HSN/SAC, currency, LUT support to invoice creation"
```

---

## Task 4: Backend Users DTO — Expose New Profile Fields

**Files:**
- Modify: `pakka-api/src/modules/users/dto/upsert-user.dto.ts`

- [ ] **Step 1: Add new fields to UpdateUserDto**

In `upsert-user.dto.ts`, append to `UpdateUserDto`:

```typescript
@ApiPropertyOptional()
@IsOptional()
@IsString()
defaultHsnSac?: string;

@ApiPropertyOptional()
@IsOptional()
@IsString()
defaultLutNumber?: string;

@ApiPropertyOptional()
@IsOptional()
@IsString()
razorpayKeyId?: string;

@ApiPropertyOptional()
@IsOptional()
@IsString()
razorpayKeySecret?: string;

@ApiPropertyOptional()
@IsOptional()
onboardingComplete?: boolean;
```

Add `IsBoolean` to the class-validator imports if needed.

- [ ] **Step 2: Ensure users.controller exposes all fields in GET /users/me**

```bash
grep -n "select\|findUnique\|findFirst" /Users/mvaghela/Documents/MyProjects/pakka-api/src/modules/users/users.service.ts | head -20
```

Look for the `getMe` / `findOne` method. Make sure the Prisma `select` or `findUnique` includes the new fields. If it uses `select`, add:
- `defaultHsnSac: true`
- `defaultLutNumber: true`
- `onboardingComplete: true`
- `razorpayKeyId: true`
- `razorpayKeySecret: true`

If it returns the full model (no `select`), no change needed — Prisma will include new fields automatically.

- [ ] **Step 3: Type-check**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-api
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/modules/users/dto/upsert-user.dto.ts src/modules/users/users.service.ts
git commit -m "feat: expose defaultHsnSac, defaultLutNumber, razorpayKeyId, onboardingComplete on PATCH /users/me"
```

---

## Task 5: Frontend — useProfile + ProfileTab New Fields

**Files:**
- Modify: `pakka-app/src/features/settings/hooks/useProfile.ts`
- Modify: `pakka-app/src/features/settings/components/ProfileTab.tsx`

### useProfile.ts

- [ ] **Step 1: Add new fields to UserProfile interface**

In `useProfile.ts`, extend `UserProfile`:

```typescript
export interface UserProfile {
  id:                string
  email:             string
  name:              string
  plan:              'FREE' | 'SOLO' | 'STUDIO'
  planExpiresAt:     string | null
  businessName:      string | null
  businessType:      string | null
  gstNumber:         string | null
  panNumber:         string | null
  logoUrl:           string | null
  bankName:          string | null
  bankAccountName:   string | null
  bankAccountNumber: string | null
  bankIfsc:          string | null
  upiId:             string | null
  upiQrUrl:          string | null
  // New fields:
  defaultHsnSac:       string | null
  defaultLutNumber:    string | null
  razorpayKeyId:       string | null
  razorpayKeySecret:   string | null
  onboardingComplete:  boolean
  googleCalendarConnected: boolean
  outlookConnected:        boolean
  createdAt:               string
}
```

### ProfileTab.tsx

The current `ProfileTab` form only exposes: name, businessName, businessType, gstNumber, panNumber. It does not expose bank fields or the new compliance fields despite them existing in the DTO. This task adds:
1. A **"Compliance"** card: defaultHsnSac + defaultLutNumber
2. A **"Payment Details"** card: bank fields + Razorpay keys (already in DTO, missing from UI)

- [ ] **Step 2: Extend the Zod schema**

Replace the existing `profileSchema` in `ProfileTab.tsx`:

```typescript
const profileSchema = z.object({
  name:              z.string().min(1, 'Name is required'),
  businessName:      z.string().optional(),
  businessType:      z.string().optional(),
  gstNumber:         z.string().optional(),
  panNumber:         z.string().optional(),
  // Compliance
  defaultHsnSac:     z.string().optional(),
  defaultLutNumber:  z.string().optional(),
  // Payment
  bankName:          z.string().optional(),
  bankAccountName:   z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankIfsc:          z.string().optional(),
  upiId:             z.string().optional(),
  // Razorpay
  razorpayKeyId:     z.string().optional(),
  razorpayKeySecret: z.string().optional(),
})
type ProfileForm = z.infer<typeof profileSchema>
```

- [ ] **Step 3: Include new fields in useEffect reset**

In the `useEffect` that calls `reset({ ... })`, add:

```typescript
reset({
  name:              profile.name             ?? '',
  businessName:      profile.businessName     ?? '',
  businessType:      profile.businessType     ?? '',
  gstNumber:         profile.gstNumber        ?? '',
  panNumber:         profile.panNumber        ?? '',
  defaultHsnSac:     profile.defaultHsnSac    ?? '',
  defaultLutNumber:  profile.defaultLutNumber ?? '',
  bankName:          profile.bankName          ?? '',
  bankAccountName:   profile.bankAccountName   ?? '',
  bankAccountNumber: profile.bankAccountNumber ?? '',
  bankIfsc:          profile.bankIfsc          ?? '',
  upiId:             profile.upiId             ?? '',
  razorpayKeyId:     profile.razorpayKeyId     ?? '',
  razorpayKeySecret: profile.razorpayKeySecret ?? '',
})
```

- [ ] **Step 4: Include new fields in onSubmit**

```typescript
const onSubmit = async (values: ProfileForm) => {
  await updateProfile({
    name:              values.name,
    businessName:      values.businessName      || null,
    businessType:      values.businessType      || null,
    gstNumber:         values.gstNumber         || null,
    panNumber:         values.panNumber         || null,
    defaultHsnSac:     values.defaultHsnSac     || null,
    defaultLutNumber:  values.defaultLutNumber  || null,
    bankName:          values.bankName          || null,
    bankAccountName:   values.bankAccountName   || null,
    bankAccountNumber: values.bankAccountNumber || null,
    bankIfsc:          values.bankIfsc          || null,
    upiId:             values.upiId             || null,
    razorpayKeyId:     values.razorpayKeyId     || null,
    razorpayKeySecret: values.razorpayKeySecret || null,
  })
  setSaved(true)
  setTimeout(() => setSaved(false), 2500)
  reset(values)
}
```

- [ ] **Step 5: Add the Compliance card to JSX**

Import `ShieldCheck` from lucide-react. After the existing Tax & Compliance card (after the `{/* Tax info */}` card), add:

```tsx
{/* Compliance defaults */}
<div className="card p-6 space-y-5">
  <div className="flex items-center gap-2 pb-3 border-b border-[#F2F4F7] dark:border-[#26283A]">
    <ShieldCheck size={14} className="text-[#667085] dark:text-[#8B92A8]" strokeWidth={2} />
    <h3 className="text-[13px] font-bold text-[#344054] dark:text-[#C2C8D8]">Invoice Defaults</h3>
    <span className="ml-auto text-[11px] text-[#98A2B3] dark:text-[#545C74]">Auto-fills on new invoices</span>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <Field
      label="Default SAC / HSN Code"
      hint="Required on GST invoices. Auto-fills on every new line item."
    >
      <input
        {...register('defaultHsnSac')}
        placeholder="e.g. 998313"
        maxLength={8}
        className="form-input w-full font-mono text-[13px] tracking-wide"
      />
    </Field>
    <Field
      label="LUT Reference Number"
      hint="For export invoices (zero-rated). Filed with GSTN."
    >
      <input
        {...register('defaultLutNumber')}
        placeholder="e.g. AD220522001234H"
        className="form-input w-full font-mono text-[13px]"
      />
    </Field>
  </div>
</div>
```

- [ ] **Step 6: Add the Payment Details card to JSX**

Import `CreditCard` from lucide-react. After the Compliance card, add:

```tsx
{/* Payment details */}
<div className="card p-6 space-y-5">
  <div className="flex items-center gap-2 pb-3 border-b border-[#F2F4F7] dark:border-[#26283A]">
    <CreditCard size={14} className="text-[#667085] dark:text-[#8B92A8]" strokeWidth={2} />
    <h3 className="text-[13px] font-bold text-[#344054] dark:text-[#C2C8D8]">Payment Details</h3>
    <span className="ml-auto text-[11px] text-[#98A2B3] dark:text-[#545C74]">Shown on invoices</span>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <Field label="Bank Name"><input {...register('bankName')} placeholder="HDFC Bank" className="form-input w-full" /></Field>
    <Field label="Account Holder Name"><input {...register('bankAccountName')} placeholder="Your legal name" className="form-input w-full" /></Field>
    <Field label="Account Number"><input {...register('bankAccountNumber')} placeholder="000123456789" className="form-input w-full font-mono" /></Field>
    <Field label="IFSC Code"><input {...register('bankIfsc')} placeholder="HDFC0001234" className="form-input w-full font-mono uppercase" /></Field>
    <Field label="UPI ID" hint="e.g. yourname@okicici"><input {...register('upiId')} placeholder="yourname@okicici" className="form-input w-full" /></Field>
  </div>
  <div className="pt-3 border-t border-[#F2F4F7] dark:border-[#26283A] space-y-4">
    <p className="text-[12px] font-semibold text-[#344054] dark:text-[#C2C8D8] flex items-center gap-1.5">
      Razorpay Keys <span className="text-[11px] text-[#98A2B3] font-normal">(for online payment links)</span>
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Key ID" hint="Starts with rzp_live_ or rzp_test_">
        <input {...register('razorpayKeyId')} placeholder="rzp_live_…" className="form-input w-full font-mono text-[12px]" />
      </Field>
      <Field label="Key Secret">
        <input {...register('razorpayKeySecret')} type="password" placeholder="••••••••••••••••" className="form-input w-full font-mono text-[12px]" />
      </Field>
    </div>
    <p className="text-[11px] text-[#98A2B3]">Find your keys in Razorpay Dashboard → Settings → API Keys.</p>
  </div>
</div>
```

- [ ] **Step 7: Type-check**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-app
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 8: Commit**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-app
git add src/features/settings/hooks/useProfile.ts src/features/settings/components/ProfileTab.tsx
git commit -m "feat: add compliance defaults and payment details to Settings → Profile"
```

---

## Task 6: Frontend Invoice Editor — HSN/SAC + Currency + International Mode

**Files:**
- Modify: `pakka-app/src/features/invoices/schemas/invoice.schema.ts`
- Modify: `pakka-app/src/features/invoices/components/InvoiceEditor.tsx`

### invoice.schema.ts

- [ ] **Step 1: Extend LineItem and form schema**

```typescript
// Existing LineItem shape — add hsnSac
export const lineItemSchema = z.object({
  description: z.string().min(1, 'Required'),
  qty:         z.number().min(0),
  rate:        z.number().min(0),
  gstRate:     z.number(),
  hsnSac:      z.string().optional(),
})
export type LineItem = z.infer<typeof lineItemSchema>
```

In the invoice form schema (the outer Zod object), add:
```typescript
currency:    z.string().default('INR'),
lutNumber:   z.string().optional(),
```

### InvoiceEditor.tsx

The key changes:
1. Add `hsnSac` text input to each line item row (before description).
2. Auto-fill `hsnSac` from `user.defaultHsnSac` when appending a new line item.
3. Add a `currency` dropdown to the invoice header area.
4. When `currency !== 'INR'`: hide the gstType selector, show a "Zero-Rated Export (LUT)" badge, show a `lutNumber` field.

- [ ] **Step 2: Add currency and lutNumber to form defaults**

Find the `useForm` call in `InvoiceEditor.tsx`. In `defaultValues`, add:
```typescript
currency:   invoice?.currency  ?? 'INR',
lutNumber:  invoice?.lutNumber ?? (profile?.defaultLutNumber ?? ''),
```

Also update the append call (currently `append({ description: '', qty: 1, rate: 0, gstRate: 18 })`) to include `hsnSac`:
```typescript
append({ description: '', qty: 1, rate: 0, gstRate: 18, hsnSac: profile?.defaultHsnSac ?? '' })
```

- [ ] **Step 3: Add currency state + watch**

Near the top of the component (after `const { fields, append, remove } = useFieldArray(...)`):

```typescript
const currency  = watch('currency')
const isExport  = currency !== 'INR'

const CURRENCY_SYMBOLS: Record<string, string> = {
  INR: '₹', USD: '$', EUR: '€', GBP: '£', AED: 'AED ',
}
const currencySymbol = CURRENCY_SYMBOLS[currency] ?? currency
```

- [ ] **Step 4: Add currency selector to invoice header**

Find the "Settings row" section (the `grid grid-cols-3` div containing the GST type and TDS selectors). Add a currency dropdown as the first item, and wrap the GST type selector so it's hidden when `isExport`:

```tsx
{/* Settings row */}
<div className="grid grid-cols-3 gap-4">
  <div>
    <label className="form-label">Currency</label>
    <Controller
      control={control}
      name="currency"
      render={({ field }) => (
        <select {...field} disabled={!canEdit} className="form-input w-full">
          <option value="INR">INR — Indian Rupee</option>
          <option value="USD">USD — US Dollar</option>
          <option value="EUR">EUR — Euro</option>
          <option value="GBP">GBP — British Pound</option>
          <option value="AED">AED — UAE Dirham</option>
        </select>
      )}
    />
  </div>
  {!isExport && (
    <div>
      <label className="form-label">GST type</label>
      <Controller
        control={control}
        name="gstType"
        render={({ field }) => (
          <select {...field} disabled={!canEdit} className="form-input w-full">
            <option value="IGST">IGST (inter-state)</option>
            <option value="CGST_SGST">CGST + SGST (intra-state)</option>
            <option value="EXEMPT">GST exempt</option>
          </select>
        )}
      />
    </div>
  )}
  {isExport && (
    <div>
      <label className="form-label">LUT Reference No.</label>
      <input
        {...register('lutNumber')}
        disabled={!canEdit}
        placeholder="AD220522001234H"
        className="form-input w-full font-mono text-[12px]"
      />
    </div>
  )}
  <div>
    <label className="form-label">TDS rate (%)</label>
    {/* existing TDS input unchanged */}
  </div>
</div>
```

- [ ] **Step 5: Show export badge when isExport**

Just above or below the GST/TDS row, add a conditional banner:

```tsx
{isExport && (
  <div className="flex items-center gap-2 px-4 py-2.5 bg-[#F0FDF4] dark:bg-[#0D2418] border border-[#BBF7D0] dark:border-[#166534]/40 rounded-lg">
    <span className="text-[12px] font-semibold text-[#027A48] dark:text-[#4ADE80]">
      Export of Services — Zero Rated (LUT)
    </span>
    <span className="text-[11px] text-[#065F46] dark:text-[#86EFAC]">
      · GST: Nil · IGST: Nil
    </span>
  </div>
)}
```

- [ ] **Step 6: Add hsnSac input to line item rows**

Currently the line item grid is `grid-cols-[1fr_80px_100px_80px_32px]`. Change to `grid-cols-[80px_1fr_80px_100px_80px_32px]` and insert the SAC input as the first column:

```tsx
{/* Line item row — updated grid */}
<div className="grid grid-cols-[80px_1fr_80px_100px_80px_32px] gap-2 items-center">
  <input
    {...register(`lineItems.${idx}.hsnSac`)}
    disabled={!canEdit}
    placeholder="SAC"
    maxLength={8}
    className="form-input text-[12px] font-mono text-center"
  />
  <input
    {...register(`lineItems.${idx}.description`)}
    {/* ...existing props */}
  />
  {/* ...qty, rate, gstRate, delete unchanged */}
</div>
```

Also update the column header row to match:
```tsx
<div className="grid grid-cols-[80px_1fr_80px_100px_80px_32px] gap-2 ...">
  <span className="text-[10px] font-semibold text-[#98A2B3] uppercase">SAC/HSN</span>
  <span>Description</span>
  {/* ...rest unchanged */}
</div>
```

- [ ] **Step 7: Replace ₹ symbol with currencySymbol in totals**

In the totals section, replace all hardcoded `₹` with `{currencySymbol}`. The totals display section shows: Subtotal, GST, TDS, Total. Example:

```tsx
<span className="font-semibold text-[#344054] dark:text-[#C2C8D8]">{currencySymbol}{fmt(subtotal)}</span>
```

Also replace the `<IndianRupee>` icon in the Total row with:
```tsx
<span className="text-[13px] font-bold">{currencySymbol}</span>
```

Hide the GST totals row when `isExport`:
```tsx
{!isExport && gstType !== 'EXEMPT' && (
  <div className="flex justify-between text-[13px]">
    {/* GST row */}
  </div>
)}
```

- [ ] **Step 8: Type-check**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-app
npx tsc --noEmit
```

- [ ] **Step 9: Commit**

```bash
git add src/features/invoices/schemas/invoice.schema.ts src/features/invoices/components/InvoiceEditor.tsx
git commit -m "feat: add HSN/SAC per line item, currency selector, and international mode to invoice editor"
```

---

## Task 7: Frontend Invoice PDF (InvoiceViewPage) — HSN/SAC Column + LUT Declaration + Currency

**Files:**
- Modify: `pakka-app/src/pages/public/InvoiceViewPage.tsx`

- [ ] **Step 1: Extend PublicInvoice type**

In `InvoiceViewPage.tsx`, update `PublicInvoice`:

```typescript
interface PublicInvoice {
  id: string; invoiceNumber: string; status: string
  lineItems: LineItem[]; subtotal: number; gstAmount: number; total: number
  gstType: GstType; tdsRate: number | null; dueDate: string | null; paidAt: string | null
  createdAt: string
  // New:
  currency:   string
  lutNumber:  string | null
  user: PublicUser; client: PublicClient | null
}
```

- [ ] **Step 2: Add currency helpers**

After the `fmtDate` function:

```typescript
const CURRENCY_SYMBOLS: Record<string, string> = {
  INR: '₹', USD: '$', EUR: '€', GBP: '£', AED: 'AED ',
}
function fmtCurrency(v: number, currency: string) {
  const sym = CURRENCY_SYMBOLS[currency] ?? currency
  return `${sym}${Number(v).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
```

- [ ] **Step 3: Replace hardcoded ₹ in line items table**

In `InvoiceViewPage`, add derived values near the top of the component:

```typescript
const currency   = invoice.currency ?? 'INR'
const isExport   = currency !== 'INR'
```

Update the line items table column header from:
```tsx
<div className="grid grid-cols-[1fr_60px_90px_70px_90px] ...">
  <span>Description</span>
  <span>Qty</span>
  <span>Rate</span>
  <span>GST</span>
  <span>Amount</span>
```
To (add HSN/SAC column):
```tsx
<div className="grid grid-cols-[70px_1fr_60px_90px_70px_90px] ...">
  <span>SAC/HSN</span>
  <span>Description</span>
  <span className="text-right">Qty</span>
  <span className="text-right">Rate</span>
  <span className="text-right">GST</span>
  <span className="text-right">Amount</span>
```

Update each line item row to match the new grid and show `hsnSac`:
```tsx
{invoice.lineItems.map((item, idx) => {
  const lineTotal = Number(item.qty) * Number(item.rate)
  const lineGst   = !isExport && invoice.gstType !== 'EXEMPT'
    ? (lineTotal * Number(item.gstRate)) / 100 : 0
  return (
    <div key={idx} className="grid grid-cols-[70px_1fr_60px_90px_70px_90px] gap-3 px-7 py-3.5 text-[13px] ...">
      <span className="text-[11px] text-[#98A2B3] font-mono">{item.hsnSac ?? '—'}</span>
      <span className="text-[#344054] font-medium">{item.description}</span>
      <span className="text-right text-[#667085]">{item.qty}</span>
      <span className="text-right text-[#667085]">{fmtCurrency(item.rate, currency)}</span>
      <span className="text-right text-[#667085]">
        {isExport || invoice.gstType === 'EXEMPT' ? 'Nil' : `${item.gstRate}%`}
      </span>
      <span className="text-right font-semibold text-[#101828]">
        {fmtCurrency(lineTotal + lineGst, currency)}
      </span>
    </div>
  )
})}
```

- [ ] **Step 4: Update totals section**

Replace hardcoded `₹` with `fmtCurrency(value, currency)`. Hide GST row when `isExport`:

```tsx
<div className="flex justify-between text-[13px]">
  <span className="text-[#667085]">Subtotal</span>
  <span className="font-medium text-[#344054]">{fmtCurrency(Number(invoice.subtotal), currency)}</span>
</div>
{!isExport && Number(invoice.gstAmount) > 0 && (
  <div className="flex justify-between text-[13px]">
    <span className="text-[#667085]">{invoice.gstType === 'IGST' ? 'IGST' : 'CGST + SGST'}</span>
    <span className="font-medium text-[#344054]">{fmtCurrency(Number(invoice.gstAmount), currency)}</span>
  </div>
)}
{isExport && (
  <div className="flex justify-between text-[13px]">
    <span className="text-[#667085]">IGST</span>
    <span className="font-medium text-[#027A48]">Nil</span>
  </div>
)}
{/* ...TDS row unchanged... */}
<div className="flex items-center justify-between pt-3 border-t border-[#EAECF0]">
  <span className="text-[16px] font-bold text-[#101828]">Total due</span>
  <span className="text-[22px] font-extrabold ...">
    {fmtCurrency(Number(invoice.total), currency)}
  </span>
</div>
```

- [ ] **Step 5: Add LUT declaration footer**

Find the payment details card at the bottom of the page (the card that shows bank/UPI info). Just before that card, add a conditional LUT declaration block:

```tsx
{isExport && (
  <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl px-7 py-5 text-[12px] text-[#027A48] leading-relaxed">
    <p className="font-semibold mb-1">Zero-Rated Export Supply</p>
    <p>
      Export of Services — Zero Rated Supply under Bond/LUT as per Section 16(3) of IGST Act 2017.
      {invoice.lutNumber ? ` LUT No: ${invoice.lutNumber}.` : ''} IGST: Nil.
    </p>
  </div>
)}
```

- [ ] **Step 6: Add currency badge to invoice header**

In the invoice header card (where `invoiceNumber` is shown), add a currency badge when not INR:

```tsx
{currency !== 'INR' && (
  <span className="ml-2 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB]">
    {currency}
  </span>
)}
```

- [ ] **Step 7: Type-check**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-app
npx tsc --noEmit
```

- [ ] **Step 8: Commit**

```bash
git add src/pages/public/InvoiceViewPage.tsx
git commit -m "feat: add HSN/SAC column, LUT declaration, and currency display to invoice PDF view"
```

---

## Task 8: Frontend Onboarding Wizard — 5-Step Split-Panel Component

**Files:**
- Create: `pakka-app/src/features/onboarding/OnboardingWizard.tsx`

Install canvas-confetti first:

- [ ] **Step 1: Install canvas-confetti**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-app
npm install canvas-confetti
npm install --save-dev @types/canvas-confetti
```

- [ ] **Step 2: Create OnboardingWizard.tsx**

Create `pakka-app/src/features/onboarding/OnboardingWizard.tsx`:

```tsx
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '@/lib/api'
import { useQueryClient } from '@tanstack/react-query'
import confetti from 'canvas-confetti'
import { Check, ChevronRight } from 'lucide-react'

const STORAGE_KEY = 'rupway_onboarding_v1'

const SAC_SUGGESTIONS: Record<string, string> = {
  developer:  '998313',
  designer:   '998363',
  marketer:   '998371',
  consultant: '998399',
  agency:     '998314',
  other:      '998399',
}

const STEPS = [
  { label: 'Business Identity' },
  { label: 'GST & Compliance' },
  { label: 'Get Paid' },
  { label: 'Add Client' },
  { label: 'Send Document' },
]

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}
function saveState(state: object) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export default function OnboardingWizard() {
  const navigate     = useNavigate()
  const queryClient  = useQueryClient()
  const saved        = loadState()

  const [step,         setStep]         = useState<number>(saved.step ?? 0)
  const [direction,    setDirection]    = useState<1 | -1>(1)
  const [workType,     setWorkType]     = useState<string>(saved.workType ?? '')
  const [businessName, setBusinessName] = useState<string>(saved.businessName ?? '')
  const [logoUrl,      setLogoUrl]      = useState<string | null>(saved.logoUrl ?? null)
  const [gstRegistered, setGstRegistered] = useState<boolean>(saved.gstRegistered ?? false)
  const [gstin,        setGstin]        = useState<string>(saved.gstin ?? '')
  const [intlClients,  setIntlClients]  = useState<boolean>(saved.intlClients ?? false)
  const [lutNumber,    setLutNumber]    = useState<string>(saved.lutNumber ?? '')
  const [defaultHsnSac, setDefaultHsnSac] = useState<string>(saved.defaultHsnSac ?? '')
  const [bankAccountName, setBankAccountName] = useState<string>(saved.bankAccountName ?? '')
  const [bankAccountNumber, setBankAccountNumber] = useState<string>(saved.bankAccountNumber ?? '')
  const [bankIfsc,     setBankIfsc]     = useState<string>(saved.bankIfsc ?? '')
  const [bankName,     setBankName]     = useState<string>(saved.bankName ?? '')
  const [upiId,        setUpiId]        = useState<string>(saved.upiId ?? '')
  const [razorpayKeyId, setRazorpayKeyId] = useState<string>(saved.razorpayKeyId ?? '')
  const [razorpayKeySecret, setRazorpayKeySecret] = useState<string>(saved.razorpayKeySecret ?? '')
  const [clientName,   setClientName]   = useState<string>(saved.clientName ?? '')
  const [clientEmail,  setClientEmail]  = useState<string>(saved.clientEmail ?? '')
  const [clientPhone,  setClientPhone]  = useState<string>(saved.clientPhone ?? '')
  const [clientCompany, setClientCompany] = useState<string>(saved.clientCompany ?? '')
  const [clientId,     setClientId]     = useState<string | null>(saved.clientId ?? null)
  const [saving,       setSaving]       = useState(false)

  // Persist wizard state on change
  useEffect(() => {
    saveState({
      step, workType, businessName, logoUrl, gstRegistered, gstin,
      intlClients, lutNumber, defaultHsnSac, bankAccountName,
      bankAccountNumber, bankIfsc, bankName, upiId, razorpayKeyId,
      razorpayKeySecret, clientName, clientEmail, clientPhone, clientCompany, clientId,
    })
  }, [
    step, workType, businessName, logoUrl, gstRegistered, gstin,
    intlClients, lutNumber, defaultHsnSac, bankAccountName,
    bankAccountNumber, bankIfsc, bankName, upiId, razorpayKeyId,
    razorpayKeySecret, clientName, clientEmail, clientPhone, clientCompany, clientId,
  ])

  // When work type changes, suggest a SAC code if the field is empty
  useEffect(() => {
    if (workType && !defaultHsnSac) {
      setDefaultHsnSac(SAC_SUGGESTIONS[workType] ?? '')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workType])

  const goNext = useCallback(() => {
    setDirection(1)
    setStep(s => s + 1)
  }, [])
  const goBack = useCallback(() => {
    setDirection(-1)
    setStep(s => s - 1)
  }, [])

  // Step 1 → save profile fields
  const saveStep1 = async () => {
    setSaving(true)
    try {
      await api.patch('/users/me', { businessName: businessName || null })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      goNext()
    } finally { setSaving(false) }
  }

  // Step 2 → save compliance fields
  const saveStep2 = async () => {
    setSaving(true)
    try {
      await api.patch('/users/me', {
        gstNumber:       gstRegistered ? (gstin || null) : null,
        defaultLutNumber: intlClients   ? (lutNumber || null) : null,
        defaultHsnSac:   defaultHsnSac || null,
      })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      goNext()
    } finally { setSaving(false) }
  }

  // Step 3 → save payment fields (skippable)
  const saveStep3 = async (skip = false) => {
    if (!skip) {
      setSaving(true)
      try {
        await api.patch('/users/me', {
          bankName:          bankName          || null,
          bankAccountName:   bankAccountName   || null,
          bankAccountNumber: bankAccountNumber || null,
          bankIfsc:          bankIfsc          || null,
          upiId:             upiId             || null,
          razorpayKeyId:     razorpayKeyId     || null,
          razorpayKeySecret: razorpayKeySecret || null,
        })
        queryClient.invalidateQueries({ queryKey: ['profile'] })
      } finally { setSaving(false) }
    }
    goNext()
  }

  // Step 4 → create client
  const saveStep4 = async () => {
    setSaving(true)
    try {
      const { data } = await api.post<{ data: { id: string } }>('/clients', {
        name:    clientName,
        email:   clientEmail    || undefined,
        phone:   clientPhone    || undefined,
        company: clientCompany  || undefined,
      })
      setClientId(data.data.id)
      goNext()
    } finally { setSaving(false) }
  }

  // Step 5 → graduation
  const graduate = async (destination: 'proposals' | 'contracts' | 'invoices') => {
    await api.patch('/users/me', { onboardingComplete: true })
    queryClient.invalidateQueries({ queryKey: ['profile'] })
    localStorage.removeItem(STORAGE_KEY)
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } })
    setTimeout(() => {
      navigate(`/app/${destination}/new${clientId ? `?clientId=${clientId}` : ''}`)
    }, 600)
  }

  const slideVariants = {
    enter:   (dir: number) => ({ x: dir * 40, opacity: 0 }),
    center:  { x: 0, opacity: 1 },
    exit:    (dir: number) => ({ x: dir * -40, opacity: 0 }),
  }

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-[#0C0D10] flex">

      {/* ── Left panel (40%) — form ── */}
      <div className="w-full lg:w-[40%] flex flex-col h-full overflow-hidden">

        {/* Progress */}
        <div className="px-10 pt-10 pb-6 shrink-0">
          <div className="flex items-center gap-0 mb-4">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-0 flex-1 last:flex-none">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${
                  i < step ? 'bg-[#6366F1] text-white' :
                  i === step ? 'bg-[#6366F1] text-white ring-4 ring-[#6366F1]/20' :
                  'bg-[#F2F4F7] dark:bg-[#21222D] text-[#98A2B3]'
                }`}>
                  {i < step ? <Check size={12} strokeWidth={3} /> : i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 ${i < step ? 'bg-[#6366F1]' : 'bg-[#F2F4F7] dark:bg-[#26283A]'}`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-[11px] font-semibold text-[#98A2B3] uppercase tracking-widest">
            Step {step + 1} of {STEPS.length}
          </p>
          <p className="text-[13px] font-bold text-[#344054] dark:text-[#C2C8D8] mt-0.5">
            {STEPS[step].label}
          </p>
        </div>

        {/* Step content */}
        <div className="flex-1 overflow-y-auto px-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {step === 0 && <Step1BusinessIdentity
                businessName={businessName} setBusinessName={setBusinessName}
                workType={workType} setWorkType={setWorkType}
                logoUrl={logoUrl} setLogoUrl={setLogoUrl}
              />}
              {step === 1 && <Step2GstCompliance
                gstRegistered={gstRegistered} setGstRegistered={setGstRegistered}
                gstin={gstin} setGstin={setGstin}
                intlClients={intlClients} setIntlClients={setIntlClients}
                lutNumber={lutNumber} setLutNumber={setLutNumber}
                defaultHsnSac={defaultHsnSac} setDefaultHsnSac={setDefaultHsnSac}
              />}
              {step === 2 && <Step3GetPaid
                bankName={bankName} setBankName={setBankName}
                bankAccountName={bankAccountName} setBankAccountName={setBankAccountName}
                bankAccountNumber={bankAccountNumber} setBankAccountNumber={setBankAccountNumber}
                bankIfsc={bankIfsc} setBankIfsc={setBankIfsc}
                upiId={upiId} setUpiId={setUpiId}
                razorpayKeyId={razorpayKeyId} setRazorpayKeyId={setRazorpayKeyId}
                razorpayKeySecret={razorpayKeySecret} setRazorpayKeySecret={setRazorpayKeySecret}
              />}
              {step === 3 && <Step4AddClient
                name={clientName} setName={setClientName}
                email={clientEmail} setEmail={setClientEmail}
                phone={clientPhone} setPhone={setClientPhone}
                company={clientCompany} setCompany={setClientCompany}
              />}
              {step === 4 && <Step5Graduation clientName={clientName} onChoose={graduate} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA footer */}
        <div className="px-10 py-8 shrink-0 border-t border-[#F2F4F7] dark:border-[#26283A]">
          {step === 0 && (
            <button
              onClick={saveStep1}
              disabled={!businessName.trim() || saving}
              className="w-full btn-primary py-3 text-[14px] font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Continue'} <ChevronRight size={16} />
            </button>
          )}
          {step === 1 && (
            <div className="flex gap-3">
              <button onClick={goBack} className="btn-secondary px-4">← Back</button>
              <button onClick={saveStep2} disabled={saving} className="flex-1 btn-primary py-3 text-[14px] font-bold flex items-center justify-center gap-2">
                {saving ? 'Saving…' : 'Continue'} <ChevronRight size={16} />
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-3">
              <div className="flex gap-3">
                <button onClick={goBack} className="btn-secondary px-4">← Back</button>
                <button onClick={() => saveStep3(false)} disabled={saving} className="flex-1 btn-primary py-3 text-[14px] font-bold flex items-center justify-center gap-2">
                  {saving ? 'Saving…' : 'Continue'} <ChevronRight size={16} />
                </button>
              </div>
              <button
                onClick={() => saveStep3(true)}
                className="w-full text-center text-[12px] text-[#98A2B3] hover:text-[#667085] transition-colors"
              >
                I'll add this later
              </button>
              <p className="text-center text-[11px] text-[#D0D5DD]">
                Without bank/UPI details, clients won't see payment instructions on your invoices.
              </p>
            </div>
          )}
          {step === 3 && (
            <div className="flex gap-3">
              <button onClick={goBack} className="btn-secondary px-4">← Back</button>
              <button onClick={saveStep4} disabled={!clientName.trim() || saving} className="flex-1 btn-primary py-3 text-[14px] font-bold flex items-center justify-center gap-2 disabled:opacity-50">
                {saving ? 'Saving…' : 'Continue'} <ChevronRight size={16} />
              </button>
            </div>
          )}
          {/* Step 4 (Graduation) has no CTA footer — cards are the CTAs */}
        </div>
      </div>

      {/* ── Right panel (60%) — live preview, hidden on mobile ── */}
      <div className="hidden lg:flex flex-1 bg-[#F4F6FB] dark:bg-[#13141A] border-l border-[#EAECF0] dark:border-[#26283A] items-center justify-center p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full max-w-md"
          >
            {step === 0 && <PreviewBusinessIdentity businessName={businessName} logoUrl={logoUrl} />}
            {step === 1 && <PreviewGstCompliance gstin={gstin} defaultHsnSac={defaultHsnSac} />}
            {step === 2 && <PreviewGetPaid upiId={upiId} razorpayKeyId={razorpayKeyId} />}
            {step === 3 && <PreviewClientCard name={clientName} company={clientCompany} email={clientEmail} />}
            {step === 4 && <PreviewGraduation />}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  )
}

// ─── Step sub-components ──────────────────────────────────────────────────────

function WizardField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[12.5px] font-semibold text-[#344054] dark:text-[#C2C8D8]">{label}</label>
      {children}
      {hint && <p className="text-[11px] text-[#98A2B3]">{hint}</p>}
    </div>
  )
}

function Step1BusinessIdentity({
  businessName, setBusinessName, workType, setWorkType, logoUrl, setLogoUrl,
}: {
  businessName: string; setBusinessName: (v: string) => void
  workType: string; setWorkType: (v: string) => void
  logoUrl: string | null; setLogoUrl: (v: string | null) => void
}) {
  const WORK_TYPES = [
    { value: 'developer', label: 'Developer' },
    { value: 'designer',  label: 'Designer' },
    { value: 'marketer',  label: 'Marketer' },
    { value: 'consultant',label: 'Consultant' },
    { value: 'agency',    label: 'Agency' },
    { value: 'other',     label: 'Other' },
  ]
  return (
    <div className="space-y-6 pb-6">
      <div>
        <h2 className="text-[22px] font-extrabold text-[#101828] dark:text-[#ECEEF3]">Let's set up your identity</h2>
        <p className="text-[13px] text-[#667085] dark:text-[#8B92A8] mt-1">This is what clients see on every proposal and invoice.</p>
      </div>
      <WizardField label="Your trading name (what clients see on invoices)">
        <input
          value={businessName}
          onChange={e => setBusinessName(e.target.value)}
          placeholder="e.g. Vaghela Studio"
          autoFocus
          className="form-input w-full text-[14px]"
        />
      </WizardField>
      <WizardField label="What kind of work do you do?">
        <div className="flex flex-wrap gap-2">
          {WORK_TYPES.map(t => (
            <button
              key={t.value}
              type="button"
              onClick={() => setWorkType(t.value)}
              className={`px-4 py-2 rounded-full text-[12.5px] font-semibold border transition-colors ${
                workType === t.value
                  ? 'bg-[#6366F1] text-white border-[#6366F1]'
                  : 'bg-white dark:bg-[#21222D] text-[#344054] dark:text-[#C2C8D8] border-[#EAECF0] dark:border-[#3D4258] hover:border-[#6366F1]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </WizardField>
    </div>
  )
}

function Step2GstCompliance({
  gstRegistered, setGstRegistered, gstin, setGstin,
  intlClients, setIntlClients, lutNumber, setLutNumber,
  defaultHsnSac, setDefaultHsnSac,
}: {
  gstRegistered: boolean; setGstRegistered: (v: boolean) => void
  gstin: string; setGstin: (v: string) => void
  intlClients: boolean; setIntlClients: (v: boolean) => void
  lutNumber: string; setLutNumber: (v: string) => void
  defaultHsnSac: string; setDefaultHsnSac: (v: string) => void
}) {
  return (
    <div className="space-y-6 pb-6">
      <div>
        <h2 className="text-[22px] font-extrabold text-[#101828] dark:text-[#ECEEF3]">GST & compliance</h2>
        <p className="text-[13px] text-[#667085] dark:text-[#8B92A8] mt-1">Get Razorpay-compliant invoices from day one.</p>
      </div>

      <WizardField label="Are you GST registered?">
        <div className="flex gap-2">
          {[false, true].map(v => (
            <button key={String(v)} type="button" onClick={() => setGstRegistered(v)}
              className={`px-4 py-2 rounded-lg text-[12.5px] font-semibold border transition-colors ${
                gstRegistered === v
                  ? 'bg-[#6366F1] text-white border-[#6366F1]'
                  : 'bg-white dark:bg-[#21222D] text-[#344054] dark:text-[#C2C8D8] border-[#EAECF0] dark:border-[#3D4258]'
              }`}
            >
              {v ? 'Yes, I'm registered' : 'Not yet'}
            </button>
          ))}
        </div>
      </WizardField>

      {gstRegistered && (
        <WizardField label="Your GST registration number — starts with your state code" hint="e.g. 24AAAAA0000A1Z5">
          <input
            value={gstin}
            onChange={e => setGstin(e.target.value.toUpperCase())}
            placeholder="22AAAAA0000A1Z5"
            maxLength={15}
            className="form-input w-full font-mono uppercase tracking-widest"
          />
        </WizardField>
      )}

      <WizardField label="Do you work with clients abroad?">
        <div className="flex gap-2">
          {[false, true].map(v => (
            <button key={String(v)} type="button" onClick={() => setIntlClients(v)}
              className={`px-4 py-2 rounded-lg text-[12.5px] font-semibold border transition-colors ${
                intlClients === v
                  ? 'bg-[#6366F1] text-white border-[#6366F1]'
                  : 'bg-white dark:bg-[#21222D] text-[#344054] dark:text-[#C2C8D8] border-[#EAECF0] dark:border-[#3D4258]'
              }`}
            >
              {v ? 'Yes, I work with clients abroad' : 'No, domestic only'}
            </button>
          ))}
        </div>
      </WizardField>

      {intlClients && (
        <WizardField label="LUT Reference Number" hint="Filed with GSTN — used on export invoices to declare zero-rated supply">
          <input
            value={lutNumber}
            onChange={e => setLutNumber(e.target.value)}
            placeholder="AD220522001234H"
            className="form-input w-full font-mono"
          />
        </WizardField>
      )}

      <WizardField
        label="Default SAC / HSN Code"
        hint="Razorpay requires this on invoices to process payments. Auto-fills on every new line item."
      >
        <input
          value={defaultHsnSac}
          onChange={e => setDefaultHsnSac(e.target.value)}
          placeholder="e.g. 998313"
          maxLength={8}
          className="form-input w-full font-mono"
        />
      </WizardField>
    </div>
  )
}

function Step3GetPaid(props: {
  bankName: string; setBankName: (v: string) => void
  bankAccountName: string; setBankAccountName: (v: string) => void
  bankAccountNumber: string; setBankAccountNumber: (v: string) => void
  bankIfsc: string; setBankIfsc: (v: string) => void
  upiId: string; setUpiId: (v: string) => void
  razorpayKeyId: string; setRazorpayKeyId: (v: string) => void
  razorpayKeySecret: string; setRazorpayKeySecret: (v: string) => void
}) {
  return (
    <div className="space-y-5 pb-6">
      <div>
        <h2 className="text-[22px] font-extrabold text-[#101828] dark:text-[#ECEEF3]">You're almost ready to get paid</h2>
        <p className="text-[13px] text-[#667085] dark:text-[#8B92A8] mt-1">Bank and UPI details appear on your invoices so clients know where to send money.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <WizardField label="Bank Name"><input value={props.bankName} onChange={e => props.setBankName(e.target.value)} placeholder="HDFC Bank" className="form-input w-full" /></WizardField>
        <WizardField label="Account Holder Name"><input value={props.bankAccountName} onChange={e => props.setBankAccountName(e.target.value)} placeholder="Your legal name" className="form-input w-full" /></WizardField>
        <WizardField label="Account Number"><input value={props.bankAccountNumber} onChange={e => props.setBankAccountNumber(e.target.value)} placeholder="000123456789" className="form-input w-full font-mono" /></WizardField>
        <WizardField label="IFSC Code"><input value={props.bankIfsc} onChange={e => props.setBankIfsc(e.target.value.toUpperCase())} placeholder="HDFC0001234" className="form-input w-full font-mono uppercase" /></WizardField>
      </div>
      <WizardField label="UPI ID" hint="e.g. yourname@okicici — clients pay you directly here">
        <input value={props.upiId} onChange={e => props.setUpiId(e.target.value)} placeholder="yourname@okicici" className="form-input w-full" />
      </WizardField>
      <div className="pt-2 border-t border-[#F2F4F7] dark:border-[#26283A] space-y-4">
        <p className="text-[12px] font-semibold text-[#344054] dark:text-[#C2C8D8]">
          Razorpay Keys <span className="text-[11px] text-[#98A2B3] font-normal">(optional — for online payment links)</span>
        </p>
        <div className="grid grid-cols-2 gap-4">
          <WizardField label="Key ID" hint="Starts with rzp_live_">
            <input value={props.razorpayKeyId} onChange={e => props.setRazorpayKeyId(e.target.value)} placeholder="rzp_live_…" className="form-input w-full font-mono text-[12px]" />
          </WizardField>
          <WizardField label="Key Secret">
            <input value={props.razorpayKeySecret} onChange={e => props.setRazorpayKeySecret(e.target.value)} type="password" placeholder="••••••••" className="form-input w-full font-mono text-[12px]" />
          </WizardField>
        </div>
      </div>
    </div>
  )
}

function Step4AddClient(props: {
  name: string; setName: (v: string) => void
  email: string; setEmail: (v: string) => void
  phone: string; setPhone: (v: string) => void
  company: string; setCompany: (v: string) => void
}) {
  return (
    <div className="space-y-5 pb-6">
      <div>
        <h2 className="text-[22px] font-extrabold text-[#101828] dark:text-[#ECEEF3]">Add your first client</h2>
        <p className="text-[13px] text-[#667085] dark:text-[#8B92A8] mt-1">You'll send your first document to them in the next step.</p>
      </div>
      <WizardField label="Client name *"><input autoFocus value={props.name} onChange={e => props.setName(e.target.value)} placeholder="Ravi Shankar" className="form-input w-full text-[14px]" /></WizardField>
      <WizardField label="Email"><input value={props.email} onChange={e => props.setEmail(e.target.value)} placeholder="ravi@company.com" className="form-input w-full" /></WizardField>
      <WizardField label="Phone"><input value={props.phone} onChange={e => props.setPhone(e.target.value)} placeholder="+91 98765 43210" className="form-input w-full" /></WizardField>
      <WizardField label="Company"><input value={props.company} onChange={e => props.setCompany(e.target.value)} placeholder="Acme Corp" className="form-input w-full" /></WizardField>
    </div>
  )
}

function Step5Graduation({ clientName, onChoose }: { clientName: string; onChoose: (type: 'proposals' | 'contracts' | 'invoices') => void }) {
  const CARDS = [
    {
      type: 'proposals' as const,
      title: 'Proposal',
      desc: 'Share your scope, pricing, and terms. Client can accept online.',
      color: 'from-[#EFF6FF] to-[#DBEAFE]',
    },
    {
      type: 'contracts' as const,
      title: 'Contract',
      desc: 'Send a legally binding agreement for e-signature.',
      color: 'from-[#F5F3FF] to-[#EDE9FE]',
    },
    {
      type: 'invoices' as const,
      title: 'Invoice',
      desc: 'Bill for work done. Collect via UPI or Razorpay.',
      color: 'from-[#ECFDF3] to-[#D1FAE5]',
    },
  ]
  return (
    <div className="space-y-6 pb-6">
      <div>
        <h2 className="text-[22px] font-extrabold text-[#101828] dark:text-[#ECEEF3]">
          What do you want to send{clientName ? ` ${clientName}` : ''}?
        </h2>
        <p className="text-[13px] text-[#667085] dark:text-[#8B92A8] mt-1">Choose one to complete your setup.</p>
      </div>
      <div className="space-y-3">
        {CARDS.map(card => (
          <button
            key={card.type}
            onClick={() => onChoose(card.type)}
            className={`w-full text-left p-5 rounded-2xl bg-gradient-to-r ${card.color} border border-white/80 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97] transition-all`}
          >
            <p className="text-[15px] font-bold text-[#101828]">{card.title}</p>
            <p className="text-[12px] text-[#667085] mt-0.5">{card.desc}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Right panel previews ────────────────────────────────────────────────────

function PreviewBusinessIdentity({ businessName, logoUrl }: { businessName: string; logoUrl: string | null }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-md p-7 space-y-4">
      <p className="text-[10px] font-semibold text-[#98A2B3] uppercase tracking-widest">Proposal preview</p>
      <div className="flex items-center gap-3">
        {logoUrl ? (
          <img src={logoUrl} className="h-9 w-auto max-w-[120px] rounded-lg object-contain" alt="logo" />
        ) : (
          <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[15px] font-bold text-[#2563EB]">
            {businessName ? businessName.charAt(0).toUpperCase() : '?'}
          </div>
        )}
        <p className="text-[15px] font-extrabold text-[#101828]">
          {businessName || 'Your Business Name'}
        </p>
      </div>
      <div className="h-px bg-[#F2F4F7]" />
      <p className="text-[13px] font-bold text-[#344054]">Project Proposal</p>
      <div className="space-y-1.5">
        {['Scope of work', 'Timeline', 'Investment', 'Terms'].map(s => (
          <div key={s} className="h-3 bg-[#F4F6FB] rounded-full" style={{ width: `${40 + Math.random() * 50}%` }} />
        ))}
      </div>
    </div>
  )
}

function PreviewGstCompliance({ gstin, defaultHsnSac }: { gstin: string; defaultHsnSac: string }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-md overflow-hidden">
      <div className="px-7 py-5 border-b border-[#F2F4F7]">
        <p className="text-[10px] font-semibold text-[#98A2B3] uppercase tracking-widest mb-2">Invoice footer preview</p>
        <div className="text-[11px] text-[#667085] space-y-0.5">
          {gstin && <p>GSTIN: <span className="font-mono text-[#344054]">{gstin}</span></p>}
          {!gstin && <p className="text-[#D0D5DD]">GSTIN: —</p>}
        </div>
      </div>
      <div className="px-7 py-4 bg-[#FAFAFA] border-b border-[#F2F4F7]">
        <div className="grid grid-cols-[60px_1fr_60px_80px] gap-2 text-[10px] font-semibold text-[#98A2B3] uppercase mb-2">
          <span>SAC/HSN</span><span>Description</span><span>Qty</span><span className="text-right">Amount</span>
        </div>
        <div className="grid grid-cols-[60px_1fr_60px_80px] gap-2 text-[12px]">
          <span className="font-mono text-[#667085]">{defaultHsnSac || '——'}</span>
          <span className="text-[#344054]">Web Development</span>
          <span className="text-[#667085]">1</span>
          <span className="text-right text-[#344054] font-semibold">₹50,000</span>
        </div>
      </div>
      <div className="px-7 py-4 text-[12px] space-y-1">
        <div className="flex justify-between"><span className="text-[#667085]">Subtotal</span><span>₹50,000</span></div>
        <div className="flex justify-between"><span className="text-[#667085]">IGST 18%</span><span>₹9,000</span></div>
        <div className="flex justify-between font-bold pt-1 border-t border-[#F2F4F7]"><span>Total</span><span>₹59,000</span></div>
      </div>
    </div>
  )
}

function PreviewGetPaid({ upiId, razorpayKeyId }: { upiId: string; razorpayKeyId: string }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-md p-7 space-y-4">
      <p className="text-[10px] font-semibold text-[#98A2B3] uppercase tracking-widest">Invoice payment section</p>
      <div className="flex items-center justify-between py-3 border-t border-b border-[#F2F4F7]">
        <span className="text-[16px] font-bold text-[#101828]">Total due</span>
        <span className="text-[22px] font-extrabold text-[#101828]">₹59,000</span>
      </div>
      {upiId && (
        <div className="flex items-center gap-3 p-3.5 bg-[#F4F6FB] rounded-xl">
          <div className="w-8 h-8 rounded-full bg-[#EFF6FF] flex items-center justify-center">
            <span className="text-[10px] font-bold text-[#2563EB]">UPI</span>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#344054]">Pay via UPI</p>
            <p className="text-[11px] text-[#667085] font-mono">{upiId}</p>
          </div>
        </div>
      )}
      {razorpayKeyId && (
        <button className="w-full py-3 rounded-xl bg-[#2563EB] text-white text-[13px] font-bold">
          Pay ₹59,000 with Razorpay
        </button>
      )}
      {!upiId && !razorpayKeyId && (
        <p className="text-[12px] text-[#D0D5DD] text-center">Add UPI or Razorpay to show payment options</p>
      )}
    </div>
  )
}

function PreviewClientCard({ name, company, email }: { name: string; company: string; email: string }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-md p-6 flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[18px] font-bold text-[#2563EB] shrink-0">
        {name ? name.charAt(0).toUpperCase() : '?'}
      </div>
      <div>
        <p className="text-[15px] font-bold text-[#101828]">{name || 'Client name'}</p>
        {company && <p className="text-[12px] text-[#667085]">{company}</p>}
        {email  && <p className="text-[12px] text-[#98A2B3]">{email}</p>}
      </div>
    </div>
  )
}

function PreviewGraduation() {
  return (
    <div className="space-y-4">
      {['Proposal', 'Contract', 'Invoice'].map((t, i) => (
        <div key={t} className={`bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-5 opacity-${i === 0 ? '100' : i === 1 ? '80' : '60'}`}>
          <p className="text-[14px] font-bold text-[#101828]">{t}</p>
          <div className="mt-2 space-y-1.5">
            <div className="h-2.5 bg-[#F4F6FB] rounded-full w-3/4" />
            <div className="h-2.5 bg-[#F4F6FB] rounded-full w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Type-check**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-app
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/features/onboarding/OnboardingWizard.tsx
git commit -m "feat: add 5-step onboarding wizard with split-panel layout, Framer Motion, and canvas-confetti"
```

---

## Task 9: Frontend AppShell Trigger

**Files:**
- Modify: `pakka-app/src/components/layout/AppShell.tsx`

Currently `AppShell.tsx` imports `useOnboardingTour` and calls `startIfFirstVisit()` in `useEffect`. Replace this with the new wizard gated by `user.onboardingComplete`.

- [ ] **Step 1: Update AppShell**

Replace the current `AppShell.tsx` content with:

```tsx
import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import BottomNav from './BottomNav'
import { useProfile } from '@/features/settings/hooks/useProfile'
import { lazy, Suspense } from 'react'

const OnboardingWizard = lazy(() => import('@/features/onboarding/OnboardingWizard'))

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()
  const { data: profile, isLoading: profileLoading } = useProfile()

  const showWizard = !profileLoading && profile && !profile.onboardingComplete

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F5F8] dark:bg-[#0C0D10] transition-colors">

      {/* ── Desktop sidebar (lg+) ──────────────────────────────── */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* ── Mobile sidebar overlay (<lg) ──────────────────────── */}
      {sidebarOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] anim-fade"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="lg:hidden fixed inset-y-0 left-0 z-50 shadow-2xl anim-slide-left">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* ── Content area ──────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar onMenuToggle={() => setSidebarOpen(v => !v)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 pb-[76px] lg:pb-6">
          <div key={pathname} className="page-enter">
            <Outlet />
          </div>
        </main>
      </div>

      {/* ── Mobile bottom nav (<lg) ───────────────────────────── */}
      <BottomNav />

      {/* ── Onboarding wizard — shown for new users only ─────── */}
      {showWizard && (
        <Suspense fallback={null}>
          <OnboardingWizard />
        </Suspense>
      )}
    </div>
  )
}
```

Note: `useProfile` is already called in many components so there is no extra network request — TanStack Query deduplicates.

- [ ] **Step 2: Type-check**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-app
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/AppShell.tsx
git commit -m "feat: show onboarding wizard for new users in AppShell"
```

---

## Task 10: Frontend UI Polish — Design System Pass

**Files:**
- Modify: `pakka-app/src/pages/app/DashboardPage.tsx`
- Modify: `pakka-app/src/features/invoices/components/InvoiceEditor.tsx`
- Modify: `pakka-app/src/pages/app/ClientPage.tsx` (or wherever the client overview lives)

This task applies the premium design system documented in the spec. Changes are additive and visual-only — no logic changes.

- [ ] **Step 1: Audit Dashboard**

```bash
cat /Users/mvaghela/Documents/MyProjects/pakka-app/src/pages/app/DashboardPage.tsx | head -80
```

Look for: page title size, stat card layout, empty state handling. Apply:
- Page heading: `text-[22px] font-extrabold` with user's `businessName`
- Stat cards: `p-5` padding minimum, `hover:shadow-md transition-shadow` on clickable cards
- Any spinner for dashboard data → replace with skeleton (`animate-pulse bg-[#F2F4F7] rounded-lg`)

- [ ] **Step 2: Standardise skeleton loading in invoice list**

```bash
grep -rn "Loader2\|spinner" /Users/mvaghela/Documents/MyProjects/pakka-app/src/features/invoices/ | grep -v "button\|saving\|isPending"
```

For any page-level `<Loader2>` spinner found, replace with a skeleton placeholder grid matching the list layout.

- [ ] **Step 3: Add micro-interactions**

In `InvoiceEditor.tsx`, ensure the "Add line item" button has `active:scale-[0.97]` and the submit button has the same. These classes can be added to the existing button `className` strings.

In any clickable card components (invoice list rows, client cards), add `hover:shadow-md transition-shadow duration-150`.

- [ ] **Step 4: Ensure section padding consistency**

Audit all `card` class usages in the invoice and client pages. If any card has `p-4`, bump to `p-5`. Table rows should have `py-3 min-h-[48px]`.

- [ ] **Step 5: Type-check**

```bash
cd /Users/mvaghela/Documents/MyProjects/pakka-app
npx tsc --noEmit
```

- [ ] **Step 6: Commit**

```bash
git add src/pages/app/DashboardPage.tsx src/features/invoices/ src/pages/app/ClientPage.tsx 2>/dev/null; true
git commit -m "design: apply premium design system pass — typography, skeletons, micro-interactions"
```

---

## Verification Checklist

- [ ] `npx tsc --noEmit` in `pakka-api` → 0 errors
- [ ] `npx tsc --noEmit` in `pakka-app` → 0 errors
- [ ] DB migration applied cleanly (`prisma migrate status` shows no pending migrations)
- [ ] Existing users have `onboardingComplete = true` (seed script ran)
- [ ] New user (fresh account) → sees wizard on first login
- [ ] Wizard Step 1 → business name saved to profile
- [ ] Wizard Step 2 → GSTIN + defaultHsnSac saved; SAC pre-filled from work type
- [ ] Wizard Step 3 → skip shows inline warning; save works
- [ ] Wizard Step 4 → creates a real client via `POST /clients`
- [ ] Wizard Step 5 → confetti fires; navigates to `/app/invoices/new?clientId=X`
- [ ] Browser close mid-wizard → reopen → wizard resumes from last completed step
- [ ] Invoice editor → currency dropdown switches to USD → GST section collapses, LUT field appears
- [ ] New invoice line item → SAC code auto-filled from `user.defaultHsnSac`
- [ ] Invoice view page (public URL) → shows SAC/HSN column with values
- [ ] USD invoice view → shows LUT declaration footer, hides GST row, shows $ symbols
- [ ] Settings → Profile → save defaultHsnSac → next new invoice auto-fills it
- [ ] Settings → Profile → save razorpayKeyId → portal payment button works
- [ ] Portal payment (client side) → no longer errors with "Razorpay not configured" for users who set keys
