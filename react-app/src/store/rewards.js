const ADD_IMAGE = "rewards/addImage";
const GET_REWARDS = "rewards/setProjectRewards";
const EDIT_REWARD = "rewards/editAReward";

const addImage = (info) => ({
  type: ADD_IMAGE,
  info,
});

const setProjectRewards = (projectId, rewards) => ({
  type: GET_REWARDS,
  projectId,
  rewards,
});

const editAReward = (rewardId, formData) => ({
  type: EDIT_REWARD,
  formData,
});

export const addAImage = (rewardId, info) => async (dispatch) => {
  const response = await fetch(`/api/rewards/${rewardId}/image`, {
    method: "POST",
    body: info,
    credentials: "include",
  });

  if (response.ok) {
    dispatch(addImage(rewardId, info));
  }
};

export const getProjectRewards = (projectId) => async (dispatch) => {
  const response = await fetch(`/api/projects/${projectId}/rewards`);
  if (response.ok) {
    const data = await response.json();
    console.log("DATAAA", data);
    dispatch(setProjectRewards(projectId, data.rewards));
  }
};

export const editReward = (projectId, rewardId, formData) => async (dispatch) => {
  const response = await fetch(`/api/projects/${projectId}/rewards/${rewardId}`, {
    method: "PUT",
    body: formData,
    credentials: "include",
  });

  dispatch(editAReward(projectId, rewardId, formData));
};

export default function reducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case ADD_IMAGE:
      const newImage = action.info;
      newState = { ...state };
      newState[newImage.id] = newImage;
      return newState;
    case GET_REWARDS:
      action.rewards.forEach((reward) => {
        console.log("REWARD", reward);
        newState[reward.id] = reward;
      });
      return newState;
    case EDIT_REWARD:
      newState = { ...state };
      const rewardId = action.rewardId;

      newState[rewardId] = { ...state[rewardId], ...action.formData };
      return newState;
    default:
      return state;
  }
}
