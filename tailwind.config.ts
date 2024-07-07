import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        gray: {
          100: '#fafafa',
          200: '#f3f3f3',
          300: '#e5e5e5',
          400: '#cdcdcd',
          500: '#a8a8a8',
          600: '#858585',
          700: '#666666',
          800: '#434343',
        }
      }
    },
  },
  plugins: [],
};
export default config;
