import { DUMMY_IMAGES } from "../consts/GlobalConsts";
const map = {};

export const getImageUrl = (userInfo) => {
  if (userInfo) {
    let imageUrl = "";
    if (userInfo.organizer) {
      imageUrl = userInfo.organizer.imageUrl;
    } else if (userInfo.id) {
      imageUrl = userInfo.imageUrl;
    }

    return imageUrl;
    // if (map[id]) {
    //   return map[id];
    // } else {
    //   const randomNumber = Math.floor(Math.random() * 100);
    //   map[id] = DUMMY_IMAGES[randomNumber % DUMMY_IMAGES.length];
    //   return map[id];
    // }
  } else {
    return stubReturn();
  }
};

function stubReturn() {
  const randomNumber = Math.floor(Math.random() * 100);
  return DUMMY_IMAGES[randomNumber % DUMMY_IMAGES.length];
}
