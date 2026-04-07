"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="flex items-center gap-2 text-white mb-3">
              <Logo className="h-6 w-6" />
              <span className="font-bold text-lg">ReportDrop</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Built for freelancers who don&apos;t want to waste time on
              formatting.
            </p>
          </div>
          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-2">
              <span className="text-white font-semibold mb-1">Product</span>
              <Link href="/builder" className="hover:text-white transition-colors">
                Report Builder
              </Link>
              <Link href="/#pricing" className="hover:text-white transition-colors">
                Pricing
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white font-semibold mb-1">Legal</span>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-700 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} ReportDrop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
