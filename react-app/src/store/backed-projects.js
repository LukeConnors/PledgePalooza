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


export const fetchBackedProjects = () => async (dispatch) => {
    try {
        const response = await fetch('/api/users/current/backed-projects');
        if(response.ok){
            const data = await response.json();
            console.log('Fetched Data:', data);
            dispatch(getBackedProjects(data.backed_projects));
        } else {
            console.error("Failed to fetched user's backed projects")
        }
    } catch (error){
        console.error("An error occured while fetching backed projects")
    }
};

export const createBackedProject = (projectId, cost) => async (dispatch) => {
    try {
        const response = await fetch(`/api/projects/${projectId}/back`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( {cost} ),
            credentials: 'include'
        });
        if(response.ok){
            const data = await response.json();
            dispatch(addBackedProject(data))
        } else {
            console.error("Failed to back this project");
        }
        } catch(error){
            console.error("An error occured while creating a backed project:", error)
        }
};

const initialState = {
    backedProjects: [],
};

const backedProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BACKED_PROJECTS:
            return { ...state, backedProjects: action.projects };

        case ADD_BACKED_PROJECT:
            return { ...state, backedProjects: [...state.backedProjects, action.project] };

        default:
            return state;
    }
};

export default backedProjectReducer;
