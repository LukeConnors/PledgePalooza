const GET_PROJECTS = "projects/setProjects";
const GET_PROJECT = "projects/setProject";
const GET_REWARDS = "projects/setProjectRewards";
const EDIT_REWARD = "projects/editAReward";

const setProjects = (projects) => ({
  type: GET_PROJECTS,
  projects,
});

export const setProject = (projectId) => ({
  type: GET_PROJECT,
  projectId,
});

export const setProjectRewards = (projectId, rewards) => ({
  type: GET_REWARDS,
  projectId,
  rewards,
});

const editAReward = (projectId, rewardId, formData) => ({
  type: EDIT_REWARD,
  projectId,
  rewardId,
  formData,
});

export const getProjects = () => async (dispatch) => {
  const response = await fetch("/api/projects/");

  if (response.ok) {
    const data = await response.json();

    dispatch(setProjects(data.projects));

    return data;
  }
};

export const getProject = (projectId) => async (dispatch) => {
  const response = await fetch(`/api/projects/${projectId}`);

  const data = await response.json();
  dispatch(setProject(data));
};

export const getProjectRewards = (projectId) => async (dispatch) => {
  const response = await fetch(`/api/projects/${projectId}/rewards`);
  if (response.ok) {
    const data = await response.json();
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

  dispatch(setProject(projectId));
  dispatch(setProjectRewards(projectId));
};

export default function reducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case GET_PROJECTS:
      action.projects.forEach((project) => (newState[project.id] = project));

      return newState;
    case GET_PROJECT:
      return {
        ...state,
        [action.projectId]: action.project,
      };
    case GET_REWARDS:
      return {
        ...state,
        [action.projectId]: {
          ...state[action.projectId],
          rewards: action.rewards,
        },
      };
    case EDIT_REWARD:
      // Handle the editAReward action to update the specific reward in the state
      return {
        ...state,
        [action.projectId]: {
          ...state[action.projectId],
          rewards: state[action.projectId].rewards.map((reward) => {
            if (reward.id === action.rewardId) {
              // Update the specific reward with the edited data
              return {
                ...reward,
                // Update reward properties based on 'action.formData'
              };
            }
            return reward;
          }),
        },
      };
    default:
      return state;
  }
}
