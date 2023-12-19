// --------------------------------------------------
// 🧰 Tools
// --------------------------------------------------

import { fileURLToPath } from 'url';
import path from 'path';
import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import postcss from "postcss";
import autoprefixer from "autoprefixer";

// --------------------------------------------------
// 🔧 Setup
// --------------------------------------------------

// Setting the valet domain by appending .test to the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const domain = path.basename(path.resolve(__dirname, "../")).toLowerCase() + ".test";

// JavaScript files
const jsFiles = [
  "assets/js/main.js"
]

// CSS files
const cssFiles = [
  "assets/scss/style.scss"
]

// --------------------------------------------------
// ⚡ BrowserSync
// --------------------------------------------------

// const browserSyncInstance = browserSync.create();

// browserSyncInstance.init({
//   proxy: domain, // Set the proxy to the valet domain
//   host: domain, // Set the host to the valet domain
//   open: "external", // Automatically open the valet domain in the browser
//   reloadOnRestart: true, // Reload the browser when we restart the server
//   notify: false, // I don't want to see the BrowserSync notification in the browser
//   ui: false, // Disable the BrowserSync UI

// });

// --------------------------------------------------
// ✨ JavaScript
// Bundles and minifies JavaScript files
// --------------------------------------------------

const jsContext = await esbuild.context({
  entryPoints: jsFiles,
  outdir: "assets",
  outExtension: {
    ".js": ".min.js"
  },
  minify: true,
  bundle: true,
  sourcemap: true,
})

await jsContext.watch();

// --------------------------------------------------
// 🎨 CSS
// Compiles SCSS files to CSS with vendor prefixes
// --------------------------------------------------

const cssContext = await esbuild.context({
  entryPoints: cssFiles,
  outdir: "assets",
  minify: true,
  sourcemap: true,
  plugins: [
    sassPlugin({
      async transform(source) {
        const { css } = await postcss([autoprefixer]).process(source, {
          from: undefined // This is needed to prevent postcss from trying to resolve the file path
        });
        return css;
      },
    })
  ]
})

await cssContext.watch();

// --------------------------------------------------
// 📁 Other files
// --------------------------------------------------

// browserSyncInstance.watch([
//   "assets/css/*.css",
//   "assets/js/*.min.js",
//   "assets/images/**",
//   "site/*/**",
//   "!site/sessions/**",
//   "!site/cache/**",
//   "content/**/*.*"
// ]).on("change", (file) => {
//   browserSyncInstance.reload(file);
// });