// const path = require("path")
import fs from "fs";
import path from "path";
import process from "process";

const dst = path.resolve(
  process.cwd(),
  "../../static/lib/recurring_invoice_build.js",
);

const dstDir = path.dirname(dst);

if (!fs.existsSync(dstDir)) {
  fs.mkdirSync(dstDir, { recursive: true });
}

fs.unlinkSync(dst);

const buildPath = path.resolve(
  process.cwd(),
  "dist/recurring_invoice_build.js",
);

fs.copyFileSync(buildPath, dst);
