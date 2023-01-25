import { get } from "svelte/store";

import { leagueData, userData } from "$lib/stores";

export async function playerRegistration() {
  return {
    from: `"${get(leagueData).name}" <${process.env.SENDER_EMAIL}>`,
    to: get(userData).email,
    subject: "Leagueify: Registration Confirmation.",
    text: "Your player has been registered.",
    html: "<p>Your player has been registered.</p>",
  };
}
