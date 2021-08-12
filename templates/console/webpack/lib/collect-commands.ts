import { buildCommandExtensionRegex } from "./build/utils";
import recursiveFindCommands from "./recursive-readdir";

function collectCommands(directory: string, pageExtensions: string[]): Promise<string[]> {
    return recursiveFindCommands(directory, buildCommandExtensionRegex(pageExtensions));
}

export default collectCommands;
