// 3rd Party Imports
import { writable } from "svelte/store";
// Type Imports
import type { PageData } from "./types";

interface Divisions {
  id?: number;
  name?: string;
  minAge?: number;
  maxAge?: number;
}

interface League {
  installed: boolean;
  id?: number;
  name?: string;
  domain?: string;
  leagueAdmin?: number;
  emailConfig?: number;
}

interface Positions {
  id?: number;
  name?: string;
}

interface User {
  id?: number;
  name?: string;
  email?: string;
  token?: string;
}

// Store Data
const divisions: Divisions[] = [];
const forms: PageData = {};
const league: League = {
  installed: false,
};
const positions: Positions[] = [];
const user: User = {};

// Export Stores
export const divisionsStore = writable(divisions);
export const formStore = writable(forms);
export const leagueStore = writable(league);
export const positionsStore = writable(positions);
export const userStore = writable(user);
