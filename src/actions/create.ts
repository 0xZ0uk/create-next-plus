import chalk from "chalk";
import fs from "fs-extra";
import path from "node:path";
import { PKG_ROOT } from "../utils/path";

export const create = async ({ name }: { name: string }) => {
	if (name === "" || name === undefined) {
		console.error(chalk.red("Project name cannot be empty!"));
		process.exit(1);
	}

	const projectPath = path.join(process.cwd(), name);

	if (fs.existsSync(projectPath)) {
		console.error(chalk.red(`Error: Directory "${name}" already exists.`));
		process.exit(1);
	}

	fs.mkdirSync(projectPath);

	const templatePath = path.join(`${PKG_ROOT}`, "template/base");

	try {
		await fs.copy(templatePath, projectPath);
	} catch (err) {
		console.error(chalk.red(`Error copying template files: ${err}`));
		process.exit(1);
	}
};
