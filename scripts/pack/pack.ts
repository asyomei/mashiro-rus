import { readFile, rm, writeFile } from "node:fs/promises"
import { basename, dirname, resolve } from "node:path"
import spawn from "nano-spawn"
import wrap from "../wrap"

const NAMES: Record<string, string> = {
  "???": "???",
  Airi: "Айри",
  Sakuno: "Сакуно",
  Shingo: "Синго",
}

const tlPath = process.argv[2]
if (!tlPath) {
  throw new Error("Required: path/to/scenario.txt.json")
}

const scn = JSON.parse(await readFile(tlPath, "utf8")) as { message: string; name?: string }[]
for (const line of scn) {
  if (line.name) {
    const tlName = NAMES[line.name]
    if (!tlName) throw new Error(`No translated name for "${line.name}"`)

    line.name = tlName
    line.message = `“${line.message}”`
  }

  line.message = `%p-1;${wrap(line.message)}`
}

const jsonPath = tlPath.replace(".json", ".out.json")
const scnPath = tlPath.replace(".json", ".scn")
const origPath = resolve(dirname(scnPath), "..", basename(scnPath))

await writeFile(jsonPath, JSON.stringify(scn))

try {
  await spawn("./external/VNTextPatch/VNTextPatch.exe", ["insertlocal", origPath, jsonPath, scnPath], { stdio: "inherit" })
} finally {
  await rm(jsonPath)
}
