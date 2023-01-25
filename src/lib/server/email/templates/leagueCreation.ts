import { get } from "svelte/store";

import { leagueData, userData } from "$lib/stores";

export async function leagueCreation() {
  return {
    from: `"${get(leagueData).name}" <${process.env.SENDER_EMAIL}>`,
    to: get(userData).email,
    subject: "Leagueify: League Created",
    text: "Your league has been created!",
    html: "<p>Your league has been created!</p>",
  };
}
