/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
	// Drizzle
	"@planetscale/database": "^1.11.0",
	"drizzle-orm": "^0.29.3",
	"drizzle-kit": "^0.20.9",
	firebase: "^10.7.1",
	mysql2: "^3.6.1",
	pg: "^8.11.3",
	postgres: "^3.4.3",
	langchain: "^0.1.2",
	"@langchain/openai": "^0.0.11",
	"@redux-devtools/extension": "^3.3.0",
	zustand: "^4.4.7",
	million: "^2.6.4",
	"tailwindcss-animate": "^1.0.7",
	"class-variance-authority": "^0.7.0",
	clsx: "^2.1.0",
	"tailwind-merge": "^2.2.0",
	"lucide-react": "^0.309.0",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
