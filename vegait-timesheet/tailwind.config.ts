import type { Config } from "tailwindcss";
import { colors } from "./src/lib/colors";

export default {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors,
		},
	},
	plugins: [],
} satisfies Config;
