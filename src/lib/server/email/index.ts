import nodemailer from "nodemailer";

import * as emailTemplate from "$lib/server/email/templates";

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

  if (template === "leagueCreation") {
    transporter.sendMail(await emailTemplate.leagueCreation());
  }
}
