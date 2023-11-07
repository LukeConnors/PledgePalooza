const GET_LIKES = "like/GET_LIKES"
const ADD_LIKE = "like/ADD_LIKE"
const REMOVE_LIKE = "like/REMOVE_LIKE"
const GET_PROJECT_LIKE_STATUS = "like/GET_PROJECT_LIKE_STATUS";

const getLikes = (likes) => ({
    type: GET_LIKES,
    likes
})

const addLike = (like) => ({
    type: ADD_LIKE,
    like
})

const removeLike = (like) => ({
    type: REMOVE_LIKE,
    like
})

const getProjectLikeStatus = (projectId, status) => ({
    type: GET_PROJECT_LIKE_STATUS,
    projectId,
    status
});

export const loadMyLikes = () => async (dispatch) => {
    const response = await fetch('/api/projects/my-likes');
    if(response.ok){
        const data = await response.json();
        const likedProjectIds = data.my_likes.map(like => like.projectId);

        // Fetch the details of the liked projects
        const likedProjectsDetails = await Promise.all(
            likedProjectIds.map(projectId =>
                fetch(`/api/projects/${projectId}`).then(res => res.json())
            )
        );

        dispatch(getLikes(likedProjectIds));
        return likedProjectsDetails;
    } else {
        console.error("Failed to fetch user's likes");
    }
}

export const loadProjectLikeStatus = (projectId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}/like-status`); // Adjust the endpoint as needed
    if(response.ok){
        const { likeStatus } = await response.json(); // Expecting the response to contain { likeStatus: true/false }
        dispatch(getProjectLikeStatus(projectId, likeStatus));
    } else {
        console.error("Failed to fetch like status for the project");
    }
}

export const createLike = (like, projectId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}/likes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(like)
    })
    if(response.ok){
        const createdLike = await response.json()
        dispatch(addLike(createdLike))
        return createdLike
    } else {
        console.error(response, "Failed to like this project")
    }
}

export const deleteLike = (likeId, projectId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}/likes`, {
        method: 'DELETE',
    });

    if(response.ok){
        const data = await response.json();
        dispatch(removeLike(data.likeId));
    } else {
        console.error('Failed to unlike project')
    }
}

export const likesReducer = (state = {}, action) => {
    let newState = {};
    switch(action.type){
        case GET_LIKES:
            action.likes.forEach((like) => {
                newState[like.id] = like
            })
            return newState;
        case GET_PROJECT_LIKE_STATUS:
            return {
                ...state,
                [action.projectId]: action.status
            };
        case ADD_LIKE:
            const newLike = action.like
            newState = {...state}
            newState[newLike.id] = newLike
            return newState;
        case REMOVE_LIKE:
            newState = { ...state };
            delete newState[action.like];
            return newState;
        default:
            return state
    }
}

export default likesReducer
