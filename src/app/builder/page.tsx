"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Download,
  Mail,
  FileText,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";
import type { ReportData } from "@/components/ReportPDF";

function getTodayString() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

function getWeekLabel(dateStr: string) {
  if (!dateStr) return "This Week";
  const d = new Date(dateStr);
  const start = new Date(d);
  start.setDate(d.getDate() - d.getDay() + 1);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
}

const MOCK_DATA: ReportData = {
  clientName: "Acme Corp",
  reportWeek: "Jan 13 – Jan 19, 2025",
  brandColor: "#3B82F6",
  freelancerName: "Sarah Mitchell",
  metrics: [
    { label: "Ad Spend", value: "$2,340" },
    { label: "ROAS", value: "4.2x" },
    { label: "Conversions", value: "187" },
  ],
  wins: "Campaign restructuring led to a 24% increase in conversions this week. The new ad creative for the winter collection outperformed last month's best by 18%. Cost per acquisition dropped to $12.50, the lowest in Q1.",
  challenges: "Instagram reach dropped ~15% due to algorithm changes mid-week. We're adjusting content timing and format to recover.",
  nextWeekFocus: "Launch the Valentine's Day campaign. A/B test two new landing page variants. Increase remarketing budget by 20% based on this week's ROAS performance.",
  personalNote: "Great week overall — the creative refresh is paying off. Let's chat Thursday about the Q1 budget if you have time.",
};

