import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientEmail, clientName, freelancerName, pdfBase64, reportWeek } = body;

    if (!clientEmail || !pdfBase64) {
      return NextResponse.json({ error: "Missing clientEmail or pdfBase64" }, { status: 400 });
    }

    const pdfBuffer = Buffer.from(pdfBase64, "base64");

    const { data, error } = await resend.emails.send({
      from: "ReportDrop <reports@eighty5labs.com>",
      to: clientEmail,
      subject: `Your weekly report from ${freelancerName || "your agency"} — ${reportWeek || "this week"}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #1a1a2e;">Hi ${clientName || "there"},</h2>
          <p style="color: #444; line-height: 1.6;">Your weekly report from ${freelancerName || "your agency"} is attached.</p>
          <p style="color: #444; line-height: 1.6;">Open the PDF for your full breakdown — metrics, wins, challenges, and what's coming next week.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #888; font-size: 12px;">Sent via ReportDrop — <a href="https://bet2reportdrop.vercel.app" style="color: #6366f1;">reportdrop.io</a></p>
        </div>
      `,
      attachments: [
        {
          filename: `report-${reportWeek || "weekly"}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (err) {
    console.error("Send report error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
