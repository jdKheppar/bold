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
  };
  type: string;
}

const hitBackend = async (data:any) => {
 
  const params = new URLSearchParams(data).toString();
  const fullUrl = `https://reseller.whitexdigital.com/api/login?${params}`;
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
  payload: { email, password },
}: UserData): SagaIterator {
  try {

    const response = yield call(loginApi, { email, password });
    console.log(response);
    let data = {
      email,
      password
    }
    //const response = hitBackend(data);
    //const response = yield call(hitBackend, data);
    if (response) {
       if (response.status === 200) {
        alert("202");
        console.log(response);
        const user = response.data;
       
        api.setLoggedInUser(user);
        setAuthorization(user["jwt_token"]);
        yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, user));
      }

    }
    console.log(response);
    yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, "Something Went Wrong"));
    api.setLoggedInUser(null);
    setAuthorization(null);

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
    yield call(logoutApi);
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
