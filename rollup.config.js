import typescript from "rollup-plugin-typescript2";
import visualizer from 'rollup-plugin-visualizer';
import cleanup from 'rollup-plugin-cleanup';
import butternut from 'rollup-plugin-butternut';
import pkg from "./package.json";
export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es"
    },
    {
      file: pkg.umd,
      format: "umd",
      name: "colorVariations",
      globals: {
        ramda: 'ramda',
        polished: 'polished'
      }
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    typescript({
      typescript: require("typescript")
    }),
    cleanup(),
    butternut(),
    visualizer({
      filename: './reports/stats.html'
    })
  ]
};
