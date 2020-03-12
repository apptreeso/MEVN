import axios from "axios";
import router from "../router";

const state = {
  token: localStorage.getItem("token") || "",
  user: {},
  status: ""
};

const getters = {
  isLoggedIn: state => !!state.token,
  authState: state => state.state,
  user: state => state.user
};

const actions = {
  async login({ commit }, user) {
    commit("auto_request");
    let res = await axios.post("http://localhost:5000/api/users/login", user);
    if (res.data.success) {
      const token = res.data.token;
      const user = res.data.user;

      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = token;
      commit("auth_success", token, user);
    }
    return res;
  },
  async register({ commit }, userData) {
    commit("register_request");
    let res = await axios.post(
      "http://localhost:5000/api/users/register",
      userData
    );
    if (res.data.success) {
      commit("register_success");
    }
    return res;
  },
  async logout({ commit }) {
    await localStorage.removeItem("token");
    commit("logout");
    delete axios.defaults.headers.common["Authorization"];
    router.push("/login");
    return;
  }
};

const mutations = {
  auto_request(state) {
    state.status = "loading";
  },
  auth_success(state, token, user) {
    state.status = "success";
    state.token = token;
    state.user = user;
  },
  register_request(state) {
    state.status = "loading";
  },
  register_success(state) {
    state.status = "success";
  },
  logout(state) {
    state.status = "";
    state.token = "";
    state.user = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
