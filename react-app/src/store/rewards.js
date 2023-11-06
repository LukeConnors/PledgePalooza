const ADD_IMAGE = "rewards/ADD_IMAGE";
const GET_REWARDS = "rewards/GET_REWARDS";
const ADD_REWARD = "rewards/ADD_REWARD"
const UPDATE_REWARD = "rewards/UPDATE_REWARD";
const DELETE_REWARD = "rewards/DELETE_REWARD";


const addImage = (info) => ({
  type: ADD_IMAGE,
  payload: info,
});

const setProjectRewards = (rewards) => ({
  type: GET_REWARDS,
  rewards,
});

const addReward = (reward) => ({
  type: ADD_REWARD,
  payload: reward
})


const updateReward = (reward) => ({
  type: UPDATE_REWARD,
  payload: reward,
});

const deleteReward = (rewardId) => ({
  type: DELETE_REWARD,
  payload: rewardId
})

export const addAImage = (rewardId, payload) => async (dispatch) => {
  const res = await fetch(`/api/rewards/${rewardId}/image`, {
    method: "POST",
    body: payload,
    credentials: "include",
  });

  if (res.ok) {
    const newImage = await res.json()
    dispatch(addImage(newImage));
    return newImage
  }
};


export const getProjectRewards = (projectId) => async (dispatch) => {
  const response = await fetch(`/api/projects/${projectId}/rewards`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setProjectRewards(data.rewards));
  }
};

export const createReward = (projectId, payload) => async (dispatch) => {
  const res = await fetch(`/api/projects/${projectId}`, {
    method: "POST",
    body: payload
  })
  if (res.ok) {
    const newReward = await res.json()
    dispatch(addReward(newReward))
    return newReward
  }
}

export const editReward = (projectId, rewardId, payload) => async (dispatch) => {
  const res = await fetch(`/api/projects/${projectId}/rewards/${rewardId}`, {
    method: "PUT",
    body: payload,
    // credentials: "include",
  });
  if (res.ok) {
    const editedReward = await res.json();
    dispatch(updateReward(editedReward));
    return editedReward
  }
};

export const removeReward = (projectId, rewardId) => async (dispatch) => {
  const res = await fetch(`/api/projects/${projectId}/rewards/${rewardId}`, {
    method: "DELETE"
  })
  if (res.ok) {
    dispatch(deleteReward(rewardId))
  }
}

export default function reducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case GET_REWARDS:
      action.rewards.forEach((reward) => {
        newState[reward.id] = reward;
      });
      return newState;
    case ADD_IMAGE:
      const newImage = action.payload;
      return {
        ...state,
        [newImage.imageable_id]: {
          ...state[newImage.imageable_id],
          image: [newImage],
        },
      }
    case ADD_REWARD:
      const newReward = action.payload
      newState = { ...state }
      newState[newReward.id] = newReward
      return newState
    case UPDATE_REWARD:
      newState = { ...state };
      const rewardId = action.payload.id;
      newState[rewardId] = { ...state[rewardId], ...action.payload };
      return newState;
    case DELETE_REWARD:
      const r_id = action.payload
      newState = { ...state }
      delete newState[r_id]
      return newState
    default:
      return state;
  }
}
