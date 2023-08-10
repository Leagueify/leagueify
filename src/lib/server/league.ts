// Type Imports
import type { LeagueData } from "$lib/interfaces";
// Leagueify Imports
import database from "$lib/server/database";

export async function create(data: FormData, emailConfig: number) {
  // Parse Form Data
  const submittedLeagueData: LeagueData = {
    name: data.get("leagueName") as string,
    domain: data.get("domain") as string,
    sport: Number.parseInt(data.get("leagueSport") as string),
    emailConfig: emailConfig,
  };

  return database.league.create({
    data: submittedLeagueData,
  });
}

export async function createDivisions(data: FormData, leagueId: number) {
  // Parse Form Data
  const divisionData: string = data.get("leagueDivisions") as string;
  const submittedDivisions: Array<any> = JSON.parse(divisionData);

  submittedDivisions.forEach(async (division) => {
    division.league = leagueId;
  });

  return database.division.createMany({
    data: submittedDivisions,
  });
}

export async function createPositions(data: FormData, leagueId: number) {
  // Parse Form Data
  const positionData: string = data.get("leaguePositions") as string;
  const submittedPositions: Array<any> = [];
  positionData.split(",").forEach(async (position: string) => {
    submittedPositions.push({
      name: position,
      league: leagueId,
    });
  });
  return database.position.createMany({
    data: submittedPositions,
  });
}
