import { execSync } from "node:child_process";
import path from "node:path";
import fs from "fs-extra";
import { execa } from "execa";
import chalk from "chalk";
import { log } from "../utils/log";
import prompts from "prompts";

const isGitInstalled = (dir: string): boolean => {
	try {
		execSync("git --version", { cwd: dir });
		return true;
	} catch (_e) {
		return false;
	}
};

const isRootGitRepo = (dir: string): boolean => {
	return fs.existsSync(path.join(dir, ".git"));
};

const isInsideGitRepo = async (dir: string): Promise<boolean> => {
	try {
		// If this command succeeds, we're inside a git repo
		await execa("git", ["rev-parse", "--is-inside-work-tree"], {
			cwd: dir,
			stdout: "ignore",
		});
		return true;
	} catch (_e) {
		// Else, it will throw a git-error and we return false
		return false;
	}
};

const getGitVersion = () => {
	const stdout = execSync("git --version").toString().trim();
	const gitVersionTag = stdout.split(" ")[2];
	const major = gitVersionTag?.split(".")[0];
	const minor = gitVersionTag?.split(".")[1];
	return { major: Number(major), minor: Number(minor) };
};

const getDefaultBranch = () => {
	const stdout = execSync("git config --global init.defaultBranch || echo main")
		.toString()
		.trim();

	return stdout;
};

export const initGit = async (projectPath: string) => {
	if (!isGitInstalled(projectPath)) {
		console.log(
			chalk.red("Git already installed. Skipping git initialization.")
		);
		return;
	}

	log("Initializing git repository...", { gradient: true });

	const isRoot = isRootGitRepo(projectPath);
	const isInside = await isInsideGitRepo(projectPath);
	const dirName = path.parse(projectPath).name; // skip full path for logging

	if (isInside && isRoot) {
		const overwriteGit = await prompts({
			type: "confirm",
			initial: false,
			name: "overwriteGit",
			message: chalk.redBright.bold(
				`Directory ${chalk.cyan(
					dirName
				)} is already a git repository. Do you want to overwrite it?`
			),
		});

		if (!overwriteGit) {
			console.log(chalk.blue("Skipping Git initialization."));
			return;
		}

		fs.removeSync(path.join(projectPath, ".git"));
	} else if (isInside && !isRoot) {
		// Dir is inside a git worktree
		const initializeChildGitRepo = await prompts({
			type: "confirm",
			initial: false,
			name: "initializeChildGitRepo",
			message: chalk.redBright.bold(
				`Directory ${chalk.cyan(
					dirName
				)} is inside a git worktree. Do you want to initialize it as a git repository?\n`
			),
		});

		if (!initializeChildGitRepo) {
			console.log(chalk.blue("Skipping Git initialization."));
			return;
		}
	}

	try {
		const branchName = getDefaultBranch();

		// --initial-branch flag was added in git v2.28.0
		const { major, minor } = getGitVersion();
		if (major < 2 || (major == 2 && minor < 28)) {
			await execa("git", ["init"], { cwd: projectPath });
			// symbolic-ref is used here due to refs/heads/master not existing
			// It is only created after the first commit
			// https://superuser.com/a/1419674
			await execa("git", ["symbolic-ref", "HEAD", `refs/heads/${branchName}`], {
				cwd: projectPath,
			});
		} else {
			await execa("git", ["init", `--initial-branch=${branchName}`], {
				cwd: projectPath,
			});
		}
		await execa("git", ["add", "."], { cwd: projectPath });

		log("Successfully initialized and staged git", { gradient: true });
	} catch (error) {
		// Safeguard, should be unreachable
		console.log(
			chalk.red(
				"Failed to initialize git repository. Please report this as a bug on GitHub!"
			)
		);
	}
};
