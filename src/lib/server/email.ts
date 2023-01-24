import nodemailer from "nodemailer";
import { get } from "svelte/store";

import { leagueData } from "$lib/stores";

const smtpSettings: object = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

export async function send(
  to: FormDataEntryValue | null,
  subject: string,
  text: string,
  html: string
) {
  to = to?.toString() || "";
  const transporter = nodemailer.createTransport(smtpSettings);

  await transporter.sendMail({
    from: `${get(leagueData).name} <${process.env.SENDER_EMAIL}>`,
    to,
    subject,
    text,
    html,
  });
}
