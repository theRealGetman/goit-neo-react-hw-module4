import axios from "axios";

const API_KEY = "jeO8vFD8I3vxhYPYPkwrauDoj21wIDjqetD6HcGR1e8";
axios.defaults.baseURL = "https://api.unsplash.com";

const headers = {
  Authorization: "Client-ID " + API_KEY,
};

export const searchPhotos = async (params) => {
  const response = await axios.get(`/search/photos`, {
    headers,
    params,
  });
  console.log(response);

  return response.data;
};
