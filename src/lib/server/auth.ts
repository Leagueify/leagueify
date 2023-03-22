import bcrypt from "bcrypt";
import crypto from "crypto";

const saltRounds = 12;

export function generateToken() {
  return crypto.randomBytes(32).toString("base64");
}

export function generateTokenExpiration() {
  // Token expires in 10 minutes
  return Date.now() + 600000;
}

export function hashPassword(password: FormDataEntryValue | null) {
  password = password || "";

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password.toString(), salt);

  return hash;
}
