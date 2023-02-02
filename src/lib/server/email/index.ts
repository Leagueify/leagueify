import nodemailer from "nodemailer";

const smtpSettings: object = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

export async function send(template: string) {
  const transporter = nodemailer.createTransport(smtpSettings);

  transporter.sendMail(template);
}

export * as templates from "$lib/server/email/templates";
