/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // Dấu ** có nghĩa là quét tất cả thư mục con, cháu chắt...
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}