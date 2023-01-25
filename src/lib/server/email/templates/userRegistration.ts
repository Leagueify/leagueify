import { get } from "svelte/store";

import { leagueData, userData } from "$lib/stores";

export async function userRegistration() {
  return {
    from: `"${get(leagueData).name}" <${process.env.SENDER_EMAIL}>`,
    to: get(userData).email,
    subject: "Leagueify: Please Verify Your Email Address.",
    text: "Please verify your email address.",
    html: "<p>Please verify your email address.</p>",
  };
}
