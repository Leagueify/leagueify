// 3rd Party Imports
import nodemailer from "nodemailer";
// Type Imports
import type { PageData } from "./$types";
// Leagueify Imports
import database from "$lib/server/database";

export async function leagueCreation(
  emailData: PageData,
  leagueData: PageData,
  userData: PageData
) {
  const transporter = await createTransport(emailData);

  transporter.sendMail({
    from: `${leagueData.name} <${emailData.outboundEmail}>`,
    to: userData.email,
    subject: "Welcome to Leagueify!",
    text: `Thank you for using Leagueify! A league for ${leagueData.name} has been created. Please verify your email address: http://${leagueData.domain}/activate/league?token=${userData.token}`,
    html: `<p>Thank you for using Leagueify! A league for <strong>${leagueData.name}</strong> has been created.</p><p>Please verify your email address <a href="http://${leagueData.domain}/activate/league?token=${userData.token}" target="_blank">here</a>.</p>`,
  });
}

export async function userCreation(
  emailData: PageData,
  leagueData: PageData,
  userData: PageData
) {
  const transporter = await createTransport(emailData);

  transporter.sendMail({
    from: `${leagueData.name} <${emailData.outboundEmail}>`,
    to: userData.email,
    subject: "Please Verify Your Email Address!",
    text: `Please verify your email address. http://${leagueData.domain}/activate/user?token=${userData.token}`,
    html: `<p>Thank you for using Leagueify! A league for <strong>${leagueData.name}</strong> has been created.</p><p>Please verify your email address <a href="http://${leagueData.domain}/activate/league?token=${userData.token}" target="_blank">here</a>.</p>`,
  });
}

async function createTransport(email: PageData) {
  return nodemailer.createTransport({
    host: email.smtpHost,
    port: email.smtpPort,
    secure: true,
    auth: {
      user: email.smtpUser,
      pass: email.smtpPass,
    },
  });
}
