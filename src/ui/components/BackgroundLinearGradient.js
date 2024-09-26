import { LinearGradient } from "expo-linear-gradient";
import { GlobalStyles } from "../../consts/GlobalConsts";
import { changeSomething } from "../../redux/EventsReducer";

const BackgroundLinearGradient = ({ children }) => {
  return (
    <>
      <LinearGradient
        // colors={["#2a1d40", "#1e1c33", "#1e2234", "#263941"]}
        colors={["#000", "#000"]}
        start={[0, 0.5]}
        end={[1, 1]}
        style={GlobalStyles.backgroundContainer}
      >
        {children}
      </LinearGradient>
    </>
  );
};

export default BackgroundLinearGradient;
