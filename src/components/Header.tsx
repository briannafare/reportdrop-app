"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 text-charcoal">
          <Logo className="h-7 w-7" />
          <span className="font-bold text-lg tracking-tight">ReportDrop</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <button
            onClick={() =>
              document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-charcoal transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() =>
              document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-charcoal transition-colors"
          >
            Pricing
          </button>
          <button
            onClick={() =>
              document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-charcoal transition-colors"
          >
            FAQ
          </button>
          <Link
            href="/builder"
            className="bg-blue-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Try Free
          </Link>
        </nav>
        <Link
          href="/builder"
          className="md:hidden bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
        >
          Try Free
        </Link>
      </div>
    </header>
  );
}
