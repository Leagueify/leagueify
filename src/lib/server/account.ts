// 3rd Party Imports
import { redirect } from "@sveltejs/kit";
// Type Imports
import type { UserData, UserRoles } from "$lib/interfaces";
import type { RequestEvent } from "@sveltejs/kit";
// Leagueify Imports
import * as auth from "$lib/utils/auth";
import database from "$lib/server/database";

export async function activate(event: RequestEvent) {
  const activationToken: string = event.url.searchParams.get("token") as string;

  const authToken = auth.generateToken(64);

  const user = await database.user.update({
    where: {
      token: activationToken,
    },
    data: {
      token: authToken,
      expiration: auth.generateTokenExpiration(1440),
      isActive: true,
    },
  });

  // Set User Cookie
  event.cookies.set("Leagueify-Token", authToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    path: "/",
  });

  event.locals = {
    user: user,
    ...event.locals,
  };

  throw redirect(303, "/");
}

export async function create(data: FormData, role: UserRoles) {
  // Parse Form Data
  const submittedUserData: UserData = {
    name: data.get("userName") as string,
    email: data.get("userEmail") as string,
    phoneNumber: data.get("userPhone") as string,
    dateOfBirth: new Date(data.get("userDOB") as string).valueOf(),
    password: auth.hashPassword(data.get("userPass") as string),
    token: auth.generateToken(),
    expiration: auth.generateTokenExpiration(),
    role: role,
  };

  return database.user.create({
    data: submittedUserData,
  });
}

export async function isAuthenticated(event: RequestEvent) {
  const token = event.cookies.get("Leagueify-Token");

  if (token && (await auth.verifyAuth(token, true))) {
    const user = await database.user.findFirst({
      where: {
        token: token,
      },
    });

    event.locals = {
      user: user,
      ...event.locals,
    };
  }
}
