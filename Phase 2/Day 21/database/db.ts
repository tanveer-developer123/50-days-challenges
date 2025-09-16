import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

export const initDB = async (): Promise<Database> => {
  return open({
    filename: "./data.sqlite3", // same file jisme tumhara users table hai
    driver: sqlite3.Database,
  });
};
