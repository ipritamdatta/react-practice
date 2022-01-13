import { ActionTypes } from '../contants/action-types';

const initialState = {
    user:[]
}

export const changeIsAuthenticated = (state=initialState, {type, payload}) => {
    switch(type)
    {
        case ActionTypes.SET_USER: {
            return {
                ...state,
                user: payload
            };
        };
        case ActionTypes.REMOVE_USER: {
            return {
                ...state,
                user: []
            }
        }
        default: 
            return state;
    }
}

const roleState = {
    roleState: []
};
export const roleReducer = (state=roleState, {type, payload}) => {
    switch(type)
    {
        case ActionTypes.SET_ROLE_PERMISSION: {
            return {
                ...state,
                roleState: payload
            }
        }
        case ActionTypes.REMOVE_ROLE_PERMISSION: {
            return {
                ...state, roleState: []
            }
        }
        default: 
            return state;
    }
}