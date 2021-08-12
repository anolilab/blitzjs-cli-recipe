import j from "jscodeshift";
import { Collection } from "jscodeshift/src/Collection";

const transformer = (program: Collection<j.Program>): Collection<j.Program> | Promise<Collection<j.Program>> => {

    return program;
};

export default transformer;
