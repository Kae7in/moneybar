// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {
        backgroundColor: {
          'primary': '#0F1010',
        },
        textColor: {
          'primary': '#01D57D',
        },
      },
    },
    plugins: [],
  }
