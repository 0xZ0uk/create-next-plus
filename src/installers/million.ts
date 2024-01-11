import path from "node:path";
import fs from "fs-extra";

import type { Installer } from ".";
import { PKG_ROOT } from "../utils/path";
import { addPackageDependency } from "../utils/deps";
import { log } from "../utils/log";

export const millionInstaller: Installer = ({ projectDir }) => {
	const extrasDir = path.join(PKG_ROOT, "template/extra");

	addPackageDependency({
		projectDir,
		dependencies: ["million"],
		devMode: false,
	});

	const configFile = path.join(extrasDir, `config/next-million.config.mjs`);
	const configDest = path.join(projectDir, "next.config.mjs");

	fs.copySync(configFile, configDest);

	log("Million.js has been installed and setup.", { gradient: true });
};
