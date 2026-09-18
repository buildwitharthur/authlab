import { defineConfig } from "kubb/config";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginAxios } from "@kubb/plugin-axios";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginZod } from "@kubb/plugin-zod";

export default defineConfig({
  input: "http://localhost:8080/openapi.json",
  output: {
    path: "./src/api",
    clean: true,
  },
  plugins: [
    pluginTs({
      output: {
        path: "types",
        mode: "directory",
      },
    }),

    pluginAxios({
      output: {
        path: "clients",
        mode: "directory",
      },
    }),

    pluginReactQuery({
      output: {
        path: "hooks",
        mode: "directory",
      },
      suspense: {},
      hooks: true,
    }),

    pluginZod({
      output: {
        path: "zod",
        mode: "directory",
      },
    }),
  ],
});
