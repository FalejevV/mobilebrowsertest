import type { Config } from "tailwindcss";

const config: Config = {
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
      height: {
        dvh: "100dvh",
      },
      maxHeight: {
        dvh: "100dvh",
      },
      minHeight: {
        dvh: "100dvh",
      },
    },
  },
  safelist: [
    {
      pattern: /from-+/,
    },
    {
      pattern: /to-+/,
    },
    {
      pattern: /text-+/,
    },
    {
      pattern: /top-+/,
    },
    {
      pattern: /top-+/,
    },
  ],
  plugins: [],
};
export default config;
