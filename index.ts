import { paths, RecipeBuilder } from "@blitzjs/installer";
import path from "path";

import package_ from "./package.json";
import transformer from "./transformer";

export default RecipeBuilder()
    .setName("Swagger")
    .setOwner(package_.author)
    .setRepoLink(package_.repository.url)
    .addAddDependenciesStep({
        stepId: "addDeps",
        stepName: "Add npm dependencies",
        explanation: "blitz-cli requires a couple of dependencies to get up and running.",
        packages: [
            { name: "@anolilab/cerebro-core", version: "latest", isDevDep: true },
        ],
    })
    .addNewFilesStep({
        stepId: "addConsoleFolder",
        stepName: "Add console and webpack helper files",
        explanation: "Cerebro console with automatic command loader",
        targetDirectory: "./console",
        templatePath: path.join(__dirname, "templates", "console"),
        templateValues: {},
    })
    .addNewFilesStep({
        stepId: "addConsoleBin",
        stepName: "Add cerebro console bin file",
        explanation: "Cerebro console bin",
        targetDirectory: "./bin",
        templatePath: path.join(__dirname, "templates", "bin"),
        templateValues: {},
    })
    .addTransformFilesStep({
        stepId: "addWebpackLoader",
        stepName: "Add Swagger page file",
        explanation: "Helper to create spec based on swagger-jsdoc",
        singleFileSearch: paths.blitzConfig(),
        transform: transformer,
    })
    .build();
