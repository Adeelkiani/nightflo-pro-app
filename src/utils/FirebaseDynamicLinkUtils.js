import axios from "axios";

const api_key = "AIzaSyDTb_zx9Z-aFHZAshyGqz6m3-qbiv3xk3Q";

export async function shortenLink(url) {
  let shortLink = "";
  try {
    const response = await axios.post(
      `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${api_key}`,
      {
        dynamicLinkInfo: {
          domainUriPrefix: "https://mytallyapp.page.link",
          link: url,
        },
      }
    );
    shortLink = response.data.shortLink;
  } catch (error) {
    console.error("Error creating short link", error);
  }
  return shortLink;
}
