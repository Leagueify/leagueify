import { readable, writable } from "svelte/store";

const leagueObject = {
  installed: false,
  name: null,
  outboundEmail: null,
};

const sportsArray = ["Hockey"];

const userObject: user = {};

interface user {
  firstName?: FormDataEntryValue;
  lastName?: FormDataEntryValue;
  email?: FormDataEntryValue;
  phone?: FormDataEntryValue;
  isActive?: boolean;
}

export const leagueData = writable(leagueObject);
export const sports = readable(sportsArray);
export const userData = writable(userObject);
