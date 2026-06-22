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
const dstJS = path.resolve(dstDir, "comercial_build.js");
const dstCSS = path.resolve(dstDir, "comercial.css");

// Se elminan lo que ya estan guardados
if (fs.existsSync(dstJS)) fs.unlinkSync(dstJS);
if (fs.existsSync(dstCSS)) fs.unlinkSync(dstCSS);

// Se copia el JS principal
const buildPath = path.resolve(srcDir, "comercial_build.js");
fs.copyFileSync(buildPath, dstJS);

// Se copia el CSS
const assets = path.resolve(srcDir, "assets");
if (fs.existsSync(assets)) {
  fs.readdirSync(assets).forEach((file) => {
    if (file.endsWith(".css")) {
      const srcCSS = path.resolve(assets, file);
      fs.copyFileSync(srcCSS, dstCSS);
    }
  });
}
