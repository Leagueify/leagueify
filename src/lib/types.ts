export interface RegisterError {
  dobAccountRequirement?: boolean;
  dobDayMissing?: boolean;
  dobMonthMissing?: boolean;
  dobYearMissing?: boolean;
  emailMissing?: boolean;
  emailInvalid?: boolean;
  firstNameMissing?: boolean;
  firstNameShort?: boolean;
  lastNameMissing?: boolean;
  lastNameShort?: boolean;
  leagueMissing?: boolean;
  leagueShort?: boolean;
  passwordMissing?: boolean;
  passwordWeak?: boolean;
  phoneMissing?: boolean;
  sportMissing?: boolean;
}
