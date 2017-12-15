import axios from 'axios';

import {push} from 'react-router-redux';
import {AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_USERS} from './types'

//require('axios-debug')(axios);
const ROOT_URL = 'http://localhost:8000';




export function authError(error) {

    return {
        type: AUTH_ERROR,
        payload: error
    }

}

export function signInUser(fields) {

    return function (dispatch) {

        const { email, password, rememberMe }= fields;

        console.log(email, password, rememberMe)


        let data = {
            "email": email,
            "password": password
           };


        axios.post(`${ROOT_URL}/login`, data)
            .then(response => {
                // If request is good...
                // - Update state to indicate user is authenticated
                console.log(response)
                dispatch({
                    type: AUTH_USER
                });
                ///save the jwt token
              
                localStorage.setItem('token', response.data.refreshToken);
                localStorage.setItem('profile', JSON.stringify(response.data.user));
                console.log(response.data.user)
                
                
                //redirect to retstricted area by dispatch push
                dispatch(push("/"));

            }).catch((error ) => {
             dispatch(authError('Bed login'))
            console.log(error)
             if (error.response.status === 400) {
                console.log(error.response.data)
             };
            });


    }

}

export function signoutUser() {

    
    if(localStorage.getItem('token')){
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
    }
  
   
    return {type: UNAUTH_USER}
}





