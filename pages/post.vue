<template>
  <b-container fluid>
    <div class="dashboard-heading">
      <b-row>
        <b-col class="text-left">
          <h3>
            Post
          </h3>
        </b-col>
      </b-row>
    </div>
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
                   :fields="fields"
                   :items="data"
                   @filtered="onFiltered">
            <template v-slot:cell(actions)="row">
              <b-link :to="`/${moduleSlug}/${row.item.id}/comment`">Comments</b-link>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
    <nuxt-child/>
  </b-container>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'

  const moduleName = 'post'
  const moduleSlug = 'post'
  const { mapActions, mapGetters, mapState } = createNamespacedHelpers(moduleName)

  export default {
    computed: {
      ...mapState(['data', 'meta'])
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
        moduleName: moduleName,
        moduleSlug: moduleSlug,
        filter: null,
        filterOn: [],
        fields: [
          { key: 'id', label: 'ID', sortable: true, sortDirection: 'desc' },
          { key: 'title', label: 'Title', sortable: true, sortDirection: 'desc' },
          { key: 'body', label: 'Body', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' }
      ],
      }
    },
    async fetch ({ redirect, route, store }) {
      await Promise.all(
        [
          store.dispatch(`${moduleName}/index`)
        ]
      )
    }
  }
</script>
