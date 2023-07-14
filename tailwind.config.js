/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'banner': "url('https://images.pexels.com/photos/12765962/pexels-photo-12765962.jpeg?auto=compress&cs=tinysrgb&w=1600')",
      }
    },
  },
  plugins: [],
};
