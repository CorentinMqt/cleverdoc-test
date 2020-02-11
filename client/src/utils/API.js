import axios from "axios";
import * as dotenv from "dotenv";

const headers = {
  "Content-Type": "application/json"
};
dotenv.config();
const burl = "http://localhost:8800";

export default {
  login: function (email, password) {
    return axios.post(
      `${burl}/user/login`,
      {
        email,
        password
      },
      {
        headers: headers
      }
    );
  },
  signup: function (send) {
    return axios.post(`${burl}/user/signup`, send, { headers: headers });
  },

  isAuth: function () {
    return localStorage.getItem("token") !== null;
  },
  logout: function () {
    localStorage.clear();
  }
};