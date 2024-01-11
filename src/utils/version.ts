import { PKG_ROOT } from "./path";

export const getVersion = async (): Promise<string> => {
	const pkgJson = await Bun.file(`${PKG_ROOT}package.json`).json();
	const parsed = JSON.parse(JSON.stringify(pkgJson));

	return parsed.version;
};
