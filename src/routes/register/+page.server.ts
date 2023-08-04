// 3rd Party Imports
import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
// Type Imports
import type { Actions, PageData, PageServerLoad } from "./$types";
// Leagueify Imports
import database from "$lib/server/database";
// import * as email from "$lib/server/email";
import { leagueStore, userStore } from "$lib/stores";
import * as auth from "$lib/utils/auth";

// Load Function
// export const load: PageServerLoad = async ({ cookies, request, url }) => {
//   return
// };

// Register Action
export const actions: Actions = {
  register: async ({ request }) => {
    const data: PageData = await request.formData();

    // Create User
    const user = await database.user.create({
      data: {
        name: data.get("userName"),
        email: data.get("userEmail"),
        phoneNumber: data.get("userPhone"),
        dateOfBirth: new Date(data.get("userDOB")).valueOf(),
        role: "USER",
        password: auth.hashPassword(data.get("userPass")),
        token: auth.generateToken(),
        expiration: auth.generateTokenExpiration(),
      },
    });

    // Set Stores
    userStore.set({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    // Send User Registration Confirmation Email
    email.userCreation();

    throw redirect(303, "/");
  },
};
