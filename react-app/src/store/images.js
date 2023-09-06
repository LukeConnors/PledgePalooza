const GET_IMAGES = "images/GET_IMAGES";
const GET_REWARD_IMAGE = "images/GET_REWARD_IMAGE"; // Unique type for reward images
const REMOVE_IMAGE = "images/REMOVE_IMAGE";

export const imageSelector = (state) => ({
  images: state.images.images,
  rewardImage: state.images.rewardImage,
});

const setImages = (images) => ({
  type: GET_IMAGES,
  payload: images,
});

const setRewardImage = (image) => ({
  // Use a different type for reward images
  type: GET_REWARD_IMAGE,
  payload: image, // Create an object with the ID as the key
});

const removeImage = (image) => ({
  type: REMOVE_IMAGE,
  payload: image,
});

const initialState = { images: null, rewardImage: [] };

export const getImages = () => async (dispatch) => {
  const response = await fetch("/api/images/", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      console.log("ERROR FETCHING IMAGES");
    }

    dispatch(setImages(data));
  }
};

export const getRewardImages = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/rewards/${id}/image`);

    if (!response.ok) {
      console.log("Error response:", response);
      throw new Error("Failed to fetch reward images");
    }

    const data = await response.json();
    console.log("Fetched REWARD IMAGE data:", data.image);

    dispatch(setRewardImage(data.image[0]));
  } catch (error) {
    console.error("Error fetching reward images:", error);
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_IMAGES:
      return { images: action.payload };

    case GET_REWARD_IMAGE:
      console.log("Received reward image data:", action.payload);
      return {
        ...state,
        rewardImage: [...state.rewardImage, action.payload],
      };

    default:
      return state;
  }
}
