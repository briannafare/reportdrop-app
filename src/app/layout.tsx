import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "ReportDrop — Weekly Client Reports in 5 Minutes",
  description:
    "Stop spending 3 hours on client reports. ReportDrop generates professional, branded PDF reports for freelancers and consultants. $29/month.",
  openGraph: {
    title: "ReportDrop — Weekly Client Reports in 5 Minutes",
    description:
      "Professional weekly reports for freelancers. Enter your numbers, add your wins, download the PDF. $29/month.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
