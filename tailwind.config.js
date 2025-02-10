// remember to use module.exports instead of tailwind.config in production
tailwind.config = {
    // Note: config only includes the used styles & variables of your selection
    content: ["./src/*/.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
          jakarta: ["Plus Jakarta Sans", "sans-serif"],
        },
        colors: {
          purple: "#4B0082",
          green: "#2A8A1D",
          "01": "#333333",
          "02": "#535454",
          "03": "#FE7A00",
          "04": "#D8BFD8",  
        },
        cursor: {
          hand: "url(/logos/brush.svg), pointer",
        },
      },
    },
    plugins: [],
  };