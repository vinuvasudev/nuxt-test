export default {
  async index ({ commit, state }, params) {
    let response = null
    try {
      response = await this.$axios.get(
        `/${state.moduleSlug}`,
        {
          params: params,
        },
      )
    } catch (error) {
      console.error(error)

      return { response: null, error: error }
    }

    if (!response) {
      return { response: null, error: null }
    }

    commit('setData', response.data)
    return { response: response, error: null }
  },
  async show ({ commit, getters, state }, { id, refresh }) {
    const datum = getters.find(id)
    if (!refresh && datum) {
      return datum
    }

    let response = null
    try {
      response = await this.$axios.get(`/${state.moduleSlug}/${id}`)
    } catch (error) {
      console.error(error)

      return { response: null, error: error }
    }

    if (!response) {
      return { response: null, error: null }
    }

    commit('setDatum', response.data)

    return { response: response, error: null }
  },
}
