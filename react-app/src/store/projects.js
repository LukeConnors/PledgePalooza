const GET_PROJECTS = "projects/SET_PROJECTS";
const SET_USER_PROJECTS = "projects/SET_USER_PROJECTS"
const SET_DETAILED_PROJECT = "projects/SET_DETAILED_PROJECT";
const ADD_PROJECT = "projects/ADD_PROJECT"
const UPDATE_PROJECT = "projects/UPDATE_PROJECT"
const DELETE_PROJECT = "projects/DELETE_PROJECT"


const setProjects = (projects) => ({
  type: GET_PROJECTS,
  projects,
});

export const setUserProjects = (my_projects) => ({
  type: SET_USER_PROJECTS,
  my_projects
})

export const setDetailedProject = (project) => ({
  type: SET_DETAILED_PROJECT,
  project,
});

const addProject = (project) => ({
  type: ADD_PROJECT,
  payload: project
})

const updateProject = (project) => ({
  type: UPDATE_PROJECT,
  payload: project
})

const deleteProject = (projectId) => ({
  type: DELETE_PROJECT,
  payload: projectId
})

export const getProjects = () => async (dispatch) => {
  const response = await fetch("/api/projects/");

  if (response.ok) {
    const data = await response.json();

    dispatch(setProjects(data.projects));

    return data;
  }
};

export const getUserProjects = () => async (dispatch) => {
  const res = await fetch("/api/projects/my-projects");
  if (res.ok) {
    const data = await res.json();
    dispatch(setUserProjects(data.my_projects))
    return data
  }
}

export const getProject = (projectId) => async (dispatch) => {
  const response = await fetch(`/api/projects/${projectId}`);

  const data = await response.json();
  dispatch(setDetailedProject(data));
};

export const createProject = (payload) => async (dispatch) => {
  try {
    const res = await fetch("/api/projects/", {
      method: "POST",
      body: payload
    })
    if (res.ok) {
      const newProject = await res.json()
      dispatch(addProject(newProject))
      return newProject
    }
  } catch (e) {
    return e
  }
}

export const editProject = (projectId, payload) => async (dispatch) => {
  try {
    const res = await fetch(`/api/projects/${projectId}`, {
      method: "PUT",
      body: payload
    })
    if (res.ok) {
      const editedProject = await res.json();
      dispatch(updateProject(editedProject))
      return editedProject
    }
  } catch (e) {
    return e
  }
}

export const removeProject = (projectId) => async (dispatch) => {
  const res = await fetch(`/api/projects/${projectId}`, {
    method: "DELETE"
  })
  if (res.ok) {
    dispatch(deleteProject(projectId))
  }
}

export default function reducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case GET_PROJECTS:
      action.projects.forEach((project) => (newState[project.id] = project));
      return newState;
    case SET_USER_PROJECTS:
      newState = {
        ...state,
        userProjects: {}
      }
      action.my_projects.forEach((project) => (newState.userProjects[project.id] = project))
      return newState
    case ADD_PROJECT:
      const newProject = action.payload
      newState = { ...state }
      newState[newProject.id] = newProject
      return newState
    case UPDATE_PROJECT:
      const projectId = action.payload.id
      newState = { ...state }
      newState[projectId] = { ...state[projectId], ...action.payload }
      return newState
    case DELETE_PROJECT:
      const p_id = action.payload
      newState = {
        ...state,
        userProjects: { ...state.userProjects }
      }
      delete newState.userProjects[p_id]
      delete newState[p_id]
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
