import { Schema, model } from "mongoose";

interface IPlayer {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  isPaid: boolean;
}

const schema = new Schema<IPlayer>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  isPaid: { type: Boolean, required: true, default: false },
});

const Player = model<IPlayer>("Player", schema);

export { Player };
