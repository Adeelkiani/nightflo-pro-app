import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  themeContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
    backgroundColor: "#000",
  },
  pressed: {
    opacity: 0.7,
  },
  heading: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Lato_700Bold",
  },
  normalText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    fontFamily: "Lato_400Regular",
  },
  fab: {
    width: 65,
    height: 65,
    borderRadius: 32,
    backgroundColor: "#00F0C5",
    bottom: 110,
    position: "absolute",
    right: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  fabText: {
    color: "white",
    fontSize: 50,
    paddingBottom: 5,
    fontWeight: "700",
  },
  dropDownItemStyle: {
    backgroundColor: "#FFFFFF05",
  },
  boxStyle: {
    backgroundColor: "black",
    borderColor: "white",
    zIndex: 999,
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 0.8,
  },
  dropDownBoxStyle: {
    backgroundColor: "black",
    borderTopColor: "black",
    borderColor: "#494949",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 5,
    marginHorizontal: 1,
  },
  dropDownTextStyle: {
    color: "white",
    fontSize: 14,
    paddingVertical: 5,
  },
  tabsContainerStyle: {
    marginHorizontal: 20,
    marginTop: 20,
    borderColor: "#00F0C5",
    borderWidth: 1,
    borderRadius: 8,
    padding: 2,
    alignSelf: "center",
  },
  tabStyle: {
    backgroundColor: "#FFFFFF05",
    borderColor: "transparent",
    borderWidth: 0.5,
    height: 45,
  },
  tabTextStyle: { color: "#fff" },
  activeTabTextStyle: { color: "#000" },
  activeTabStyle: {
    backgroundColor: "#00F0C5",
    borderRadius: 7,
  },
  menuOptionText: {
    fontSize: 15,
    fontWeight: "600",
  },
  divider: {
    backgroundColor: "#FFFFFF33",
    marginVertical: 5,
    height: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  otpCodeInputStyle: {
    backgroundColor: "transparent",
    borderRadius: 18,
    overflow: "hidden",
    width: 70,
    height: 70,
    fontSize: 28,
    color: "white",
    borderColor: "white",
    selectionColor: "white",
  },
  otpCodeInputHighlightStyle: {
    backgroundColor: "transparent",
    borderRadius: 18,
    overflow: "hidden",
    width: 70,
    height: 70,
    fontSize: 28,
    color: "white",
    borderColor: "#00F0C5",
  },
  screenTitleContainer: {
    alignItems: "center",
    marginHorizontal: 17,
    marginVertical: 15,
  },
  screenTitle: {
    color: "#00F0C5",
    fontSize: 24,
    fontWeight: "800",
  },
  screenPlaceHolderImage: {
    width: 100,
    height: 100,
  },
  screenDescription: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    paddingHorizontal: 20,
    textAlign: "center",
    marginTop: 5,
  },
  bottomTabImageActive: {
    width: 20,
    height: 20,
    tintColor: "#00F0C5",
  },
  bottomTabImageInActive: {
    width: 20,
    height: 20,
    tintColor: "white",
  },
  icon: {
    width: 18,
    height: 18,
    tintColor: "black",
  },
});

