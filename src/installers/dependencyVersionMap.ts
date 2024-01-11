/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
	// Drizzle
	"drizzle-orm": "^0.29.3",
	"drizzle-kit": "^0.20.9",
	mysql2: "^3.6.1",
	pg: "^8.11.3",
	"@planetscale/database": "^1.11.0",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
