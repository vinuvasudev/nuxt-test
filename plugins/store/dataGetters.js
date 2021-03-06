import _ from 'lodash'

export default {
  findIndex: (state) => (id, key = 'id') => {
    return state.data.findIndex(datum => datum[key] === id)
  },
  find: (state) => (id, key = 'id') => {
    return state.data.find(datum => datum[key] === id)
  },
  findGet: (state) => (id, path, defaultValue, key = 'id') => {
    const datum = state.content.find(datum => datum[key] === id)
    if (!datum) {
      return null
    }

    return _.get(datum, path, defaultValue)
  },
}
