import _ from 'lodash'

export default {
  findIndex: (state) => (id, key = 'id') => {
    return state.data.findIndex(datum => datum[key] === id)
  },
  find: (state) => (id, key = 'id') => {
    return state.data.find(datum => datum[key] === id)
  },
}
