import { AppDataSource } from "./data-source";

let initialized = false;

export async function initializeDatabase() {
  if (initialized) {
    return AppDataSource;
  }

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  initialized = true;
  return AppDataSource;
}
