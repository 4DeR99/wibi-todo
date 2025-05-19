import fluid, { extract, screens, fontSize } from 'fluid-tailwind'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: {
    files: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    extract,
  },
  theme: {
    screens: {
      ...screens,
      xs: '23.75rem', // 380px
    },
    fontSize,
    fontFamily: {
      sans: ['var(--font-inter)'],
    },
    extend: {
      colors: {
        accent: '#007FF0',
      },
    },
  },
  plugins: [
    fluid({
      checkSC144: false,
    }),
  ],
}
export default config
