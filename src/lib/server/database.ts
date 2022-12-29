import mongoose from "mongoose";

export async function connect() {
  let connection = await mongoose.connect(`${process.env.DATABASE_URI}`, {
    authSource: "admin",
    user: `${process.env.DATABASE_USER}`,
    pass: `${process.env.DATABASE_PASS}`,
  });
  return connection;
}

export async function disconnect(connection: any) {
  connection.disconnect();
}
