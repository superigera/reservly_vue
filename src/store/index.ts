// store.js or store/index.js
function initialState() {
  return {
    memberInfo: null
  };
}
import { createStore } from 'vuex';

export default createStore({
  state: {
    memberInfo: null
  },
  getters: {
    getMemberInfo: state => state.memberInfo
  },
  mutations: {
    setMemberInfo(state, payload) {
      state.memberInfo = payload;
    },
    resetState(state) {
      Object.assign(state, initialState());
    }
  }
});
