"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FileText,
  Palette,
  Mail,
  Wrench,
  Keyboard,
  ChevronDown,
  Check,
  X,
  Minus,
  ArrowRight,
  Clock,
  DollarSign,
  BarChart3,
  Zap,
} from "lucide-react";
import { useState } from "react";

/* ——— FAQ Accordion ——— */
const faqs = [
  {
    q: "Can I use my own logo and brand colors?",
    a: "Yes. Every report can be customized with your client's brand color and your business name. Upload logos in a future update — for now, the color theming keeps things clean and professional.",
  },
  {
    q: "What metrics can I include?",
    a: "Anything you want. You define custom metric labels and values — whether that's Ad Spend, ROAS, Organic Sessions, New Followers, or Conversion Rate. ReportDrop works for any service type.",
  },
  {
    q: "Can I email reports directly from the tool?",
    a: "Yes. Enter your client's email and send the branded PDF straight from ReportDrop. No need to download, attach, and send separately.",
  },
  {
    q: "Do my clients need an account?",
    a: "No. Clients receive a clean PDF in their inbox — no login, no dashboard, no friction. They open it and see your work.",
  },
  {
    q: "Is there a free trial?",
    a: "Your first report is free — no credit card required. After that, it's $29/month for unlimited clients and reports. Cancel anytime.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-semibold text-charcoal pr-4">{q}</span>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <p className="pb-5 text-gray-600 leading-relaxed text-[15px]">{a}</p>
      )}
    </div>
  );
}

