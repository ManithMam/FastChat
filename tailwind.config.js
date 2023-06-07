/** @type {import('tailwindcss').Config} */
export default {
 /*  corePlugins: {
        preflight: false,
      },
  important: '#root',  */
  darkMode: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  
  theme: {
    extend: {
      colors: {
        'primary': '#40033C',
        'background': '#0D0D0D'
      },      
    },
  },
  plugins: [],
}

