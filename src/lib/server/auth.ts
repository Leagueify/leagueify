import bcrypt from "bcrypt";

const saltRounds = 12;

export function hashPassword(password: FormDataEntryValue | null) {
  password = password || "";

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password.toString(), salt);

  return hash;
}
