import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: "Name must be at least 3 characters long." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== "string" || !subject.trim()) {
      return NextResponse.json(
        { success: false, error: "Subject is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    // SMTP configuration
    const host = process.env.SMTP_HOST || "mail.mkaruppiah.com";
    const port = Number(process.env.SMTP_PORT) || 465;
    const secure = process.env.SMTP_SECURE !== "false"; // true for port 465, false for 587
    const user = process.env.SMTP_USER || "info@mkaruppiah.com";
    const pass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_RECEIVER_EMAIL || "info@mkaruppiah.com";

    if (!pass) {
      console.error(
        "Nodemailer Error: SMTP_PASS is missing in environment variables (.env.local)."
      );
      return NextResponse.json(
        {
          success: false,
          error:
            "Mail service is not configured yet. Please configure SMTP_PASS in .env.local.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    const sanitizedPhone = phone && typeof phone === "string" && phone.trim()
      ? phone.trim()
      : "Not provided";

    // Plain text content
    const textContent = `
New Website Enquiry - M. Karuppiah Group
========================================

Sender Name: ${name.trim()}
Email Address: ${email.trim()}
Phone Number: ${sanitizedPhone}
Subject: ${subject.trim()}

Message:
${message.trim()}

Sent from: https://mkaruppiah.com/contacts
    `.trim();

    // HTML Email Template
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background-color: #c82021; color: #ffffff; padding: 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 20px; letter-spacing: 0.5px; font-weight: 700; text-transform: uppercase; }
    .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; }
    .content { padding: 28px; }
    .badge { display: inline-block; background-color: #fee2e2; color: #991b1b; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; margin-bottom: 20px; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .info-table td { padding: 10px 12px; font-size: 14px; border-bottom: 1px solid #f1f5f9; }
    .info-table .label { font-weight: 600; color: #64748b; width: 130px; text-transform: uppercase; font-size: 12px; }
    .info-table .value { color: #0f172a; font-weight: 500; }
    .message-box { background-color: #f8fafc; border-left: 4px solid #c82021; padding: 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; word-break: break-word; }
    .footer { padding: 18px 28px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8; }
    .footer a { color: #c82021; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>M. KARUPPIAH GROUP</h1>
      <p>Official Website Customer Enquiry</p>
    </div>
    <div class="content">
      <div class="badge">New Inquiry Received</div>
      <table class="info-table">
        <tr>
          <td class="label">Full Name:</td>
          <td class="value"><strong>${escapeHtml(name.trim())}</strong></td>
        </tr>
        <tr>
          <td class="label">Email Address:</td>
          <td class="value"><a href="mailto:${escapeHtml(email.trim())}" style="color: #c82021; text-decoration: none;">${escapeHtml(email.trim())}</a></td>
        </tr>
        <tr>
          <td class="label">Phone:</td>
          <td class="value">${escapeHtml(sanitizedPhone)}</td>
        </tr>
        <tr>
          <td class="label">Subject:</td>
          <td class="value">${escapeHtml(subject.trim())}</td>
        </tr>
      </table>

      <div style="margin-top: 20px; margin-bottom: 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b;">
        Message Details
      </div>
      <div class="message-box">${escapeHtml(message.trim())}</div>
    </div>
    <div class="footer">
      <p>This message was submitted via the contact form on <a href="https://mkaruppiah.com">mkaruppiah.com</a>.</p>
      <p>You can hit <strong>Reply</strong> to respond directly to ${escapeHtml(name.trim())} (${escapeHtml(email.trim())}).</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    // Send Mail
    await transporter.sendMail({
      from: `"M. Karuppiah Website" <${user}>`,
      to: toEmail,
      replyTo: `"${name.trim()}" <${email.trim()}>`,
      subject: `[Website Enquiry] ${subject.trim()} - from ${name.trim()}`,
      text: textContent,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, message: "Enquiry sent successfully!" });
  } catch (error: any) {
    console.error("Failed to send enquiry email via Nodemailer:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Failed to send email. Please verify your SMTP configuration.",
      },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
