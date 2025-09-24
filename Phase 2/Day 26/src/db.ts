import sqlite3 from "sqlite3";
import { open } from "sqlite";

// SQLite database connection open
export const initDB = async () => {
  return open({
    filename: "./Database.db", // tumhara file name
    driver: sqlite3.Database,
  });
};