export const GlobalConsts = {
  Colors: {
    PURPLE_GRADIENT_1: "#150D3C",
    PURPLE_GRADIENT_2: "#B45AE9",
    PRIMARY_GRADIENT_1: "#00F0C5",
    PRIMARY_GRADIENT_2: "#008A71",
    primary100: "#EF7FD5",
    primary500: "#c30b64",
    primary800: "#610440",
    error100: "#fcdcbf",
    error500: "#f37c13",
    error700: "#DC3535",
    buttonPrimary: "#D654FF",
    gray500: "#39324a",
    gray700: "#221c30",
    inputTextBackground: "#191919",
    roleBackgroundView: "#191919",
    primaryGreen: "#00F0C5",
    primaryGrayBackground: "#191919",
    primaryGrayBackground2A: "#2A2A2A",
    primaryGreen05: "#00F0C505",
    primaryGreen10: "#00F0C510",
    primaryGreen15: "#00F0C515",
    primaryGreen25: "#00F0C525",
    primaryGreen50: "#00F0C550",
    primaryGreenTextColor: "#00F0C5",
    primaryHeadingColor: "#00E7BE",
    primaryDivider: "#00E7BE",
    defaultPink: "#EF7FD5",
    iron: "#494949",
    secureBackDrop90: "rgba(0,0,0,0.9)",
    secureBackDrop50: "rgba(0,0,0,0.5)",
    secureBackDrop20: "rgba(0,0,0,0.2)",
    GREEN: "#006400",
    RED: "#DC3535",
    RED10: "#DC353510",
    RED90: "#DC353590",
    BLUE: "#2F58CD",
    CARD_LIGHT_GREY: "#FFFFFF11",
    succinctViolet: "#523D6D",
    CARD_HIGHLIGHTED_LIGHT_GREY: "#FFFFFF40",
    SLATE_GRAY: "#646170",
    CARD_BACKGROUND: "#312b46",
    LINK: "#1e81b0",
    textGreyTransparent: "rgba(0, 0, 0, 0.4)",
    whiteSolidBackground: "#F3F5FA",
    pinBall: "#D3D3D3",
    transparent: "transparent",
    transparent05: "#FFFFFF05",
    transparent10: "#FFFFFF10",
    transparent15: "#FFFFFF15",
    transparent60: "#FFFFFF60",
    blackSapphire: "#454555",
    white: "#FFFFFF",
    black: "#000000",
    grey81: "#818181",
    BACK_BTN: "#73D7D5",
    placeHolder: "#555555",
    gray2A: "#2A2A2A",
  },
};

export function textFieldGradient() {
  return (
    <linearGradient
      id="paint0_linear_1843_594"
      x1="-10522.4"
      y1="25.9703"
      x2="-10522.4"
      y2="-1.5077"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#D654FF" />
      <stop offset="1" stop-color="#FF9CBA" />
    </linearGradient>
  );
}

export const DUMMY_IMAGES = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpTgjiPg9dXGN1cu_BZE0i8bFY_pwkk-N4ZzgDLBDjJrC6w1C_",
  "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTV_IdsV5Oel7GhWGs-MfJNhsh1RsKOtwkxrK4csIjuFjAhTLGK",
  "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTdxUO8fb8idHHW4dHfPa2cc76UaKJ3yA0ojiqmAAfUoZB5rPp6",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPZ-ykwJvwikkP3V1PJ4zPNed-Dwe5IKtzNDGSCMag-jfqc_9M",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST053xPWPjsgcSrAMHSGTB4F4-OH5yMtXSIMkMb5ZMG3ctSRWN",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThZWJx32e7vvzK-_Ok8rl2M6ZtEKhiHz9-uAAJcMVwAKPabKAJ",
  "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTb35nfXGwkAs40WbJmp5PG1Dq9x6x3Rp8c7yPMVagjomL93AnB",
  "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRDNjOBTVPYor31TIE8Kkz_ZhVpuyR6XiGtrRod1pZOo7oVMkj8",
  "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS4U40NBewOB7ZwqaUEssc9gSpbJPapWTkyWugOMo4jL_xtOui4",
  "https://www.activationquotes.com/uploads/AuthorImages/1607464632.jpg",
  "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQP1Y4X90XZj7IVooSmG6E_v0mqivUszyGGJRCn7ZPvqq1A5nu9",
  "https://www.thefamouspeople.com/profiles/images/martin-starr-1.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
  "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY2NzA3ODE3OTgwMzcyMjYw/jeff-bezos-andrew-harrer_bloomberg-via-getty-images.jpg",
  "https://imageio.forbes.com/specials-images/imageserve/615bb1e64b6b8efbb0c57d55/Chief-Executive-Officer-of-Apple--Steve-Jobs/960x0.jpg?format=jpg&width=960",
  "https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/6/6e/Steve_Wozniak_by_Gage_Skidmore_3_%28cropped%29.jpg",
];

export const LINK_GUEST_INFO = "https://guestinfo.mytallyapp.com/";
export const MASTER_TALLY = "63e257a8070fbb76b2aeb895";
export const WALKUP_PROMOTER_EMAIL = "walkup@mytallyapp.com";
