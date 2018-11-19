import firebase from "firebase";
import axios from 'axios';
import { bestBuyKey } from '../../assets/constants';
import { fbKey, androidID, iosID } from "../../assets/constants";

// Initial state
const initialState = {
  auth: false,
  loggingIn: false,
  user: '',
  error: null
};

//Actions
const REQUEST_LOGIN = 'REQUEST_LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';
const LOGOUT = 'LOGOUT';

//Action creators
export const requestLogin = () => ({
  type: REQUEST_LOGIN
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  user: user
});

export const loginFail = () => ({
  type: LOGIN_FAIL
});

export const logout = () => ({
  type: LOGOUT
});

export const login = () => {
  //testing data for validation
  const correctEmail = "a";
  const correctPassword = "a";

  return dispatch => {
    dispatch(requestLogin());
    dispatch(loginSuccess({ test: 'user' }));
  }
};

// export const loginWithFacebook = (dispatch) => {


//   return dispatch => {
    
//     dispatch(requestLogin());
//     // const { navigate } = this.props.navigation;
//     let { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
//       fbKey,
//       { permissions: ["public_profile"] }
//     );
//     if (type == "success") {
//       const credential = firebase.auth.FacebookAuthProvider.credential(token);

//       firebase
//         .auth()
//         .signInWithCredential(credential)
//         .then(user => {
//           console.log(user)
//           // dispatch(loginSuccess(user));
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     }
//   }
// }

//Reducer
export default function UserStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    // return state
    //   .set('loggingIn', true);

    case LOGIN_SUCCESS:
      return {
        ...state,
        auth: true,
        loggingIn: false,
        user: action.user
      };
    // return state
    //   .set('auth', true)
    //   .set('loggingIn', false)
    //   .set('user', action.user);

    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false
      };

    case LOGOUT:
      return initialState

    default:
      return state;
  }
}