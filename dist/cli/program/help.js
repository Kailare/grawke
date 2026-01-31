import { formatDocsLink } from "../../terminal/links.js";
import { isRich, theme } from "../../terminal/theme.js";
import { formatCliBannerLine, hasEmittedCliBanner } from "../banner.js";
const EXAMPLES = [
    [
        "moltx channels login --verbose",
        "Link personal WhatsApp Web and show QR + connection logs.",
    ],
    [
        'moltx message send --target +15555550123 --message "Hi" --json',
        "Send via your web session and print JSON result.",
    ],
    ["moltx gateway --port 18789", "Run the WebSocket Gateway locally."],
    ["moltx --dev gateway", "Run a dev Gateway (isolated state/config) on ws://127.0.0.1:19001."],
    ["moltx gateway --force", "Kill anything bound to the default gateway port, then start it."],
    ["moltx gateway ...", "Gateway control via WebSocket."],
    [
        'moltx agent --to +15555550123 --message "Run summary" --deliver',
        "Talk directly to the agent using the Gateway; optionally send the WhatsApp reply.",
    ],
    [
        'moltx message send --channel telegram --target @mychat --message "Hi"',
        "Send via your Telegram bot.",
    ],
];
export function configureProgramHelp(program, ctx) {
    program
        .name("moltx")
        .description("")
        .version(ctx.programVersion)
        .option("--dev", "Dev profile: isolate state under ~/.moltx-dev, default gateway port 19001, and shift derived ports (browser/canvas)")
        .option("--profile <name>", "Use a named profile (isolates MOLTX_STATE_DIR/MOLTX_CONFIG_PATH under ~/.moltx-<name>)");
    program.option("--no-color", "Disable ANSI colors", false);
    program.configureHelp({
        optionTerm: (option) => theme.option(option.flags),
        subcommandTerm: (cmd) => theme.command(cmd.name()),
    });
    program.configureOutput({
        writeOut: (str) => {
            const colored = str
                .replace(/^Usage:/gm, theme.heading("Usage:"))
                .replace(/^Options:/gm, theme.heading("Options:"))
                .replace(/^Commands:/gm, theme.heading("Commands:"));
            process.stdout.write(colored);
        },
        writeErr: (str) => process.stderr.write(str),
        outputError: (str, write) => write(theme.error(str)),
    });
    if (process.argv.includes("-V") ||
        process.argv.includes("--version") ||
        process.argv.includes("-v")) {
        console.log(ctx.programVersion);
        process.exit(0);
    }
    program.addHelpText("beforeAll", () => {
        if (hasEmittedCliBanner())
            return "";
        const rich = isRich();
        const line = formatCliBannerLine(ctx.programVersion, { richTty: rich });
        return `\n${line}\n`;
    });
    const fmtExamples = EXAMPLES.map(([cmd, desc]) => `  ${theme.command(cmd)}\n    ${theme.muted(desc)}`).join("\n");
    program.addHelpText("afterAll", ({ command }) => {
        if (command !== program)
            return "";
        const docs = formatDocsLink("/cli", "docs.clawd.bot/cli");
        return `\n${theme.heading("Examples:")}\n${fmtExamples}\n\n${theme.muted("Docs:")} ${docs}\n`;
    });
}
