import fs from "fs-extra";
import { PKG_ROOT } from "./path";

export const getVersion = async (): Promise<string> => {
	try {
		const pkgJson = await fs.readJson(`${PKG_ROOT}/package.json`);
		return pkgJson.version;
	} catch (err) {
		console.error(`Error reading package.json: ${err}`);
		throw err; // or handle it as per your error handling strategy
	}
};
