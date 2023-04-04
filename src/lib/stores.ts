import { writable } from "svelte/store";

const forms = {};

const league = {
  installed: false,
};

export const formData = writable(forms);
export const leagueStore = writable(league);
