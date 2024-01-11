import { Clerc } from "clerc";
import path from "node:path";

import { getVersion } from "./utils/version";
import { intro } from "./actions/intro";
import { init } from "./actions/init";
import { create } from "./actions/create";
import { initGit } from "./actions/git";
import { log } from "./utils/log";
import { installDependencies } from "./actions/deps";
import { drizzleInstaller } from "./installers/drizzle";
import { firestoreInstaller } from "./installers/firestore";
import { langchainInstaller } from "./installers/langchain";
import { zustandInstaller } from "./installers/zustand";

export const cli = Clerc.create()
	.name("Create Next+")
	.scriptName("create-next-plus")
	.description("A simple CLI tool to initiate a Next+ app")
	.version(await getVersion())
	.command("create", "start a Next+ project", {
		flags: {
			noGit: {
				type: Boolean,
				default: false,
				description: "Skip git initiliazation",
			},
			noInstall: {
				type: Boolean,
				default: false,
				description: "Skip dependency installation",
			},
		},
	})
	.on("create", async (ctx) => {
		await intro();
		const { name, noGit, noInstall, db, extras } = await init(ctx.flags);

		await create({ name });

		const projectPath = path.join(process.cwd(), name);

		if (!ctx.flags.noGit || !noGit) {
			await initGit(projectPath);
		}

		if (!ctx.flags.noInstall || !noInstall) {
			await installDependencies(projectPath);
		}

		if (!!db && db !== "fs")
			drizzleInstaller(
				{
					noInstall,
					pkgManager: "bun",
					projectDir: projectPath,
					projectName: name,
					scopedAppName: name,
				},
				db
			);

		if (!!db && db === "fs")
			firestoreInstaller({
				noInstall,
				pkgManager: "bun",
				projectDir: projectPath,
				projectName: name,
				scopedAppName: name,
			});

		if (extras.includes("langchain")) {
			langchainInstaller({
				noInstall,
				pkgManager: "bun",
				projectDir: projectPath,
				projectName: name,
				scopedAppName: name,
			});
		}

		if (extras.include("zustand")) {
			zustandInstaller({
				noInstall,
				pkgManager: "bun",
				projectDir: projectPath,
				projectName: name,
				scopedAppName: name,
			});
		}

		log("Congratulations! Everything is setup.", { gradient: true });
	})
	.parse();
