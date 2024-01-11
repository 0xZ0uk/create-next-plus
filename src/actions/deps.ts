import chalk from "chalk";
import { execa, type StdioOption } from "execa";
import { log } from "../utils/log";

const exec = async (
	projectDir: string,
	options: {
		args?: string[];
		stdout?: StdioOption;
	}
) => {
	const { args = ["install"], stdout = "pipe" } = options;

	execa("bun", args, { cwd: projectDir, stdout });
};

const runInstallCommand = async (projectDir: string) => {
	exec(projectDir, { stdout: "ignore" });
};

export const installDependencies = async (projectDir: string) => {
	console.log(chalk.yellow("Installing dependencies..."));

	await runInstallCommand(projectDir);

	// If the spinner was used to show the progress, use succeed method on it
	// If not, use the succeed on a new spinner
	log("Successfully installed dependencies!\n", { gradient: true });
};
