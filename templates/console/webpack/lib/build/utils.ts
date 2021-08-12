export const topLevelFoldersThatMayContainCommands = [
    'commands',
    'console',
    'src',
    'app',
    'integrations',
]

export function isCommandFile(filePathFromAppRoot: string) {
    return (
        /[\\/]commands[\\/]/.test(filePathFromAppRoot)
    )
}

export function buildCommandExtensionRegex(pageExtensions: string[]) {
    return new RegExp(`(?<!\\.test|\\.spec)\\.(?:${pageExtensions.join('|')})$`)
}
