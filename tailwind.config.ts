import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'main-purple': '#635FC7',
        'light-purple': '#A8A4FF',
        black: '#000112',
        'very-dark-gray': '#20212C',
        'dark-gray': '#2B2C37',
        'lines-dark': '#3E3F4E',
        'medium-gray': '#828FA3',
        'lines-white': '#E4EBFA',
        'light-grey': '#F4F7FD',
        red: '#EA5555',
        'light-red': '#FF9898',
      },
      screens: {
        mobile: '380px',
        'small-mobile': '282px',
      },
      fontSize: {
        'body-m': [
          '12px',
          {
            lineHeight: '15px',
            fontWeight: 'bold',
          },
        ],
        'body-l': [
          '13px',
          {
            lineHeight: '23px',
            fontWeight: 'medium',
          },
        ],
        'heading-s': [
          '12px',
          {
            lineHeight: '15px',
            letterSpacing: '2.4px',
            fontWeight: 'bold',
          },
        ],
        'heading-m': [
          '15px',
          {
            lineHeight: '19px',
            fontWeight: 'bold',
          },
        ],
        'heading-l': [
          '18px',
          {
            lineHeight: '23px',
            fontWeight: 'bold',
          },
        ],
        'heading-xl': [
          '24px',
          {
            lineHeight: '30px',
            fontWeight: 'bold',
          },
        ],
      },
    },
  },
  plugins: [],
}
export default config
