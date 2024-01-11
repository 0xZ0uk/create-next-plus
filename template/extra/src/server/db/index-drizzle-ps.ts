import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as schema from "./schema";

export const db = drizzle(
	new Client({
		url: Bun.env.DATABASE_URL,
	}).connection(),
	{ schema }
);
