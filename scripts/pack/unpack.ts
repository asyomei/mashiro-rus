import { mkdir } from "node:fs/promises"
import { basename, dirname, join } from "node:path"
import spawn from "nano-spawn"

const scnFile = process.argv[2]
if (!scnFile) {
  console.error("Required: path/to/file.txt.scn")
  process.exit(1)
}

await mkdir("scenarios/unpacked", { recursive: true })
const jsonFile = join(dirname(scnFile), "unpacked", basename(scnFile).replace(".scn", ".json"))

await spawn("./external/VNTextPatch/VNTextPatch.exe", ["extractlocal", scnFile, jsonFile], { stdio: "inherit" })
