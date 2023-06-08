import bcrypt from "bcrypt";
import crypto from "crypto";

const saltRounds = 12;

export function generateToken(length: number = 32) {
  return crypto.randomBytes(length).toString("base64url");
}

export function generateTokenExpiration(minutes: number = 10): number {
  return Date.now() + 60000 * minutes;
}

export function hashPassword(password: FormDataEntryValue | null) {
  password = password || "";

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password.toString(), salt);

  return hash;
}
