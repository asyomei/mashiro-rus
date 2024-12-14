import { setTimeout } from "timers/promises"

interface Options {
  text: string
  source: string
  target: string
}

const API_URL = "https://nexra.aryahcr.cc/api/translate/"

export default async function translate(opts: Options): Promise<string> {
  const id = await initTranslate(opts)

  while (true) {
    await setTimeout(500)
    const res = await poll(id)
    if (res) return res
  }
}

async function poll(id: string): Promise<false | string> {
  const resp = await fetch(API_URL + encodeURIComponent(id))
  const res = await resp.json()

  if (res.status === "pending") return false
  if (res.status !== "completed") {
    console.error(res)
    throw new Error()
  }

  return res.translate.result
}

async function initTranslate(opts: Options): Promise<string> {
  const resp = await fetch(API_URL, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(opts),
  })

  return (await resp.json()).id
}
