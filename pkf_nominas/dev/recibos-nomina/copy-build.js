import fs from "fs";
import path from "path";
import process from "process";

// Se configuran las rutas
const cwd = process.cwd();
const dstDir = path.resolve(cwd, "../../static/lib");
const srcDir = path.resolve(cwd, "dist");

// Se crea la carpeta de destino si no existe
if (!fs.existsSync(dstDir)) {
  fs.mkdirSync(dstDir, { recursive: true });
}

// Se definen los archivos destino
const dstJS = path.resolve(dstDir, "recibos_nomina_build.js");

// Se elminan lo que ya estan guardados
if (fs.existsSync(dstJS)) fs.unlinkSync(dstJS);

// Se copia el JS principal
const buildPath = path.resolve(srcDir, "recibos_nomina_build.js");
fs.copyFileSync(buildPath, dstJS);
