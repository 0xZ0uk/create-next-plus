#! /usr/bin/env node

import { runCli } from "./cli";

const main = async () => {
	await runCli();
};

main().catch((err) => {
	console.error("Aborting installation, due to error: ", err);
	process.exit(1);
});
