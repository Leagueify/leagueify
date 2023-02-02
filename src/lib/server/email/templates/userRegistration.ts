import { get } from "svelte/store";

import { leagueData, userData } from "$lib/stores";

export function userRegistration(token: string) {
  return {
    from: `"${get(leagueData).name}" <${get(leagueData).outboundEmail}>`,
    to: get(userData).email,
    subject: "Please Verify Your Email Address.",
    text: `Please verify your email address. localhost/register?token=${token}`,
    html: `<p>Please verify your email address <a href="localhost/register?token=${token}" target="_blank">here</a>.</p>`,
  };
}
