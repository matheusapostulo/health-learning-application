import type { Config } from "tailwindcss";

const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config ={
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
				fade: 'fadeIn .6s ease-in-out forwards',
			},

			keyframes: {
				fadeIn: {
					from: { opacity: "0", transform: "translateY(5px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
			},
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        beige: {
          main: "#9B8E85",
          "main-2": "#E1DCD8",
        },
        gray: {
          main: "#333333"
        }
      },
    },
  },
  plugins: [],
};

export default config;
