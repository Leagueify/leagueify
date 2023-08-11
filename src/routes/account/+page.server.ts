// 3rd Party Imports
import { redirect } from "@sveltejs/kit";
// Type Imports
import type { Actions } from "./$types";
// Leagueify Imports
import * as account from "$lib/server/account";
import * as auth from "$lib/utils/auth";
import database from "$lib/server/database";
import * as email from "$lib/server/email";
import { userStore } from "$lib/stores";
import { UserRoles } from "$lib/interfaces";

export const actions: Actions = {
  login: async ({ cookies, request }) => {
    const formData = await request.formData();

    if (formData.get("userEmail") && formData.get("userPass")) {
      const user = await database.user.findFirst({
        where: {
          email: formData.get("userEmail")?.toString(),
        },
      });

      if (
        user &&
        auth.verifyCredentials(
          formData.get("userPass").toString(),
          user.password
        )
      ) {
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

  register: async ({ request }) => {
    const data: FormData = await request.formData();

    const registerUser = await account.create(data, UserRoles.USER);

    email.userCreation(registerUser, request.headers.get("host"));

    // Set Stores
    userStore.set({
      id: registerUser.id,
      name: registerUser.name,
      email: registerUser.email,
    });

    throw redirect(303, "/");
  },
};
