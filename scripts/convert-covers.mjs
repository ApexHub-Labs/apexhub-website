// One-off: convert the prepared equal-dimension cover images (cover images/N.png)
// to public/projects/<slug>/main.webp. Originals are never modified.
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = (n) => path.join(ROOT, "cover images", n);
const OUT = (slug) => path.join(ROOT, "public", "projects", slug, "main.webp");

const MAP = {
  "1.png": "apa-website",
  "2.png": "safe-light",
  "3.png": "apa-lms",
  "4.png": "soso",
  "5.png": "maderia",
  "6.png": "educonnect",
  "main images.png": "working",
};

for (const [file, slug] of Object.entries(MAP)) {
  const info = await sharp(SRC(file))
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 95, effort: 6 })
    .toFile(OUT(slug));
  console.log(`${file} -> ${slug}/main.webp  ${info.width}x${info.height}`);
}
