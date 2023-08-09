// 34d Party Imports
import { redirect } from "@sveltejs/kit";
// Type Imports
import type { Actions } from "./$types";
// Leagueify Imports
import database from "$lib/server/database";
import * as auth from "$lib/utils/auth";

export const actions: Actions = {
  login: async ({ cookies, request } ) => {
    console.log("Attempting to login...")
    const formData = await request.formData();

    console.log(formData)

    if (formData.get("userEmail") && formData.get("userPass")) {
      const user = await database.user.findFirst({
        where: {
          email: formData.get("userEmail")?.toString(),
        },
      });

      if (user && auth.verifyCredentials(formData.get("userPass").toString(), user.password)) {
        const authToken = auth.generateToken(64);
        await database.user.update({
          where: {
            id: user.id,
          },
          data: {
            token: authToken,
            expiration: auth.generateTokenExpiration(1440),
          },
        });

        cookies.set("Leagueify-Token", authToken, {
          maxAge: 1440,
          path: "/",
        });

      }
    }
    throw redirect(303, "/");
  },

  logout: async (event) => {
    event.cookies.delete("Leagueify-Token");
    event.locals.user = null;

    throw redirect(303, "/");
  },

  // TODO: Implement
  // register: async ({ event, request }) => {},
};
