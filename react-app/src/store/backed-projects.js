const GET_BACKED_PROJECTS = "backed_project/GET_BACKED_PROJECTS"
const ADD_BACKED_PROJECT = "backed_project/ADD_BACKED_PROJECT"


const getBackedProjects = (projects) => ({
    type: GET_BACKED_PROJECTS,
    projects
})

const addBackedProject = (project) => ({
    type: ADD_BACKED_PROJECT,
    project
})