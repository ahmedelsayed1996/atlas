import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

    extend: {

      colors: {
        primary: "#E68514",
        secondColor: "#195658",
      },
      backgroundImage: {
        'about-bg': "url('/images/bg-about.png')",
      },
    },
  },
  plugins: [],
};
export default config;
