import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const requestedBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const basePath = requestedBasePath && requestedBasePath !== "/"
  ? `/${requestedBasePath.replace(/^\/+|\/+$/g, "")}`
  : "";

if (!basePath) {
  console.log("GitHub Pages base path is empty; exported public paths are unchanged.");
  process.exit(0);
}

const outputDirectory = path.resolve("out");
const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".mjs",
  ".txt",
  ".webmanifest",
  ".xml",
]);

const publicDirectories = ["assets", "fonts"];
let updatedFiles = 0;

function prefixPublicPaths(source) {
  let result = source;

  for (const directory of publicDirectories) {
    for (const quote of ['"', "'"]) {
      result = result.replaceAll(
        `${quote}/${directory}/`,
        `${quote}${basePath}/${directory}/`,
      );
    }

    result = result.replaceAll(
      `url(/${directory}/`,
      `url(${basePath}/${directory}/`,
    );
  }

  return result;
}

async function processDirectory(directory) {
  const entries = await readdir(directory);

  for (const entry of entries) {
    const filePath = path.join(directory, entry);
    const fileStats = await stat(filePath);

    if (fileStats.isDirectory()) {
      await processDirectory(filePath);
      continue;
    }

    if (!textExtensions.has(path.extname(entry))) continue;

    const source = await readFile(filePath, "utf8");
    const updated = prefixPublicPaths(source);

    if (updated === source) continue;

    await writeFile(filePath, updated, "utf8");
    updatedFiles += 1;
  }
}

await processDirectory(outputDirectory);
console.log(`Prepared ${updatedFiles} exported files for GitHub Pages at ${basePath}/.`);
