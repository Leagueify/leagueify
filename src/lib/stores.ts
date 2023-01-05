import { writable } from "svelte/store";

function leagueifyInstallation() {
  const { subscribe, set } = writable(false);

  return {
    subscribe,
    install: () => set(true),
  };
}

export const leagueify = leagueifyInstallation();
