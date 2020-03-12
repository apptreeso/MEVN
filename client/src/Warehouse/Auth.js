import axios from "axios";
// import router from "../router";

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
    console.log(user);
    let res = await axios.post("http://localhost:5000/api/users/login", user);
    if (res.data.success) {
      const token = res.data.token;
      const user = res.data.user;

      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = token;
      commit("auth_success", token, user);
    }
    return res;
  }
};

const mutations = {
  auto_request(state) {
    state.status = "loading";
  },
  auto_succes(state, token, user) {
    state.status = "success";
    state.token = token;
    state.user = user;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
