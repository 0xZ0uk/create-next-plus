import prompts from "prompts";

export const init = async (defaultFlags: {
	noGit: boolean;
	noInstall: boolean;
}) => {
	const res = await prompts([
		{
			type: "text",
			name: "name",
			message: "What should we call your project?",
		},
		{
			type: defaultFlags.noGit ? null : "confirm",
			name: "noGit",
			message: "Do you want to skip git init?",
		},
		{
			type: defaultFlags.noInstall ? null : "confirm",
			name: "noInstall",
			message: "Do you want to skip dependency installation?",
		},
		{
			type: "confirm",
			name: "db-confirm",
			message: "Do you want to start with a pre-configured database?",
		},
		{
			type: (prev) => (prev === true ? "select" : null),
			name: "db",
			message: "Please select a dabatase: ",
			choices: [
				{
					title: "supabase",
					value: "sb",
				},
				{
					title: "firestore",
					value: "fs",
				},
				{
					title: "planetscale",
					value: "ps",
				},
			],
		},
		{
			type: "multiselect",
			name: "extras",
			message: "Do you want to install any extras?",
			choices: [
				{
					title: "langchain",
				},
				{
					title: "next-auth",
				},
				{
					title: "million.js",
				},
			],
		},
	]);

	return res;
};
