import { fail, redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import type { Actions, PageServerLoad } from "./$types";

import * as auth from "$lib/server/auth";
import * as database from "$lib/server/database";
import { League } from "$lib/server/models/league";
import { User } from "$lib/server/models/user";
import * as validate from "$lib/server/validators";
import { leagueData, userData } from "$lib/stores";

import * as email from "$lib/server/email";

export const load = (() => {
  return get(leagueData);
}) satisfies PageServerLoad;

/** @type {import('./$types').Actions} */
export const actions: Actions = {
  default: async ({ request }) => {
    const errors: Array<string> = [];
    const data = await request.formData();

    // League Form Validation and Handling
    if (get(leagueData).installed === false) {
      validate.leagueName(errors, data.get("leagueName"));
      validate.leagueSport(errors, data.get("leagueSport"));
      validate.email(errors, data.get("outboundEmail"));

      if (errors.length > 0) {
        return fail(400, { errors });
      }

      const db = await database.connect();
      await new League({
        name: data.get("leagueName"),
        sport: data.get("leagueSport"),
        outboundEmail: data.get("outboundEmail"),
      }).save();
      await database.disconnect(db);

      leagueData.set({ installed: true, name: data.get("leagueName") });

      throw redirect(303, "/register");
    }

    // User Form Validation and Handling
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
      await database.disconnect(db);
      return fail(400, { errors });
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
      password: auth.hashPassword(data.get("password")),
    }).save();
    await database.disconnect(db);

    throw redirect(303, "/");
  },
};
