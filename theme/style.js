const COLORS = {
  white: "#fff",
  black: "#000",
  lightBlack: "#101010",
  logo: "#7ed957",
  highlight: "#192b11",
  gray: "#A9A9A9",
  darkGray: "#696969",
  red: "#FF0000", 
    green: '#455e14',  
};

const FONTS = {
  playfair: "Playfair",
  sacramento: "Sacramento",
};

const STYLES = {
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBlack,
  },
  header: {
    fontFamily: FONTS.sacramento,
    fontSize: 24,
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontFamily: FONTS.playfair,
    fontSize: 20,
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    fontFamily: FONTS.playfair,
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
  textInput: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 60,
    paddingHorizontal: 10,
  }
};

export { COLORS, FONTS, STYLES };
