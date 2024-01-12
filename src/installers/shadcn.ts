import path from "node:path";
import fs from "fs-extra";

import type { Installer } from ".";
import { PKG_ROOT } from "../utils/path";
import { addPackageDependency } from "../utils/deps";
import { log } from "../utils/log";

export const shadcnInstaller: Installer = ({ projectDir }) => {
	const extrasDir = path.join(PKG_ROOT, "template/extra");

	addPackageDependency({
		projectDir,
		dependencies: [
			"tailwind-merge",
			"tailwindcss-animate",
			"class-variance-authority",
			"clsx",
			"lucide-react",
		],
		devMode: false,
	});

	const componentsConfigSrc = path.join(
		extrasDir,
		"src/config/components.json"
	);
	const componentsConfigDest = path.join(projectDir, "src/components.json");

	const tailwindConfigSrc = path.join(
		extrasDir,
		"src/config/tailwind-shadcn.config.ts"
	);
	const tailwindConfigDest = path.join(
		projectDir,
		"src/config/tailwind.config.ts"
	);

	const utilsSrc = path.join(extrasDir, "src/lib/utils.ts");
	const utilsDest = path.join(projectDir, "src/lib/utils.ts");

	const stylesSrc = path.join(extrasDir, "src/styles/shadcn-globals.css");
	const stylesDest = path.join(projectDir, "src/styles/globals.css");

	fs.copySync(componentsConfigSrc, componentsConfigDest);
	fs.copySync(tailwindConfigSrc, tailwindConfigDest);
	fs.copySync(utilsSrc, utilsDest);
	fs.copySync(stylesSrc, stylesDest);

	log("Shadcn/ui has been installed and configured", { gradient: true });
};
