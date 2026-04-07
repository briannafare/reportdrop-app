"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hiJ-Ek-_EeA.woff2",
      fontWeight: 600,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hiJ-Ek-_EeA.woff2",
      fontWeight: 700,
    },
  ],
});

export interface ReportData {
  clientName: string;
  reportWeek: string;
  brandColor: string;
  freelancerName: string;
  metrics: { label: string; value: string }[];
  wins: string;
  challenges: string;
  nextWeekFocus: string;
  personalNote: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: "Inter",
    fontSize: 10,
    color: "#1E1E2E",
    backgroundColor: "#FFFFFF",
  },
  headerBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
  },
  clientName: {
    fontSize: 22,
    fontWeight: 700,
    color: "#1E1E2E",
  },
  weekLabel: {
    fontSize: 10,
    color: "#6B7280",
    marginTop: 4,
  },
  preparedBy: {
    fontSize: 9,
    color: "#6B7280",
    textAlign: "right" as const,
  },
  metricsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  metricLabel: {
    fontSize: 9,
    color: "#6B7280",
    marginBottom: 4,
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 700,
    color: "#1E1E2E",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#1E1E2E",
    marginBottom: 8,
    marginTop: 20,
  },
  sectionBody: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.6,
    marginBottom: 8,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginTop: 16,
    marginBottom: 8,
  },
  footer: {
    position: "absolute",
    bottom: 32,
    left: 48,
    right: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 12,
  },
  footerText: {
    fontSize: 8,
    color: "#9CA3AF",
  },
});

export default function ReportPDF({ data }: { data: ReportData }) {
  const color = data.brandColor || "#3B82F6";
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Color bar */}
        <View style={[styles.headerBar, { backgroundColor: color }]} />

        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.clientName}>{data.clientName || "Client Name"}</Text>
            <Text style={styles.weekLabel}>
              Weekly Report — {data.reportWeek || "This Week"}
            </Text>
          </View>
          <View>
            <Text style={styles.preparedBy}>
              Prepared by{"\n"}
              <Text style={{ fontWeight: 600 }}>
                {data.freelancerName || "Your Name"}
              </Text>
            </Text>
          </View>
        </View>

        {/* Metrics */}
        {data.metrics.filter((m) => m.label && m.value).length > 0 && (
          <View style={styles.metricsRow}>
            {data.metrics
              .filter((m) => m.label && m.value)
              .map((m, i) => (
                <View key={i} style={styles.metricCard}>
                  <Text style={styles.metricLabel}>{m.label}</Text>
                  <Text style={[styles.metricValue, { color }]}>{m.value}</Text>
                </View>
              ))}
          </View>
        )}

        {/* Wins */}
        {data.wins && (
          <>
            <Text style={[styles.sectionTitle, { color }]}>Wins This Week</Text>
            <Text style={styles.sectionBody}>{data.wins}</Text>
            <View style={styles.divider} />
          </>
        )}

        {/* Challenges */}
        {data.challenges && (
          <>
            <Text style={[styles.sectionTitle, { color }]}>Challenges</Text>
            <Text style={styles.sectionBody}>{data.challenges}</Text>
            <View style={styles.divider} />
          </>
        )}

        {/* Next Week */}
        {data.nextWeekFocus && (
          <>
            <Text style={[styles.sectionTitle, { color }]}>Next Week&apos;s Focus</Text>
            <Text style={styles.sectionBody}>{data.nextWeekFocus}</Text>
            <View style={styles.divider} />
          </>
        )}

        {/* Personal Note */}
        {data.personalNote && (
          <>
            <Text style={styles.sectionTitle}>Personal Note</Text>
            <Text style={[styles.sectionBody, { fontStyle: "italic" }]}>
              {data.personalNote}
            </Text>
          </>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Generated with ReportDrop
          </Text>
          <Text style={styles.footerText}>
            {data.clientName} — {data.reportWeek}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
