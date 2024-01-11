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
			message: "Do you want to start with a database?",
		},
		{
			type: (prev) => (prev === true ? "select" : null),
			name: "db",
			message: "Please select a dabatase provider: ",
			choices: [
				{
					title: "supabase",
					description: "Supabase (Postgres)",
					value: "sb",
				},
				{
					title: "firestore",
					description: "Firestore (NoSQL)",
					value: "fs",
				},
				{
					title: "planetscale",
					description: "PlanetScale (MySQL)",
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
					value: "langchain",
				},
				{
					title: "next-auth",
					value: "nextauth",
				},
				{
					title: "million.js",
					value: "millionjs",
				},
				{
					title: "zustand",
					value: "zustand",
				},
			],
		},
	]);

	return res;
};
