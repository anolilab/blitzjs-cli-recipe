import Cli, { CommandLoader, Toolbox as IToolbox } from "@anolilab/cerebro-core";
import path from "path";
import { fileURLToPath } from "url";
import packageJson from "../package.json";

// eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
const __dirname = path.dirname(__filename);

// eslint-disable-next-line consistent-return,import/prefer-default-export
(async (): Promise<IToolbox | void> => {
    try {
        // Create a CLI runtime
        const cli = new Cli(packageJson.name, process.argv);

        cli.addLoader(new CommandLoader(path.join(__dirname, "..", ".next", "server", "integrations", "domain", "queue", "commands")), {
            loadingType: "require",
        });

        return await cli.run();
    } catch (error) {
        // Abort via CTRL-C
        if (!error) {
            console.log("Goodbye ✌️");
        } else {
            // Throw error
            throw error;
        }
    }
})();
