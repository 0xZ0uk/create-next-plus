import path from "node:path";
import fs from "fs-extra";

import type { Installer } from ".";
import { PKG_ROOT } from "../utils/path";
import { addPackageDependency } from "../utils/deps";
import { log } from "../utils/log";

export const zustandInstaller: Installer = ({ projectDir }) => {
	const extrasDir = path.join(PKG_ROOT, "template/extra");

	addPackageDependency({
		projectDir,
		dependencies: ["zustand"],
		devMode: false,
	});

	addPackageDependency({
		projectDir,
		dependencies: ["@redux-devtools/extension"],
		devMode: true,
	});

	const clientSrc = path.join(extrasDir, "src/store");
	const clientDest = path.join(projectDir, "src/store");

	fs.copySync(clientSrc, clientDest);

	log("Zustand has been installed and setup", { gradient: true });
};
