import { redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";

import * as database from "$lib/server/database";
import { League } from "$lib/server/models/league";
import { User } from "$lib/server/models/user";

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    console.log(data);

    const db = await database.connect();
    await new League(
      await {
        name: data.get("leagueName"),
        sport: data.get("leagueSport"),
      }
    ).save();

    await new User(
      await {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        phone: data.get("phone"),
        dateOfBirth: `${data.get("month")}${data.get("day")}${data.get(
          "year"
        )}`,
        players: [],
        coach: data.get("coach") ? true : false,
        volunteer: data.get("coach") ? true : false,
        systemRole: "MASTER_ADMIN",
        password: data.get("password"),
        salt: "12345678",
      }
    ).save();

    await database.disconnect(db);

    throw redirect(303, "/");
  },
};
