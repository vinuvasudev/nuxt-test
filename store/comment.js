import getActions from '../plugins/store/getActions'
import dataGetters from '../plugins/store/dataGetters'
import dataMutations from '../plugins/store/dataMutations'

const moduleName = 'comments'
const moduleSlug = 'comments'

export default {
  actions: {
    ...getActions,
  },
  mutations: {
    ...dataMutations,
  },
  getters: {
    ...dataGetters,
  },
  state () {
    return {
      data: [],
      meta: {},
      moduleName: moduleName,
      moduleSlug: moduleSlug,
    }
  },
}
