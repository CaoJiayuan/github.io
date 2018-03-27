const state = {
  top: {
    min: false
  }
};

const getters = {
  topMin: state => state.top.min
};

const actions = {
};

const mutations = {
  minTop(state, min){
    state.top.min = min;
  }
};


export default {
  state,
  getters,
  actions,
  mutations
}
