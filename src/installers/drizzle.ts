import path from "node:path";
import fs from "fs-extra";

import type { DbInstaller } from ".";
import { addPackageDependency } from "../utils/deps";
import { PKG_ROOT } from "../utils/path";
import { log } from "../utils/log";

export const drizzleInstaller: DbInstaller = (
	{ projectDir, scopedAppName },
	type
) => {
	const extrasDir = path.join(PKG_ROOT, "template/extra");

	if (type === "ps") {
		addPackageDependency({
			projectDir,
			dependencies: ["drizzle-kit", "mysql2"],
			devMode: true,
		});
		addPackageDependency({
			projectDir,
			dependencies: ["drizzle-orm", "@planetscale/database"],
			devMode: false,
		});
	}

	if (type === "sb") {
		addPackageDependency({
			projectDir,
			dependencies: ["drizzle-kit", "pg"],
			devMode: true,
		});
		addPackageDependency({
			projectDir,
			dependencies: ["drizzle-orm", "postgres"],
			devMode: false,
		});
	}

	const configFile = path.join(extrasDir, `config/drizzle-${type}.config.ts`);
	const configDest = path.join(projectDir, "drizzle.config.ts");

	const schemaScr = path.join(
		extrasDir,
		"src/server/db",
		`drizzle-${type}-schema.ts`
	);
	const schemaDest = path.join(projectDir, "src/server/db/schema.ts");

	let schemaContent = fs.readFileSync(schemaScr, "utf-8");
	schemaContent = schemaContent.replace(
		"project1_${name}",
		`${scopedAppName}_\${name}`
	);

	let configContent = fs.readFileSync(configFile, "utf-8");
	configContent = configContent.replace("project1_*", `${scopedAppName}_*`);

	const clientSrc = path.join(
		extrasDir,
		`src/server/db/index-drizzle-${type}.ts`
	);
	const clientDest = path.join(projectDir, "src/server/db/index.ts");

	const trpcSrc = path.join(extrasDir, "src/server/trpc/with-db.ts");
	const trpcDest = path.join(projectDir, "src/server/trpc.ts");

	const pkgJsonPath = path.join(projectDir, "package.json");
	const pkgJsonContent = fs.readJSONSync(pkgJsonPath);
	pkgJsonContent.scripts = {
		...pkgJsonContent.scripts,
		"db:push": type === "sb" ? "drizzle-kit push:pg" : "drizzle-kit push:mysql",
		"db:studio": "drizzle-kit studio",
	};

	fs.copySync(configFile, configDest);
	fs.mkdirSync(path.dirname(schemaDest), { recursive: true });
	fs.writeFileSync(schemaDest, schemaContent);
	fs.writeFileSync(configDest, configContent);
	fs.copySync(clientSrc, clientDest);
	fs.copySync(trpcSrc, trpcDest);
	fs.writeJSONSync(pkgJsonPath, pkgJsonContent, {
		spaces: 2,
	});

	log("Drizzle has been installed and setup.", { gradient: true });
};
