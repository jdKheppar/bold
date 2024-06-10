import { APICore } from "./apiCore";

const api = new APICore();
//const baseUrl = "https://reseller.whitexdigital.com/api";
// account
function login(params: { username: string; password: string }) {
  //const loginUrl = "https://reseller.whitexdigital.com/api/login/";
  const baseUrl = "/login/";
  return api.create(`${baseUrl}`, params);
}

function logout() {
  const baseUrl = "/logout/";
  return api.create(`${baseUrl}`, {});
}

function signup(params: { fullname: string; email: string; password: string }) {
  const baseUrl = "/register/";
  return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: { username: string }) {
  const baseUrl = "/forget-password/";
  return api.create(`${baseUrl}`, params);
}

export { login, logout, signup, forgotPassword };
