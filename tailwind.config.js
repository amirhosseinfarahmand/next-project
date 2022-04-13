module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "pic-body": "url('./images/black-background-g182083a32_1920.jpg')",
      },
      fontFamily: { Cursive: ["Cursive"] },
    },
  },
  plugins: [],
};
