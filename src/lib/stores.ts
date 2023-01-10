import { writable } from "svelte/store";

const leagueObject = {
  installed: false,
};

export const leagueData = writable(leagueObject);
export const userData = writable({});
