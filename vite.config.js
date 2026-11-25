import { defineConfig } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const carpetaProyecto = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "/",
  build: {
    rolldownOptions: {
      input: {
        inicio: resolve(carpetaProyecto, "index.html"),
        comparativo: resolve(carpetaProyecto, "pages/comparativo.html"),
        foda: resolve(carpetaProyecto, "pages/foda.html"),
        plan: resolve(carpetaProyecto, "pages/plan.html"),
        juego: resolve(carpetaProyecto, "pages/juego.html"),
        carta: resolve(carpetaProyecto, "pages/carta.html"),
        agradecimiento: resolve(carpetaProyecto, "pages/agradecimiento.html")
      }
    }
  }
});