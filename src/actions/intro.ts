import figlet from "figlet";

import { log } from "../utils/log";

export const intro = async () => {
	await figlet(
		"Next+",
		{
			font: "Ogre",
		},
		(err, data) => {
			if (err) {
				log("Something went wrong...");
				return;
			}

			log(data!, { gradient: true });
		}
	);

	log("Welcome to the Next+ CLI tool, a supercharged create-next-app", {
		gradient: true,
	});
};
