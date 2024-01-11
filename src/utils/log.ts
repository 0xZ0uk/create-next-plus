import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import gradient from "gradient-string";

export const log = (
	value: any,
	opts?: {
		animate?: boolean;
		gradient?: boolean;
	}
) => {
	if (!!opts) {
		if (gradient) console.log(gradient.morning(value));
	} else {
		console.log(chalk.green(value));
	}
};
