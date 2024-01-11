import { Clerc } from "clerc";

import { getVersion } from "./utils/version";
import { intro } from "./actions/intro";
import { init } from "./actions/init";
import { create } from "./actions/create";

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
	})
	.parse();
