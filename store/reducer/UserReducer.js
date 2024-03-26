const initialState = {
    user: {}, 
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.value
            };
        default:
            return state;
    }
}

export default userReducer;
