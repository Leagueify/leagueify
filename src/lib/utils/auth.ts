// 3rd Party Imports
import bcrypt from "bcrypt";
import crypto from "crypto";
// Leagueify Imports
import database from "$lib/server/database";

const saltRounds = 12;

export function generateToken(length: number = 32): string {
  return crypto.randomBytes(length).toString("base64url");
}

export function generateTokenExpiration(minutes: number = 10): number {
  return Date.now() + 60000 * minutes;
}

export function hashPassword(password: FormDataEntryValue | null): string {
  password = password || "";

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password.toString(), salt);

  return hash;
}

export async function verifyAuth(
  authInput: string,
  isActive: boolean = false
): Promise<boolean> {
  const validAuth = await database.user.findFirst({
    where: {
      token: authInput,
      expiration: {
        gt: new Date().valueOf(),
      },
      isActive: isActive,
    },
  });

  if (validAuth) {
    return true;
  }

  return false;
}

export function verifyCredentials(
  submittedPassword: string,
  hash: string
): boolean {
  const match = bcrypt.compareSync(submittedPassword, hash);

  if (match) {
    return true;
  }

  return false;
}
