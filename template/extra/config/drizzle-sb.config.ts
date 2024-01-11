import { type Config } from "drizzle-kit";

export default {
	schema: "./src/server/db/schema.ts",
	driver: "pg",
	dbCredentials: {
		uri: Bun.env.DATABASE_URL,
	},
	tablesFilter: ["project1_*"],
} satisfies Config;
