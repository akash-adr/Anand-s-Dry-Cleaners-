import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.anandlaundries.in',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        // Do not fail on invalid certs in case it's a shared cPanel host
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: `"Anand's Laundries" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Send to the leads email
      replyTo: email, // Allow hitting reply to reply to the user
      subject: `New Lead Inquiry: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #ffffff;">
          <h2 style="color: #096C6C; margin-bottom: 20px;">New Website Lead</h2>
          <p>You have received a new inquiry from the website contact form.</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 100px; color: #334155;">Name</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #334155;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${email}" style="color: #096C6C;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #334155;">Phone</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #334155;">Message</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a; line-height: 1.5;">${message.replace(/\n/g, '<br/>')}</td>
            </tr>
          </table>
          <p style="margin-top: 30px; font-size: 12px; color: #94a3b8; text-align: center;">
            This email was generated automatically by the Anand Laundries website.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error: any) {
    console.error('SMTP Error:', error);
    return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 });
  }
}
