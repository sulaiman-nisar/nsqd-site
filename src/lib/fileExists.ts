import fs from "node:fs";
import path from "node:path";

// Build-time check for whether a /public-relative path resolves to an
// actual file on disk. Used by case study image components so MDX can
// reference shots that haven't been delivered yet — they just don't
// render, instead of showing empty placeholder boxes.
export function publicFileExists(publicPath: string): boolean {
  const cleaned = publicPath.startsWith("/") ? publicPath.slice(1) : publicPath;
  const full = path.join(process.cwd(), "public", cleaned);
  try {
    return fs.statSync(full).isFile();
  } catch {
    return false;
  }
}
