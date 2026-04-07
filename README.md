# ReportDrop

**Your weekly client report — written, branded, and sent in 5 minutes.**

ReportDrop is a micro-SaaS tool for solo freelancers and consultants managing 1–10 clients (PPC managers, social media managers, SEO consultants, web designers). It generates professional, branded PDF reports without the complexity of enterprise tools like AgencyAnalytics or the tedium of manual Canva/Google Slides templates.

## What It Does

1. **Enter this week's metrics** — custom labels and values (Ad Spend, ROAS, Conversions, etc.)
2. **Write your narrative** — wins, challenges, next week's focus, personal note
3. **Download PDF or email it** — polished, branded report your client can skim in 2 minutes

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **@react-pdf/renderer** for client-side PDF generation
- **react-hot-toast** for notifications
- **Vercel** for deployment

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — conversion-optimized marketing page |
| `/builder` | Report builder — form + live preview + PDF download |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

## Wiring Resend for Real Email Delivery

1. Sign up at [resend.com](https://resend.com) and get an API key
2. Add `RESEND_API_KEY` to your `.env.local`
3. Create an API route at `app/api/send-report/route.ts`:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { to, clientName, pdfBase64 } = await request.json();
  
  const { data, error } = await resend.emails.send({
    from: 'reports@yourdomain.com',
    to: [to],
    subject: `Weekly Report — ${clientName}`,
    html: '<p>Your weekly report is attached.</p>',
    attachments: [{
      filename: `${clientName}-report.pdf`,
      content: pdfBase64,
    }],
  });

  if (error) return Response.json({ error }, { status: 500 });
  return Response.json({ data });
}
```

4. Verify your sending domain in Resend's dashboard

## Adding Stripe Payment Link

1. Create a product in [Stripe Dashboard](https://dashboard.stripe.com) → Products
2. Set price to $29/month recurring
3. Generate a Payment Link from the product page
4. Replace the `#payment` href in the landing page CTA with your Stripe Payment Link URL:

```tsx
// In src/app/page.tsx, find the pricing CTA:
<a href="https://buy.stripe.com/your-link-here" ...>
```

For test mode, use Stripe's test mode payment links. Switch to live when ready.

## Supabase (Future)

To add persistent storage for client profiles and saved reports:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`
3. Create tables for `clients` (name, brand_color) and `reports` (client_id, data, created_at)

## Acquisition Bait

This repo is public intentionally. ReportDrop is a real product solving a real pain point for freelancers who:
- Spend 2–3 hours per client per week on manual reporting
- Find AgencyAnalytics ($59–179/mo) overkill for their solo practice
- Want professional reports without learning Looker Studio

The landing page, working demo, and PDF generation are all live. Fork it, learn from it, or subscribe at $29/mo and save yourself 10+ hours per month.

## License

MIT
