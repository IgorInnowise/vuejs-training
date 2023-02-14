module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html,vue}'],
  theme: {
    extend: {
      colors: {
        "todo-black": "#0f172a",
        "todo-yellow": "#fde68a",
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [],
};
