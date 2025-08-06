/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f008c",
        primaryLight: "#e5d9ee",
        softGray: "#fafafa",
        softGray2: "#f4f4f4",
        softGray7: "#f8f9fa",
        slateBlack: "#1a1a1a",
        slateBlack3: "#333333",
        coral: "#ff6b6b",
        success: "#52c41a",
        warning: "#faad14",
        error: "#ff4d4f",
        info: "#1890ff",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 