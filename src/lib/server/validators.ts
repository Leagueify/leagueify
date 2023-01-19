import type { RegisterError } from "$lib/types";

export function birthdate(
  errors: RegisterError,
  month: string,
  day: string,
  year: string
) {
  const currentAge: Date = new Date(`${month} ${day}, ${year}`);
  const requiredAge: Date = new Date();

  // dobAccountRequirement: true = user is too young
  errors.dobAccountRequirement = currentAge <= requiredAge ? false : true;
  errors.dobMonthMissing = month === null || month === "" ? true : false;
  errors.dobDayMissing = day === null || day === "" ? true : false;
  errors.dobYearMissing = year === null || year === "" ? true : false;

  return errors;
}

export function email(errors: RegisterError, email: string) {
  const emailRegex =
    /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
  errors.emailMissing = email === null || email === "" ? true : false;
  errors.emailInvalid = !emailRegex.test(email);
  return errors;
}

export function leagueName(errors: RegisterError, name: string) {
  errors.leagueMissing = name === null || name === "" ? true : false;
  errors.leagueShort = name.length < 3 && !errors.leagueMissing ? true : false;

  return errors;
}

export function leagueSport(errors: RegisterError, sport: string) {
  errors.sportMissing = sport === null ? true : false;

  return errors;
}

export function password(errors: RegisterError, password: string) {
  // 12-64 Characters - 1 Uppercase - 1 Lowercase - 1 Number - 1 Special Character
  const passwordRegex =
    /^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^!#%]*[!#%])[A-Za-z0-9!#%]{12,64}$/;
  errors.passwordMissing = password === null || password === "" ? true : false;
  errors.passwordWeak = !passwordRegex.test(password);

  return errors;
}

export function phone(errors: RegisterError, phone: string) {
  errors.phoneMissing = phone === null || phone === "" ? true : false;

  return errors;
}

export function name(
  errors: RegisterError,
  firstName: string,
  lastName: string
) {
  errors.firstNameMissing =
    firstName === null || firstName === "" ? true : false;
  errors.firstNameShort =
    firstName.length < 3 && !errors.firstNameMissing ? true : false;
  errors.lastNameMissing = lastName === null || lastName === "" ? true : false;
  errors.lastNameShort =
    lastName.length < 3 && !errors.lastNameMissing ? true : false;

  return errors;
}
