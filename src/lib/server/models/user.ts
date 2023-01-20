import { Schema, model } from "mongoose";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  players: string[];
  coach: boolean;
  volunteer: boolean;
  systemRole: string;
  password: string;
  salt: string;
  token: string;
  tokenExpiration: number;
}

enum Role {
  MASTER_ADMIN = "MASTER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

const schema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  players: { type: [String], required: true },
  coach: { type: Boolean, required: true },
  volunteer: { type: Boolean, required: true },
  systemRole: { type: String, required: true, enum: Role, default: Role.USER },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  token: { type: String, required: false },
  tokenExpiration: { type: Number, required: false },
});

const User = model<IUser>("User", schema);

export { User };