export default function BuilderPage() {
  const [clientName, setClientName] = useState("");
  const [reportDate, setReportDate] = useState(getTodayString());
  const [brandColor, setBrandColor] = useState("#3B82F6");
  const [freelancerName, setFreelancerName] = useState("");
  const [metrics, setMetrics] = useState([
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
  ]);
  const [wins, setWins] = useState("");
  const [challenges, setChallenges] = useState("");
  const [nextWeekFocus, setNextWeekFocus] = useState("");
  const [personalNote, setPersonalNote] = useState("");
  const [generating, setGenerating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addMetric = () => {
    if (metrics.length < 6) {
      setMetrics([...metrics, { label: "", value: "" }]);
    }
  };

  const removeMetric = (i: number) => {
    if (metrics.length > 1) {
      setMetrics(metrics.filter((_, idx) => idx !== i));
    }
  };

  const updateMetric = (i: number, field: "label" | "value", val: string) => {
    const updated = [...metrics];
    updated[i] = { ...updated[i], [field]: val };
    setMetrics(updated);
  };

  const reportData: ReportData = useMemo(() => ({
    clientName: clientName || "Client Name",
    reportWeek: getWeekLabel(reportDate),
    brandColor,
    freelancerName: freelancerName || "Your Name",
    metrics,
    wins,
    challenges,
    nextWeekFocus,
    personalNote,
  }), [clientName, reportDate, brandColor, freelancerName, metrics, wins, challenges, nextWeekFocus, personalNote]);

  const handleLoadDemo = useCallback(() => {
    setClientName(MOCK_DATA.clientName);
    setFreelancerName(MOCK_DATA.freelancerName);
    setBrandColor(MOCK_DATA.brandColor);
    setMetrics(MOCK_DATA.metrics);
    setWins(MOCK_DATA.wins);
    setChallenges(MOCK_DATA.challenges);
    setNextWeekFocus(MOCK_DATA.nextWeekFocus);
    setPersonalNote(MOCK_DATA.personalNote);
    toast.success("Demo data loaded!");
  }, []);

  const handleGeneratePDF = useCallback(async () => {
    setGenerating(true);
    try {
      const reactPdf = await import("@react-pdf/renderer");
      const { default: ReportPDF } = await import("@/components/ReportPDF");
      const React = await import("react");
      const doc = React.createElement(ReportPDF, { data: reportData });
      // @ts-expect-error - react-pdf type mismatch with dynamic import
      const blob = await reactPdf.pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${(reportData.clientName || "report").replace(/\s+/g, "-").toLowerCase()}-report-${reportDate}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("PDF downloaded!");
    } catch (err) {
      console.error("PDF generation error:", err);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setGenerating(false);
    }
  }, [reportData, reportDate]);

  const handleEmailClick = () => {
    toast.success("Email sent to client! (Demo — email delivery coming soon)");
  };

  const hasContent =
    clientName || metrics.some((m) => m.label && m.value) || wins;

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-gray-400 hover:text-charcoal transition-colors flex items-center gap-1 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="flex items-center gap-2 text-charcoal">
              <Logo className="h-5 w-5" />
              <span className="font-bold text-sm">ReportDrop</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadDemo}
              className="text-sm text-gray-500 hover:text-charcoal transition-colors border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50"
            >
              Load Demo Data
            </button>
            <button
              onClick={handleEmailClick}
              className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-charcoal transition-colors border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50"
            >
              <Mail className="h-3.5 w-3.5" />
              Email to Client
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* ——— Left: Form ——— */}
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-500" />
                Report Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Report Week
                  </label>
                  <input
                    type="date"
                    value={reportDate}
                    onChange={(e) => setReportDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={freelancerName}
                    onChange={(e) => setFreelancerName(e.target.value)}
                    placeholder="Sarah Mitchell"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Brand Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-charcoal">Key Metrics</h2>
                {metrics.length < 6 && (
                  <button
                    onClick={addMetric}
                    className="text-xs text-blue-500 hover:text-blue-600 flex items-center gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Metric
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {metrics.map((m, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={m.label}
                      onChange={(e) => updateMetric(i, "label", e.target.value)}
                      placeholder="Metric name"
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                    <input
                      type="text"
                      value={m.value}
                      onChange={(e) => updateMetric(i, "value", e.target.value)}
                      placeholder="Value"
                      className="w-28 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                    {metrics.length > 1 && (
                      <button
                        onClick={() => removeMetric(i)}
                        className="text-gray-300 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Narrative Sections */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <h2 className="font-semibold text-charcoal">Narrative</h2>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Wins This Week
                </label>
                <textarea
                  value={wins}
                  onChange={(e) => setWins(e.target.value)}
                  rows={3}
                  placeholder="What went well this week?"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Challenges
                </label>
                <textarea
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                  rows={2}
                  placeholder="Any blockers or issues?"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Next Week&apos;s Focus
                </label>
                <textarea
                  value={nextWeekFocus}
                  onChange={(e) => setNextWeekFocus(e.target.value)}
                  rows={2}
                  placeholder="What's the plan for next week?"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Personal Note
                </label>
                <textarea
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                  rows={2}
                  placeholder="A quick personal note for your client"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGeneratePDF}
                disabled={generating}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {generating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download PDF Report
                  </>
                )}
              </button>
              <button
                onClick={handleEmailClick}
                className="sm:hidden flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Email to Client
              </button>
            </div>
          </div>

          {/* ——— Right: Live Preview ——— */}
          <div className="hidden lg:block">
            <div className="sticky top-20">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">
                    Report Preview
                  </span>
                  {hasContent && (
                    <span className="text-xs text-green-600 font-medium">
                      Live
                    </span>
                  )}
                </div>
                <div className="p-6">
                  {/* Mini preview */}
                  <div
                    className="h-1 rounded-full mb-5"
                    style={{ backgroundColor: reportData.brandColor }}
                  />
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="font-bold text-charcoal text-lg">
                        {reportData.clientName}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Weekly Report — {reportData.reportWeek}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Prepared by</p>
                      <p className="text-xs font-semibold text-charcoal">
                        {reportData.freelancerName}
                      </p>
                    </div>
                  </div>

                  {/* Metrics */}
                  {reportData.metrics.filter((m) => m.label && m.value)
                    .length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {reportData.metrics
                        .filter((m) => m.label && m.value)
                        .map((m, i) => (
                          <div
                            key={i}
                            className="bg-gray-50 rounded-lg p-3 border border-gray-100"
                          >
                            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                              {m.label}
                            </div>
                            <div
                              className="text-lg font-bold"
                              style={{ color: reportData.brandColor }}
                            >
                              {m.value}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Sections */}
                  {reportData.wins && (
                    <div className="mb-4">
                      <h4
                        className="text-xs font-bold mb-1.5"
                        style={{ color: reportData.brandColor }}
                      >
                        Wins This Week
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {reportData.wins}
                      </p>
                    </div>
                  )}
                  {reportData.challenges && (
                    <div className="mb-4">
                      <h4
                        className="text-xs font-bold mb-1.5"
                        style={{ color: reportData.brandColor }}
                      >
                        Challenges
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                        {reportData.challenges}
                      </p>
                    </div>
                  )}
                  {reportData.nextWeekFocus && (
                    <div className="mb-4">
                      <h4
                        className="text-xs font-bold mb-1.5"
                        style={{ color: reportData.brandColor }}
                      >
                        Next Week&apos;s Focus
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                        {reportData.nextWeekFocus}
                      </p>
                    </div>
                  )}
                  {reportData.personalNote && (
                    <div className="mb-4">
                      <h4 className="text-xs font-bold text-charcoal mb-1.5">
                        Personal Note
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed italic line-clamp-2">
                        {reportData.personalNote}
                      </p>
                    </div>
                  )}

                  {!hasContent && (
                    <div className="text-center py-12">
                      <FileText className="h-10 w-10 text-gray-200 mx-auto mb-3" />
                      <p className="text-sm text-gray-400">
                        Start filling in the form to see your report preview
                      </p>
                      <button
                        onClick={handleLoadDemo}
                        className="mt-3 text-sm text-blue-500 hover:text-blue-600 font-medium"
                      >
                        Or load demo data →
                      </button>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="mt-6 pt-3 border-t border-gray-100 flex justify-between">
                    <span className="text-[9px] text-gray-300">
                      Generated with ReportDrop
                    </span>
                    <span className="text-[9px] text-gray-300">
                      {reportData.clientName} — {reportData.reportWeek}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
