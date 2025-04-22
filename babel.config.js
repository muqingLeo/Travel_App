module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react"
  ],
  plugins: [
    ["@babel/plugin-transform-runtime", { regenerator: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }]
  ],
  env: {
    test: {
      plugins: ["@babel/plugin-transform-modules-commonjs"]
    }
  }
};