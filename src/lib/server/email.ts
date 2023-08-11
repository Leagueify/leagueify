// 3rd Party Imports
import nodemailer from "nodemailer";
// Leagueify Imports
import database from "$lib/server/database";
import type { EmailConfigData, LeagueData, UserData } from "$lib/interfaces";

export async function createConfig(data: FormData) {
  // Parse Form Data
  const submittedEmailData: EmailConfigData = {
    outboundEmail: data.get("leagueOutboundEmail") as string,
    smtpHost: data.get("leagueSMTPHost") as string,
    smtpPort: Number.parseInt(data.get("leagueSMTPPort") as string),
    smtpUser: data.get("leagueSMTPUser") as string,
    smtpPass: data.get("leagueSMTPPass") as string,
  };

  return database.emailConfig.create({
    data: submittedEmailData,
  });
}

async function createTransport(emailConfig: EmailConfigData) {
  return nodemailer.createTransport({
    host: emailConfig.smtpHost,
    port: emailConfig.smtpPort,
    secure: true,
    auth: {
      user: emailConfig.smtpUser,
      pass: emailConfig.smtpPass,
    },
  });
}

export async function leagueCreation(user: UserData, league: LeagueData) {
  const emailConfig = await _get_emailConfig(league.emailConfig);

  const transporter = await createTransport(emailConfig);

  transporter.sendMail({
    from: `${league.name} <${emailConfig.outboundEmail}>`,
    to: user.email,
    subject: "Welcome to Leagueify!",
    text: `Thank you for using Leagueify! A league for ${league.name} has been created. Please verify your email address: http://${league.domain}/activate/league?token=${user.token}`,
    html: `<p>Thank you for using Leagueify! A league for <strong>${league.name}</strong> has been created.</p><p>Please verify your email address <a href="http://${league.domain}/activate/league?token=${user.token}" target="_blank">here</a>.</p>`,
  });
}

export async function userCreation(user: UserData, domain: string) {
  const league = await _get_league(domain);
  const emailConfig = await _get_emailConfig(league.emailConfig);
  const transporter = await createTransport(emailConfig);

  transporter.sendMail({
    from: `${league.name} <${emailConfig.outboundEmail}>`,
    to: user.email,
    subject: "Please Verify Your Email Address!",
    text: `Please verify your email address. http://${league.domain}/activate/account?token=${user.token}`,
    html: `<p>Thank you for using Leagueify! A league for <strong>${league.name}</strong> has been created.</p><p>Please verify your email address <a href="http://${league.domain}/activate/account?token=${user.token}" target="_blank">here</a>.</p>`,
  });
}

async function _get_emailConfig(id: number) {
  const emailConfig = await database.emailConfig.findUnique({
    where: {
      id: id,
    },
  });

  if (!emailConfig) {
    throw new Error(`Email config with ID ${id} not found.`);
  }

  return emailConfig;
}

async function _get_league(domain: string) {
  const league = await database.league.findUnique({
    where: {
      domain: domain,
    },
  });

  if (!league) {
    throw new Error(`League with domain ${domain} not found.`);
  }

  return league;
}
