import nodemailer from "nodemailer";
import { get } from "svelte/store";

import database from "$lib/server/database";
import { leagueStore, userStore } from "$lib/stores";

export async function leagueCreation() {
  const { league, user, leagueEmailConfig } = await getRequestDetails();
  const transporter = await createTransport(leagueEmailConfig);

  const userDetails = await database.user.findUnique({
    where: {
      id: user.id,
    },
  });

  transporter.sendMail({
    from: `${league.name} <${leagueEmailConfig?.outboundEmail}>`,
    to: user.email,
    subject: "Welcome to Leagueify!",
    text: `Thank you for using Leagueify! A league for ${league.name} has been created. Please verify your email address: ${league.domain}/install?token=${userDetails?.token}`,
    html: `<p>Thank you for using Leagueify! A league for <strong>${league.name}</strong> has been created.</p><p>Please verify your email address <a href="${league.domain}/install?token=${userDetails?.token}" target="_blank">here</a>.</p>`,
  });
}

export async function userCreation() {
  const { league, user, leagueEmailConfig } = await getRequestDetails();
  const transporter = await createTransport(leagueEmailConfig);

  const userDetails = await database.user.findUnique({
    where: {
      id: user.id,
    },
  });

  transporter.sendMail({
    from: `${league.name} <${leagueEmailConfig?.outboundEmail}>`,
    to: user.email,
    subject: "Please Verify Your Email Address",
    text: `Please verify your email address. ${league.domain}/register?token=${userDetails?.token}`,
    html: `<p>Please verify your email address <a href="${league.domain}/register?token=${userDetails?.token}" target="_blank">here</a>.</p>`,
  });
}

async function createTransport(leagueEmailConfig: any) {
  return nodemailer.createTransport({
    host: leagueEmailConfig?.smtpHost,
    port: leagueEmailConfig?.smtpPort,
    secure: true,
    auth: {
      user: leagueEmailConfig?.smtpUser,
      pass: leagueEmailConfig?.smtpPass,
    },
  });
}

async function getRequestDetails() {
  const league = get(leagueStore);
  const user = get(userStore);

  const leagueEmailConfig = await database.emailConfig.findUnique({
    where: {
      id: league.emailConfig,
    },
  });

  return {
    league,
    user,
    leagueEmailConfig,
  };
}
