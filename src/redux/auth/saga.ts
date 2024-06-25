import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import axios from "axios";

// apicore
import { APICore, setAuthorization } from "../../helpers/api/apiCore";

// helpers
import {
  login as loginApi,
  logout as logoutApi,
  signup as signupApi,
  forgotPassword as forgotPasswordApi,
} from "../../helpers/";

// actions
import { authApiResponseSuccess, authApiResponseError } from "./actions";

// constants
import { AuthActionTypes } from "./constants";

interface UserData {
  payload: {
    username: string;
    password: string;
    fullname: string;
    email: string;
    otp: string;
  };
  type: string;
}

const verifyOTP = async (data: any) => {

  const params = new URLSearchParams(data).toString();
  const fullUrl = `https://reseller.whitexdigital.com/api/verify_otp?${params}`;
  // Configure Axios to follow redirects

  // Log the full URL
  console.log(fullUrl);
  try {
    let response = await axios.post(fullUrl);
    console.log(response);
    return response;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
}
const DirectLogin = async (data: any) => {

  const params = new URLSearchParams(data).toString();
  const fullUrl = `https://reseller.whitexdigital.com/api/login?${params}`;
  // Configure Axios to follow redirects

  // Log the full URL

  try {
    let response = await axios.post(fullUrl);
    return response;
    
  } catch (error) {
    console.error("API call error:", error);
    
    throw error;
  }
}
const realLogout = async () => {

  const fullUrl = "https://reseller.whitexdigital.com/api/logout";
  // Configure Axios to follow redirects

  // Log the full URL
  console.log(fullUrl);
  try {
    let response = await axios.post(fullUrl);
    console.log(response);
    return response;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
}
const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({
  payload: { email, otp, password },
}: UserData): SagaIterator {
  try {

    //const response = yield call(loginApi, { email, password });

    
    if(otp==""){
      let data = {
        email,
        password
      }
      const response = yield call(DirectLogin, data);
      if (response) {
        if (response.status === 200) {
          let user = response.data.user;
          let newUser = {
            id: user.id,
            username: user.name,
            role: "Admin",
            token: response.data.token
          }
          api.setLoggedInUser(newUser);
          setAuthorization(response.data.token);
          yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, newUser));
        }
  
      }
      else {
        yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, "Something Went Wrong"));
        api.setLoggedInUser(null);
        setAuthorization(null);
      }
    }
    
    else if(email==""){
      let data = {
        email,
        otp
      }
      const response = yield call(verifyOTP, data);
      if (response) {
        if (response.status === 200) {
          let user = response.data.user;
          let newUser = {
            id: user.id,
            username: user.name,
            role: "Admin",
            token: response.data.token
          }
          api.setLoggedInUser(newUser);
          setAuthorization(response.data.token);
          yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, newUser));
        }
  
      }
      else {
        yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, "Something Went Wrong"));
        api.setLoggedInUser(null);
        setAuthorization(null);
      }
    }
    



  } catch (error: any) {
    console.log("Iam real error", error);
    yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
    api.setLoggedInUser(null);
    setAuthorization(null);
  }
}


/**
 * Logout the user
 */
function* logout(): SagaIterator {
  try {
    console.log(axios.defaults.headers.common["Authorization"]);
    let response = yield call(realLogout);
    console.log(response);
    api.setLoggedInUser(null);
    setAuthorization(null);
    yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
  }
}

function* signup({
  payload: { fullname, email, password },
}: UserData): SagaIterator {
  try {
    const response = yield call(signupApi, { fullname, email, password });
    const user = response.data;
    // api.setLoggedInUser(user);
    // setAuthorization(user['token']);
    yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, user));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
    api.setLoggedInUser(null);
    setAuthorization(null);
  }
}

function* forgotPassword({ payload: { username } }: UserData): SagaIterator {
  try {
    const response = yield call(forgotPasswordApi, { username });
    yield put(
      authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data)
    );
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error));
  }
}
export function* watchLoginUser() {
  yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}


export function* watchLogout() {
  yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}

export function* watchSignup(): any {
  yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
}

export function* watchForgotPassword(): any {
  yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword);
}

function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchForgotPassword),
  ]);
}

export default authSaga;
