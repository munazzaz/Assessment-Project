import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
      point1: '1468px',
      point2: "1257px",
      point3: "1152px",
      point4: "1043px",
      point5: "1117px"


      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    
  },
  plugins: [],

};
export default config;
