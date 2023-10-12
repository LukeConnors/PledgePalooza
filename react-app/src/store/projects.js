const GET_PROJECTS = "projects/setProjects";

export const projectSelector = (state) => ({
  projects: state.projects,
});

const setProjects = (projects) => ({
  type: GET_PROJECTS,
  projects,
});

export const getProjects = () => async (dispatch) => {
  const response = await fetch("/api/projects/");

  if (response.ok) {
    const data = await response.json();

    dispatch(setProjects(data.projects));

    return data;
  }
};

export default function reducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case GET_PROJECTS:
      action.projects.forEach((project) => (newState[project.id] = project));

      return newState;
    default:
      return state;
  }
}
