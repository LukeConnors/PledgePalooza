const GET_PROJECTS = "projects/setProjects";
const GET_PROJECT = "projects/setProject";

const setProjects = (projects) => ({
  type: GET_PROJECTS,
  projects,
});

export const setProject = (projectId) => ({
  type: GET_PROJECT,
  projectId,
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

    default:
      return state;
  }
}
