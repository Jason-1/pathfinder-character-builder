import { db } from "./index";
import { migrate } from "drizzle-orm/neon-http/migrator";

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "./server/migrations",
    });
    console.log("Migrations completed successfully.");
  } catch (error) {
    console.error("Error during migrations:", error);
    process.exit(1);
  }
};

main();
