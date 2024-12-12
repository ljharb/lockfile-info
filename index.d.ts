declare namespace npmInfo {
    type npmInfoObject = {
        hasPackageJSON: boolean;
        hasNodeModulesDir: boolean;
        hasLockfile: boolean;
        hasPackageLock: boolean;
        hasShrinkwrap: boolean;
        lockfileVersion: (typeof NaN) | 1 | 2 | 3; // https://github.com/microsoft/TypeScript/issues/47347
    };
}

declare function npmInfo(cwd?: string): Promise<npmInfo.npmInfoObject>;

export = npmInfo;