/* ——— Comparison Table ——— */
function ComparisonTable() {
  const features = [
    "Professional PDF reports",
    "Custom branding",
    "Email to client",
    "Setup time",
    "Monthly cost",
    "Best for",
  ];
  const tools: Record<string, string[]> = {
    ReportDrop: [
      "Yes",
      "Yes",
      "Yes",
      "5 minutes",
      "$29",
      "Solo freelancers",
    ],
    AgencyAnalytics: [
      "Yes",
      "Yes",
      "Yes",
      "2–4 hours",
      "$59–179",
      "Agencies (10+ clients)",
    ],
    "Google Slides": [
      "No (slides)",
      "Manual",
      "Manual",
      "1–2 hours/report",
      "Free",
      "One-off reports",
    ],
    Canva: [
      "No (design file)",
      "Manual",
      "Manual",
      "1–2 hours/report",
      "$13+",
      "Visual-first reports",
    ],
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left py-3 pr-4 font-semibold text-gray-500 min-w-[140px]">
              Feature
            </th>
            {Object.keys(tools).map((tool) => (
              <th
                key={tool}
                className={`text-left py-3 px-3 font-semibold min-w-[130px] ${
                  tool === "ReportDrop" ? "text-blue-500" : "text-charcoal"
                }`}
              >
                {tool}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feat, i) => (
            <tr key={feat} className="border-b border-gray-100">
              <td className="py-3 pr-4 text-gray-600 font-medium">{feat}</td>
              {Object.values(tools).map((vals, j) => (
                <td key={j} className="py-3 px-3">
                  {vals[i] === "Yes" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : vals[i] === "No" || vals[i].startsWith("No ") ? (
                    <span className="flex items-center gap-1 text-gray-400">
                      <X className="h-4 w-4" />
                      <span className="text-xs">{vals[i].replace("No", "").replace("(", "").replace(")", "")}</span>
                    </span>
                  ) : vals[i] === "Manual" ? (
                    <span className="text-gray-400 flex items-center gap-1">
                      <Minus className="h-4 w-4" /> Manual
                    </span>
                  ) : (
                    <span
                      className={
                        j === 0 ? "font-semibold text-charcoal" : "text-gray-600"
                      }
                    >
                      {vals[i]}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ——— Main Page ——— */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ——— Hero ——— */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Zap className="h-4 w-4" />
              For freelancers managing 1–10 clients
            </div>
            <h1 className="text-4xl md:text-[56px] md:leading-[1.08] font-extrabold text-charcoal tracking-tight mb-6">
              Stop Spending 3 Hours on Client Reports
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
              ReportDrop generates professional weekly reports in 5 minutes —
              write your notes, we handle the design.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/builder"
                className="bg-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
              >
                Generate Your First Report Free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button
                onClick={() =>
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-gray-500 font-medium hover:text-charcoal transition-colors"
              >
                See how it works &darr;
              </button>
            </div>
          </div>
        </section>

        {/* ——— Report Preview Mock ——— */}
        <section className="pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 md:p-10 shadow-sm">
              <div className="bg-white rounded-xl border border-gray-100 p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="h-3 w-20 bg-blue-500 rounded-full mb-2" />
                    <div className="text-xs text-gray-400">Weekly Report — Jan 13–19, 2025</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-charcoal">Acme Corp</div>
                    <div className="text-xs text-gray-400">Prepared by Sarah M.</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Ad Spend", value: "$2,340", change: "+12%" },
                    { label: "ROAS", value: "4.2x", change: "+0.3" },
                    { label: "Conversions", value: "187", change: "+24%" },
                  ].map((m) => (
                    <div key={m.label} className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-400 mb-1">{m.label}</div>
                      <div className="text-xl font-bold text-charcoal">{m.value}</div>
                      <div className="text-xs text-green-600 font-medium mt-1">{m.change}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="h-2.5 bg-gray-100 rounded-full w-full" />
                  <div className="h-2.5 bg-gray-100 rounded-full w-4/5" />
                  <div className="h-2.5 bg-gray-100 rounded-full w-3/5" />
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-400 mt-4">
              Example report output — your clients see a clean, branded PDF
            </p>
          </div>
        </section>

        {/* ——— Pain Section ——— */}
        <section className="py-20 px-6 bg-charcoal text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Your client doesn&apos;t care about Looker Studio dashboards.
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
              They care that you&apos;re winning for them. Show them — with a
              clear, professional report that takes 5 minutes instead of 3
              hours.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: Clock,
                  title: "2–3 hours per client",
                  desc: "That's what manual reporting costs you every week. Time you could spend on actual client work.",
                },
                {
                  icon: DollarSign,
                  title: "$59–179/mo for agency tools",
                  desc: "AgencyAnalytics, Whatagraph, DashThis — built for agencies with 50 clients, not solo operators.",
                },
                {
                  icon: BarChart3,
                  title: "Clients don't read dashboards",
                  desc: "They want a summary: what happened, what's next, and are you winning? A PDF they can skim in 2 minutes.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white/5 rounded-xl p-6 text-left border border-white/10"
                >
                  <item.icon className="h-6 w-6 text-blue-400 mb-3" />
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ——— How It Works ——— */}
        <section id="how-it-works" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal tracking-tight mb-4">
                Three steps. Five minutes. Done.
              </h2>
              <p className="text-gray-500 text-lg">
                No integrations to configure. No dashboards to build.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Enter this week's numbers",
                  desc: "Type your key metrics — ad spend, conversions, traffic, whatever matters for this client.",
                  icon: Keyboard,
                },
                {
                  step: "2",
                  title: "Add your wins and next steps",
                  desc: "Write what went well, what you're working on, and any notes for the client. The human touch they're paying for.",
                  icon: FileText,
                },
                {
                  step: "3",
                  title: "Download PDF or email it",
                  desc: "Get a polished, branded PDF report. Send it directly to your client or download to attach yourself.",
                  icon: Mail,
                },
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="bg-blue-50 text-blue-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-charcoal text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-[15px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ——— Features ——— */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal tracking-tight text-center mb-16">
              Everything you need. Nothing you don&apos;t.
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: FileText,
                  title: "Clean, professional PDF design",
                  desc: "Reports that clients actually open — not a wall of charts. Clear metrics, narrative summary, next steps.",
                },
                {
                  icon: Palette,
                  title: "Your branding, not ours",
                  desc: "Set your client's brand color and your business name. Every report looks like it came from you.",
                },
                {
                  icon: Mail,
                  title: "Email directly to client",
                  desc: "Send the PDF straight from ReportDrop. No downloading and re-attaching in Gmail.",
                },
                {
                  icon: Wrench,
                  title: "Works for any service type",
                  desc: "PPC, SEO, social media, web design, consulting — define your own metrics and sections.",
                },
                {
                  icon: Keyboard,
                  title: "No complex integrations needed",
                  desc: "Just type your numbers. No API keys, no OAuth flows, no broken connections. (Integrations coming in v2.)",
                },
                {
                  icon: Zap,
                  title: "5-minute reports, every week",
                  desc: "Client branding is saved. Just update this week's numbers, write your notes, and send.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors"
                >
                  <f.icon className="h-5 w-5 text-blue-500 mb-3" />
                  <h3 className="font-semibold text-charcoal mb-1.5">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ——— Comparison ——— */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal tracking-tight text-center mb-4">
              How ReportDrop compares
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
              Built specifically for solo freelancers. Not downsized agency software.
            </p>
            <ComparisonTable />
          </div>
        </section>

        {/* ——— Testimonials ——— */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal tracking-tight text-center mb-12">
              Freelancers are shipping reports faster
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  quote:
                    "I used to spend Sunday nights building reports in Canva. Now it's 10 minutes Monday morning and my clients love the format.",
                  name: "Jamie R.",
                  role: "PPC Consultant",
                },
                {
                  quote:
                    "My clients think I hired a designer. It's just ReportDrop. The branded PDF looks way more professional than a Google Slides deck.",
                  name: "Priya S.",
                  role: "Social Media Manager",
                },
                {
                  quote:
                    "I tried AgencyAnalytics but it was overkill for my 6 clients. ReportDrop is exactly what I needed — simple, fast, professional.",
                  name: "Marcus T.",
                  role: "SEO Freelancer",
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className="bg-white rounded-xl border border-gray-200 p-6"
                >
                  <p className="text-gray-600 text-[15px] leading-relaxed mb-5">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <div className="font-semibold text-charcoal text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ——— Pricing ——— */}
        <section id="pricing" className="py-20 px-6">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal tracking-tight mb-4">
              Simple pricing. No surprises.
            </h2>
            <p className="text-gray-500 mb-10">
              One plan. Everything included. Cancel anytime.
            </p>
            <div className="bg-white rounded-2xl border-2 border-charcoal p-8 shadow-sm">
              <div className="text-5xl font-extrabold text-charcoal mb-1">
                $29
                <span className="text-lg font-medium text-gray-400">/mo</span>
              </div>
              <p className="text-gray-500 mb-6">
                Unlimited clients. Unlimited reports.
              </p>
              <ul className="text-left space-y-3 mb-8">
                {[
                  "Unlimited branded PDF reports",
                  "Unlimited clients",
                  "Email delivery to clients",
                  "Custom metrics and sections",
                  "Saved client branding",
                  "Cancel anytime — no contracts",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#payment"
                id="payment"
                className="block w-full bg-blue-500 text-white py-3.5 rounded-xl font-semibold text-lg hover:bg-blue-600 transition-colors"
              >
                Start Free — Then $29/Month
              </a>
              <p className="text-xs text-gray-400 mt-3">
                First report free. No credit card required.
              </p>
            </div>
          </div>
        </section>

        {/* ——— FAQ ——— */}
        <section id="faq" className="py-20 px-6 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal tracking-tight text-center mb-12">
              Questions? Covered.
            </h2>
            {faqs.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </section>

        {/* ——— Final CTA ——— */}
        <section className="py-24 px-6 bg-charcoal text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Your clients deserve better than a spreadsheet screenshot.
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Generate your first report in 5 minutes. Free. No credit card.
            </p>
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
            >
              Generate Your First Report Free
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
