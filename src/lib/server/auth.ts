import bcrypt from "bcrypt";
import crypto from "crypto";

const saltRounds = 12;
const pepper = process.env.PASSWORD_PEPPER || "";

function addPepper(password: FormDataEntryValue) {
  return crypto
    .createHmac("sha512", pepper)
    .update(password.toString())
    .digest("hex");
}

export function hashPassword(password: FormDataEntryValue | null) {
  password = password || "";

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(addPepper(password), salt);

  return hash;
}