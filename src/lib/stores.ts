// 3rd Party Imports
import { writable } from "svelte/store";
// Type Imports
import type { League, PageData, User } from "./$types";

// Store Data
const forms: PageData = {};
const league: League = {
  installed: false,
  isActive: false,
};
const user: User = {};

// Export Stores
export const formStore = writable(forms);
export const leagueStore = writable(league);
export const userStore = writable(user);
