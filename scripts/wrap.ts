import { Font, open } from "fontkit";

const LINE_WIDTH = 28000
const font = await open("notosanscjkjp-black.otf") as Font

export default function wrap(s: string): string {
  const words = s.split(/\s+/)
  const buf: string[] = []

  loop:
  while (words.length > 0) {
    for (let i = words.length; i > 0; --i) {
      const s = words.slice(0, i).join(" ")
      if (checkWidth(s)) {
        words.splice(0, i)
        buf.push(s)
        continue loop
      }
    }

    buf.push(words.pop()!)
  }

  return buf.join("\n")
}

function checkWidth(s: string) {
  const width = font.glyphsForString(s).reduce((a, c) => a + c.advanceWidth, 0)
  return width <= LINE_WIDTH
}
