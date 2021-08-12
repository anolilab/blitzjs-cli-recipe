import { promises } from "fs";
import path from "path";

import { isCommandFile, topLevelFoldersThatMayContainCommands } from "./build/utils";

/**
 * Recursively read directory
 * @param  {string} dir Directory to read
 * @param  {RegExp} filter Filter for the file name, only the name part is considered, not the full path
 * @param  {RegExp} ignore
 * @param  {string[]=[]} array This doesn't have to be provided, it's used for the recursion
 * @param  {string=dir`} rootDir Used to replace the initial path, only the relative path is left, it's faster than path.relative.
 * @returns Promise array holding all relative paths
 */
async function recursiveFindCommands(dir: string, filter: RegExp, ignore?: RegExp, array: string[] = [], rootDir: string = dir): Promise<string[]> {
    let folders = await promises.readdir(dir);

    if (dir === rootDir) {
        folders = folders.filter((folder) => topLevelFoldersThatMayContainCommands.includes(folder));
    }

    await Promise.all(
        folders.map(async (part: string) => {
            const absolutePath = path.join(dir, part);

            if (ignore && ignore.test(part)) {
                return;
            }

            const pathStat = await promises.stat(absolutePath);

            if (pathStat.isDirectory()) {
                await recursiveFindCommands(absolutePath, filter, ignore, array, rootDir);

                return;
            }

            if (!filter.test(part)) {
                return;
            }

            const relativeFromRoot = absolutePath.replace(rootDir, "");

            if (isCommandFile(relativeFromRoot)) {
                array.push(relativeFromRoot);
            }
        }),
    );

    return array.sort();
}

export default recursiveFindCommands;
