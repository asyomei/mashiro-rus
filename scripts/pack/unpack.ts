import { mkdir } from "node:fs/promises"
import { join } from "node:path"
import spawn from "nano-spawn"

const scnDir = process.argv[2]
if (!scnDir) {
  console.error("Required: path/to/scenarios")
  process.exit(1)
}

await mkdir("scenarios/unpacked", { recursive: true })
const jsonDir = join(scnDir, "unpacked")

await spawn("./external/VNTextPatch/VNTextPatch.exe", ["extractlocal", scnDir, jsonDir], { stdio: "inherit" })
