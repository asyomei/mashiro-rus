import { basename, resolve } from "node:path"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import translate from "./translate"

const scnPath = process.argv[2]
if (!scnPath) {
  console.error(`Required: path/to/scenario.txt.json`)
  process.exit(1)
}

const scn = JSON.parse(await readFile(scnPath, "utf8")) as { message: string; name?: string }[]

const text = scn.map(x => x.message).join("\n---\n")
const tl = await translate({ text, source: "en", target: "ru" })
const tlLines = tl.replaceAll("…", "...").split("\n---\n")
const tlScn = scn.map(({ name, message: _message }, i) => {
  const message = tlLines[i]
  if (!name) return { _message, message: `[TL] ${message}` }
  return { name, _message, message: `[TL] ${trimQuotes(message)}` }
})

const outpath = resolve(scnPath, "../../translated", basename(scnPath))
await mkdir("scenarios/translated", { recursive: true })
await writeFile(outpath, JSON.stringify(tlScn, undefined, 2))

function trimQuotes(s: string) {
  s = s.replace(/»(.)$/, "$1")
  s = s.replace(/^[“"'«—\-]/, "")
  s = s.replace(/[”"'»]$/, "")
  return s.trim()
}
