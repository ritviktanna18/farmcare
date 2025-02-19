import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#E2E8F0',
            maxWidth: 'none',
            h1: {
              color: '#A7F3D0',
            },
            h2: {
              color: '#A7F3D0',
            },
            h3: {
              color: '#A7F3D0',
            },
            h4: {
              color: '#A7F3D0',
            },
            strong: {
              color: '#A7F3D0',
            },
            a: {
              color: '#34D399',
              '&:hover': {
                color: '#6EE7B7',
              },
            },
            code: {
              color: '#A7F3D0',
            },
            blockquote: {
              color: '#A7F3D0',
              borderLeftColor: '#059669',
            },
          },
        },
      },
    },
  },
  plugins: [typography()],
}