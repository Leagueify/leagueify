import { get } from "svelte/store";

import { leagueData } from "$lib/stores";

export function birthdate(
  errors: Array<string>,
  month: FormDataEntryValue | null,
  day: FormDataEntryValue | null,
  year: FormDataEntryValue | null
): Date {
  const currentAge: Date = new Date(`${month} ${day}, ${year}`);
  const requiredAge: Date = new Date();

  // Set age requirement to 18 years old
  requiredAge.setFullYear(requiredAge.getFullYear() - 18);

  // dobAccountRequirement: true = user is too young
  currentAge >= requiredAge ? errors.push("dobAccountRequirement") : null;
  month === null || month === "" ? errors.push("missingMonth") : null;
  day === null || day === "" ? errors.push("missingDay") : null;
  year === null || year === "" ? errors.push("missingYear") : null;

  return currentAge;
}

export function email(errors: Array<string>, email: FormDataEntryValue | null) {
  email = email || "";
  const emailRegex =
    /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;

  email === null || email === "" ? errors.push("emailMissing") : null;
  !emailRegex.test(email.toString()) ? errors.push("emailInvalid") : null;
}

export function leagueName(
  errors: Array<string>,
  name: FormDataEntryValue | null
) {
  name = name || "";

  if (get(leagueData).installed === true) {
    return;
  }

  name === null || name === "" ? errors.push("missingLeagueName") : null;
  name.length < 3 && !errors.includes("missingLeagueName")
    ? errors.push("incorrectLengthLeagueName")
    : null;
}

export function leagueSport(
  errors: Array<string>,
  sport: FormDataEntryValue | null
) {
  sport = sport || "";

  if (get(leagueData).installed === true) {
    return;
  }

  sport === null || sport === "" ? errors.push("missingLeagueSport") : null;
}

export function password(
  errors: Array<string>,
  password: FormDataEntryValue | null
) {
  password = password || "";
  // 12-64 Characters - 1 Uppercase - 1 Lowercase - 1 Number - 1 Special Character
  const passwordRegex =
    /^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^!#%]*[!#%])[A-Za-z0-9!#%]{12,64}$/;

  password === null || password === "" ? errors.push("passwordMissing") : null;
  !passwordRegex.test(password.toString()) ? errors.push("passwordWeak") : null;
}

export function phone(errors: Array<string>, phone: FormDataEntryValue | null) {
  phone = phone || "";

  phone === null || phone === "" ? errors.push("phoneMissing") : null;
  phone.length < 10 && !errors.includes("phoneMissing");
}

export function name(
  errors: Array<string>,
  firstName: FormDataEntryValue | null,
  lastName: FormDataEntryValue | null
) {
  firstName = firstName || "";
  lastName = lastName || "";

  firstName === null || firstName === ""
    ? errors.push("firstNameMissing")
    : null;
  firstName.length < 3 && !errors.includes("firstNameMissing")
    ? errors.push("firstNameShort")
    : null;
  lastName === null || lastName === "" ? errors.push("lastNameMissing") : null;
  lastName.length < 3 && !errors.includes("lastNameMissing")
    ? errors.push("lastNameShort")
    : null;
}
