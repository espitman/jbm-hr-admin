// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      'Require self-closing': 'off',
      "vue/attributes-order": "off",
      'vue/html-self-closing': 'off',
    },
  }
)
