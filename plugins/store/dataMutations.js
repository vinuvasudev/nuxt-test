import Vue from 'vue'

export default {
  setData (state, data) {
    state.data = data
  },
  setDatum (state, data, key = 'id') {
    const index = state.data.findIndex(datum => datum[key] === data[key])
    if (0 > index) {
      // Not found
      state.data.unshift(data)

      return
    }
    Vue.set(state.data, index, data)
  },
}
