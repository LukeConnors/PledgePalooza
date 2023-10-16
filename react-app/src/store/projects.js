const GET_PROJECTS = "projects/setProjects";
const SET_DETAILED_PROJECT = "projects/SET_DETAILED_PROJECT";

const setProjects = (projects) => ({
  type: GET_PROJECTS,
  projects,
});

export const setDetailedProject = (project) => ({
  type: SET_DETAILED_PROJECT,
  project,
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
  console.log("THIS IS THE FETCH DATA", data)
  dispatch(setDetailedProject(data));
};

export default function reducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case GET_PROJECTS:
      action.projects.forEach((project) => (newState[project.id] = project));

      return newState;
    case SET_DETAILED_PROJECT:
      return {
        ...state,
        detailedProject: action.project,
      };

    default:
      return state;
  }
}
