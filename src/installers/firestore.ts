import path from "node:path";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";

import type { Installer } from ".";
import { addPackageDependency } from "../utils/deps";
import { PKG_ROOT } from "../utils/path";
import { log } from "../utils/log";

export const firestoreInstaller: Installer = ({ projectDir }) => {
	const extrasDir = path.join(PKG_ROOT, "template/extra");

	addPackageDependency({
		projectDir,
		dependencies: ["firebase"],
		devMode: false,
	});

	const libSrc = path.join(extrasDir, "src/lib/firebase.ts");
	const libDest = path.join(projectDir, "src/lib/firebase.ts");

	const clientSrc = path.join(extrasDir, "src/server/db/index-firestore.ts");
	const clientDest = path.join(projectDir, "src/server/db.ts");

	const trpcSrc = path.join(extrasDir, "src/server/trpc/with-db.ts");
	const trpcDest = path.join(projectDir, "src/server/trpc.ts");

	fs.copySync(libSrc, libDest);
	fs.copySync(clientSrc, clientDest);
	fs.copySync(trpcSrc, trpcDest);

	log("Firebase has been installed and Firestore has been setup.", {
		gradient: true,
	});
};
