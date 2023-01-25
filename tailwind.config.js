// @ts-check

/** @type {import("tailwindcss").Config} */
const tailwindCssConfig = {
  content: ["./src/**/*.{js,ts,tsx}"],
  plugins: [
    require('@tailwindcss/forms')
  ],
};

module.exports = tailwindCssConfig;
