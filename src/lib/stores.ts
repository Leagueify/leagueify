import { readable, writable } from "svelte/store";

const leagueObject = {
  installed: false,
};

const sportsArray = ["Hockey"];

export const leagueData = writable(leagueObject);
export const sports = readable(sportsArray);
export const userData = writable({});
