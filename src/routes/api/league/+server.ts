import { json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

import * as database from "$lib/server/database";
import { League } from "$lib/server/models/league";

export const GET: RequestHandler = async () => {
  // Response Details
  const responseCode = {
    status: 200,
  };
  let responseData = {};

  // Connect to database
  const db = await database.connect();

  // Find one League
  const leagueData = await League.findOne({}).exec();

  if (leagueData) {
    responseData = leagueData;
  }

  // Disconnect from database
  await database.disconnect(db);

  return json(responseData, responseCode);
};

export const POST: RequestHandler = async ({ request }) => {
  // Response Details
  const responseCode = {
    status: 201,
  };
  const responseData = {
    message: "Created",
  };

  // Connect to database
  const db = await database.connect();

  // Find one League
  const exists = await League.findOne({}).exec();

  if (exists) {
    responseCode.status = 400;
    responseData.message = "Bad Request";
  } else {
    // Create one League
    await new League(await request.json()).save();
  }

  // Disconnect from database
  await database.disconnect(db);

  return json(responseData, responseCode);
};

export const PATCH: RequestHandler = async ({ request }) => {
  // Response Details
  const responseCode = {
    status: 200,
  };
  const responseData = {
    message: "Updated",
  };

  // Connect to database
  const db = await database.connect();

  // Find one League
  const exists = await League.findOne({}).exec();

  if (!exists) {
    responseCode.status = 400;
    responseData.message = "Bad Request";
  } else {
    // Update League
    await League.findOneAndUpdate({}, await request.json()).exec();
  }

  // Disconnect from database
  await database.disconnect(db);

  return json(responseData, responseCode);
};
