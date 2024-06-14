// import axios from "axios";
// import MockAdapter from "axios-mock-adapter";

// interface UserData {
//   id: number;
//   username: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   role: string;
//   token: string;
// }

// var mock = new MockAdapter(axios);

// export function configureFakeBackend() {
//   let users: UserData[] = [
//     {
//       id: 1,
//       username: "test",
//       password: "test",
//       firstName: "Test",
//       lastName: "User",
//       role: "Admin",
//       token:
//         "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI",
//     },
//   ];

//   mock.onPost("/login/").reply(function (config) {
//     return new Promise(function (resolve, reject) {
//       setTimeout(function () {
//         // get parameters from post request
//         let params = JSON.parse(config.data);

//         // find if any user matches login credentials
//         let filteredUsers = users.filter((user) => {
//           return (
//             user.username === params.username &&
//             user.password === params.password
//           );
//         });

//         if (filteredUsers.length) {
//           // if login details are valid return user details and fake jwt token
//           let user = filteredUsers[0];
//           resolve([200, user]);
//         } else {
//           // else return error
//           resolve([401, { message: "Username or password is incorrect" }]);
//         }
//       }, 1000);
//     });
//   });

//   mock.onPost("/register/").reply(function (config) {
//     return new Promise(function (resolve, reject) {
//       setTimeout(function () {
//         // get parameters from post request
//         let params = JSON.parse(config.data);

//         // add new users
//         let [firstName, lastName] = params.fullname.split(" ");
//         let newUser: UserData = {
//           id: users.length + 1,
//           username: firstName,
//           password: params.password,
//           firstName: firstName,
//           lastName: lastName,
//           role: "Admin",
//           token:
//             "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI",
//         };
//         users.push(newUser);

//         resolve([200, newUser]);
//       }, 1000);
//     });
//   });

//   mock.onPost("/forget-password/").reply(function (config) {
//     return new Promise(function (resolve, reject) {
//       setTimeout(function () {
//         // get parameters from post request
//         let params = JSON.parse(config.data);

//         // find if any user matches login credentials
//         let filteredUsers = users.filter((user) => {
//           return user.username === params.username;
//         });

//         if (filteredUsers.length) {
//           // if login details are valid return user details and fake jwt token
//           let responseJson = {
//             message:
//               "We've sent you a link to reset password to your registered email.",
//           };
//           resolve([200, responseJson]);
//         } else {
//           // else return error
//           resolve([
//             401,
//             {
//               message:
//                 "Sorry, we could not find any registered user with entered username",
//             },
//           ]);
//         }
//       }, 1000);
//     });
//   });
// }

export {}


//fake api response

// {
//   "status": 200,
//   "data": {
//       "id": 1,
//       "username": "test",
//       "password": "test",
//       "firstName": "Test",
//       "lastName": "User",
//       "role": "Admin",
//       "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI"
//   },
//   "config": {
//       "url": "/login/",
//       "method": "post",
//       "data": "{\"password\":\"test\"}",
//       "headers": {
//           "Accept": "application/json, text/plain, */*",
//           "Content-Type": "application/json"
//       },
//       "baseURL": "https://reseller.whitexdigital.com/api",
//       "transformRequest": [
//           null
//       ],
//       "transformResponse": [
//           null
//       ],
//       "timeout": 0,
//       "xsrfCookieName": "XSRF-TOKEN",
//       "xsrfHeaderName": "X-XSRF-TOKEN",
//       "maxContentLength": -1,
//       "maxBodyLength": -1,
//       "transitional": {
//           "silentJSONParsing": true,
//           "forcedJSONParsing": true,
//           "clarifyTimeoutError": false
//       }
//   },
//   "request": {
//       "responseURL": "/login/"
//   }
// }


//actual api response

// {
//   "status": 202,
//   "message": "Login Successfully...",
//   "user": {
//       "id": 1,
//       "name": "hello",
//       "email": "asdasd@asd.asd",
//       "email_verified_at": null,
//       "jwt_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Rlc3Qud2hpdGV4ZGlnaXRhbC5jb20vYXBpL3YxMDAvbG9naW4iLCJpYXQiOjE3MTgxMTI5MzQsIm5iZiI6MTcxODExMjkzNCwianRpIjoiMjZHdnNYalZleGZlaVpCMSIsInN1YiI6IjEyIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyIsImlkIjoxMiwibmFtZSI6bnVsbCwiZW1haWwiOiJhc2Rhc2RAYXNkLmFzZCIsImNyZWF0ZWRfYXQiOiIyMDI0LTA2LTExVDA0OjU0OjA5LjAwMDAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wNi0xMVQwNTozNToxNS4wMDAwMDBaIn0.JQ3IhGit2ApjyNAjwwMeiRdT_BvD2DqVN2zmGkQSZAA",
//       "jwt_password": "eyJpdiI6Ik92bkJnVjdzamVlUmd3RlUxWUxYOXc9PSIsInZhbHVlIjoibU5qQjZZVjJ3d1llMUp1QTcrZW9kTnk4MnV1Yk5UdnpZWklFUWJSTnU2ND0iLCJtYWMiOiIwMjBkMThkNzcyMGI5MDUxMTBkMTgwZWM3Zjc0NTdiOTNlZTllZDVjNGI4NzQzOGJhM2E5MjQ5NGI0OWZkZjEyIiwidGFnIjoiIn0=",
//       "created_at": "2024-06-11T13:29:58.000000Z",
//       "updated_at": "2024-06-11T13:35:34.000000Z"
//   },
//   "token": "25|GdsWSHzNZaUl8HmNNQiNgLTiA3c5nCmuIKAHOCGe85973465"
// }