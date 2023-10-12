import { setProject, setProjectRewards } from "./projects";

const ADD_IMAGE = "rewards/addImage";

const addImage = (image, info) => ({
  type: ADD_IMAGE,
  image,
  info,
});

export const addAImage = (rewardId, projectId, info) => async (dispatch) => {
  const response = await fetch(`/api/rewards/${rewardId}/image`, {
    method: "POST",
    body: info,
    credentials: "include",
  });

  if (response.ok) {
    dispatch(addImage(rewardId, info));
  }
};

export default function reducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case ADD_IMAGE:
      action.image.forEach((project) => (newState[project.id] = project));

      return newState;
    default:
      return state;
  }
}
