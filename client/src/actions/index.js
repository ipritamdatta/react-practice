import jwt_decode from 'jwt-decode'
import { ActionTypes } from "../contants/action-types"

// export const userRole = () => async (dispatch) => {
    
//     const response = await fetch(`http://localhost:1337/api/get-role`,{
//         headers: {
//             'x-access-token' : localStorage.getItem('token')
//         }
//     })

//     const data = await response.json();

//     dispatch({
//         type: ActionTypes.SET_ROLE,
//         payload: data
//     })
// }

// with redux thunk
export const userRole = () => {
    return async function (dispatch, getState) {
        const response = await fetch(`http://localhost:1337/api/get-role`, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })

        const data = await response.json();

        dispatch({
            type: ActionTypes.SET_ROLE_PERMISSION,
            payload: data
        })
    }
}

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const user = jwt_decode(token);

    return {
        type:  ActionTypes.SET_USER,
        payload: {
            userName: user.name,
            userEmail: user.email
        }
    }
}

export const removeUser = () => {
    return {
        type: ActionTypes.REMOVE_USER
    }
}

export const removeRolePermission = () => {
    return {
        type: ActionTypes.REMOVE_ROLE_PERMISSION
    }
}