import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

// async function to open database
export const initDB = async (): Promise<Database> => {
  const db = await open({
    filename: "./User.sqlite3",   // yahi file tu already banata hai
    driver: sqlite3.Database,
  });
  return db;
};
