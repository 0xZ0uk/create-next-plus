import { Command } from "commander";
import path from "node:path";

import { intro } from "./actions/intro";
import { init } from "./actions/init";
import { create } from "./actions/create";
import { installDependencies } from "./actions/deps";
import { initGit } from "./actions/git";
import { drizzleInstaller } from "./installers/drizzle";
import { firestoreInstaller } from "./installers/firestore";
import { langchainInstaller } from "./installers/langchain";
import { millionInstaller } from "./installers/million";
import { zustandInstaller } from "./installers/zustand";
import { log } from "./utils/log";
import { getVersion } from "./utils/version";
import { shadcnInstaller } from "./installers/shadcn";

const program = new Command();

export const runCli = async (): Promise<any> => {
	program
		.name("create-next-plus")
		.description("Supercharged create-next-app!")
		.version(await getVersion());

	// Create command
	program
		.option("--no-git", "Skip git initialization")
		.option("--no-install", "Skip dependency installation")
		.action(async (opts) => {
			await intro();

			const { name, db, extras } = await init(opts);

			await create({ name });

			const projectPath = path.join(process.cwd(), name);

			if (db && db !== "fs") {
				await drizzleInstaller(
					{
						noInstall: opts.noInstall,
						pkgManager: "bun",
						projectDir: projectPath,
						projectName: name,
						scopedAppName: name,
					},
					db
				);
			}

			if (db === "fs") {
				await firestoreInstaller({
					noInstall: opts.noInstall,
					pkgManager: "bun",
					projectDir: projectPath,
					projectName: name,
					scopedAppName: name,
				});
			}

			if (extras.includes("langchain")) {
				await langchainInstaller({
					noInstall: opts.noInstall,
					pkgManager: "bun",
					projectDir: projectPath,
					projectName: name,
					scopedAppName: name,
				});
			}

			if (extras.includes("zustand")) {
				await zustandInstaller({
					noInstall: opts.noInstall,
					pkgManager: "bun",
					projectDir: projectPath,
					projectName: name,
					scopedAppName: name,
				});
			}

			if (extras.includes("millionjs")) {
				await millionInstaller({
					noInstall: opts.noInstall,
					pkgManager: "bun",
					projectDir: projectPath,
					projectName: name,
					scopedAppName: name,
				});
			}

			if (extras.includes("shadcnui")) {
				await shadcnInstaller({
					noInstall: opts.noInstall,
					pkgManager: "bun",
					projectDir: projectPath,
					projectName: name,
					scopedAppName: name,
				});
			}

			if (!opts.noGit) {
				await initGit(projectPath);
			}

			if (!opts.noInstall) {
				await installDependencies(projectPath);
			}

			log("Congratulations! Everything is setup.", { gradient: true });
		});

	program.parse(process.argv);
};
