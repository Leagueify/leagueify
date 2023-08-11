export interface EmailConfigData {
  outboundEmail: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
}

export interface LeagueData {
  name: string;
  domain: string;
  sport: number;
  emailConfig: number;
}

export interface UserData {
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: number;
  password: string;
  token: string;
  expiration: number;
  role: UserRoles;
}

export enum UserRoles {
  MASTER_ADMIN = "MASTER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}
