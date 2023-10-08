// store.js or store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    memberInfo: null
  },
  mutations: {
    setMemberInfo(state, payload) {
      state.memberInfo = payload;
    }
  }
});
