import { readable, writable } from "svelte/store";

const leagueObject = {
  installed: false,
  name: null,
};

const sportsArray = ["Hockey"];

const userObject = {
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
};

export const leagueData = writable(leagueObject);
export const sports = readable(sportsArray);
export const userData = writable(userObject);
