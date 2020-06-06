<template>

    <b-container fluid>
        <b-row>
          <b-col class="text-left">
            <h3>
              Post comments
            </h3>
          </b-col>
        </b-row>
      <b-row>
        <b-col lg="6" class="my-1">
          <b-form-group
            label="Search"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Type to Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card class="table-responsive w-100">
            <b-table class="table table-hover"
                     :filter="filter"
                     :items="data"
                     @filtered="onFiltered">
            </b-table>
          </b-card>
        </b-col>
      </b-row>
      <nuxt-child/>
    </b-container>
</template>
<script>
  import { createNamespacedHelpers } from 'vuex'

  const parentModuleName = 'posts'
  const parentModuleSlug = 'posts'
  const moduleName = 'comment'
  const moduleSlug = 'comments'
  const { mapActions, mapGetters, mapState } = createNamespacedHelpers(moduleName)

  export default {
    computed: {
      ...mapState(['data', 'meta']),
    },
    methods: {
      ...mapActions(['index']),
      async search () {
        return await this.index(this.meta)
      },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    },
    data () {
      return {
        parentModuleName: parentModuleName,
        parentModuleSlug: parentModuleSlug,
        moduleName: moduleName,
        moduleSlug: moduleSlug,
        filter: null,
        filterOn: [],
      }
    },
    async fetch ({ redirect, route, store }) {
      await store.dispatch(`${moduleName}/index`)
    },
  }
</script>
