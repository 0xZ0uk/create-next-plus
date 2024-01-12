import { type Config } from "drizzle-kit";

export default {
	schema: "./src/server/db/schema.ts",
	driver: "pg",
	dbCredentials: {
		uri: process.env.DATABASE_URL,
	},
	tablesFilter: ["project1_*"],
} satisfies Config;
