import path from "node:path";
import fs from "fs-extra";

import type { Installer } from ".";
import { PKG_ROOT } from "../utils/path";
import { addPackageDependency } from "../utils/deps";
import { log } from "../utils/log";

export const langchainInstaller: Installer = ({ projectDir }) => {
	const extrasDir = path.join(PKG_ROOT, "template/extra");

	addPackageDependency({
		projectDir,
		dependencies: ["langchain", "@langchain/openai"],
		devMode: false,
	});

	const clientSrc = path.join(extrasDir, "src/langchain");
	const clientDest = path.join(projectDir, "src/langchain");

	fs.copySync(clientSrc, clientDest);

	log("Langchain has been installed and setup", { gradient: true });
};
