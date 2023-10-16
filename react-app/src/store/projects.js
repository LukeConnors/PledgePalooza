const GET_PROJECTS = "projects/setProjects";
const SET_DETAILED_PROJECT = "projects/SET_DETAILED_PROJECT";
const ADD_PROJECT = "projects/ADD_PROJECT"


const setProjects = (projects) => ({
  type: GET_PROJECTS,
  projects,
});

export const setDetailedProject = (project) => ({
  type: SET_DETAILED_PROJECT,
  project,
});

const addProject = (project) => ({
  type: ADD_PROJECT,
  payload: project
})

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

export const createProject = (payload) => async (dispatch) => {
  try {
    console.log('THIS IS THE PAYLOAD!', payload)
    const res = await fetch("/api/projects/", {
      method: "POST",
      body: payload
    })
    console.log("THIS IS THE RES", res)
    if (res.ok) {
      const newProject = await res.json()
      dispatch(addProject(newProject))
      return newProject
    }
  } catch (e) {
    return e
  }
}

export default function reducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case GET_PROJECTS:
      action.projects.forEach((project) => (newState[project.id] = project));
      return newState;
    case ADD_PROJECT:
      const newProject = action.payload
      newState = { ...state }
      newState[newProject.id] = newProject
      return newState
    case SET_DETAILED_PROJECT:
      return {
        ...state,
        detailedProject: action.project,
      };

    default:
      return state;
  }
}
