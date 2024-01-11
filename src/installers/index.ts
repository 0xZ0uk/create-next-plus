export const availablePackages = ["drizzle"] as const;
export type AvailablePackages = (typeof availablePackages)[number];

export type PkgInstallerMap = {
	[pkg in AvailablePackages]: {
		inUse: boolean;
		installer: Installer;
	};
};

export interface InstallerOptions {
	projectDir: string;
	pkgManager: "bun";
	noInstall: boolean;
	packages?: PkgInstallerMap;
	appRouter?: boolean;
	projectName: string;
	scopedAppName: string;
}

export type Installer = (opts: InstallerOptions) => void;
export type DbInstaller = (opts: InstallerOptions, type: "sb" | "ps") => void;
