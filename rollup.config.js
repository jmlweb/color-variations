import progress from 'rollup-plugin-progress';
import typescript from "rollup-plugin-typescript2";
import cleanup from 'rollup-plugin-cleanup';
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import { plugin as analyze } from 'rollup-plugin-analyzer'
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
    progress({
      clearLine: false
    }),
    typescript({
      typescript: require('typescript')
    }),
    cleanup(),
    analyze(),
    sizeSnapshot({
      snapshotPath: './reports/.size-snapshot.json'
    }),
  ]
};
