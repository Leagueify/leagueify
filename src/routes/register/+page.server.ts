import { fail, redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import type { Actions, PageServerLoadEvent } from "./$types";

import * as database from "$lib/server/database";
import { League } from "$lib/server/models/league";
import { User } from "$lib/server/models/user";
import * as validate from "$lib/server/validators";
import { leagueData } from "$lib/stores";

export const load = (() => {
  return get(leagueData);
}) satisfies PageServerLoadEvent;

/** @type {import('./$types').Actions} */
export const actions: Actions = {
  default: async ({ request }) => {
    const errors: Array<string> = [];
    const data = await request.formData();
    // Validate input fields
    validate.leagueName(errors, data.get("leagueName"));
    validate.leagueSport(errors, data.get("leagueSport"));
    validate.name(errors, data.get("firstName"), data.get("lastName"));
    const dateOfBirth = validate.birthdate(
      errors,
      data.get("month"),
      data.get("day"),
      data.get("year")
    );
    validate.email(errors, data.get("email"));
    validate.password(errors, data.get("password"));
    validate.phone(errors, data.get("phone"));

    // Connect to database and validate unique requirements
    const db = await database.connect();
    const uniqueEmail = await User.findOne({ email: data.get("email") });
    if (uniqueEmail) {
      errors.push("emailInUse");
    }
    const uniquePhone = await User.findOne({ phone: data.get("phone") });
    if (uniquePhone) {
      errors.push("phoneInUse");
    }

    if (errors.length > 0) {
      console.log(`Errors: ${errors.length}`);
      return fail(400, { errors });
    }

    if (get(leagueData).installed === false) {
      console.log("Installing league...");
      await new League({
        name: data.get("leagueName"),
        sport: data.get("leagueSport"),
      }).save();
    }

    await new User({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phone: data.get("phone"),
      dateOfBirth: dateOfBirth,
      players: [],
      coach: data.get("coach") ? true : false,
      volunteer: data.get("volunteer") ? true : false,
      systemRole: get(leagueData).installed ? "USER" : "MASTER_ADMIN",
      password: data.get("password"), // TODO: Hash password
      salt: "12345678", // TODO: Generate salt
    }).save();

    await database.disconnect(db);

    leagueData.set({ installed: true });
    throw redirect(303, "/");
  },
};
