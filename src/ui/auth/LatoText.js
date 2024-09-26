const { Text } = require("react-native");

const LatoText = ({ children, style, maxLines }) => {
  let fontWeight = "normal"; // style
  if (!style) {
    fontWeight = "normal";
  } else {
    fontWeight = style.fontWeight;
  }

  if (Array.isArray(style)) {
    return (
      <Text style={style} numberOfLines={maxLines}>
        {children}
      </Text>
    );
  } else {
    style = { ...style, fontFamily: "Lato_400Regular" };
    if (fontWeight) {
      switch (fontWeight) {
        case "bold":
          style = { ...style, fontFamily: "Lato_700Bold" };
          break;
        default:
          style = { ...style };
      }
    }
    return (
      <Text numberOfLines={maxLines} style={[style]}>
        {children}
      </Text>
    );
  }
};

export default LatoText;

// export default () => {
//     let [fontsLoaded] = useFonts({
//       Lato_100Thin,
//       Lato_100Thin_Italic,
//       Lato_300Light,
//       Lato_300Light_Italic,
//       Lato_400Regular,
//       Lato_400Regular_Italic,
//       Lato_700Bold,
//       Lato_700Bold_Italic,
//       Lato_900Black,
//       Lato_900Black_Italic,
//     });
