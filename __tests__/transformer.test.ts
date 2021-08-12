import { addImport, customTsParser } from "@blitzjs/installer";
import j from "jscodeshift";

import transformer from "../transformer";

const sampleFile = `import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from "blitz"

const config: BlitzConfig = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: "test",
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not \`require\` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}
module.exports = config`;

expect(
    addImport(
        j(sampleFile, {
            parser: customTsParser,
        }),
        transformer,
    ).toSource(),
).toMatchSnapshot();
