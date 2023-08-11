// Type Imports
import type { UserData, UserRoles } from "$lib/interfaces";
// Leagueify Imports
import * as auth from "$lib/utils/auth";
import database from "$lib/server/database";

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
