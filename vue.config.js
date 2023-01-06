const path = require("path");
module.exports = {
  chainWebpack: (config) => {
    config.plugin("VuetifyLoaderPlugin").tap((args) => [
      {
        match(originalTag, { kebabTag, camelTag, path, component }) {
          if (kebabTag.startsWith("core-")) {
            return [
              camelTag,
              `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`,
            ];
          }
        },
      },
    ]);
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");

    config.resolve.alias.set(
      "vue$",
      // If using the runtime only build
      path.resolve(__dirname, "node_modules/vue/dist/vue.runtime.esm.js")
      // Or if using full build of Vue (runtime + compiler)
      // path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js')
    );
  },
  transpileDependencies: ['@formulajs/formulajs'],
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    https: false,
  }
};
