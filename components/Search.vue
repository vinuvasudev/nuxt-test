<template>
  <b-card class="mb-3">
    <b-form @submit.prevent="search" method="GET">
      <b-form-row>
        <b-col md="3">
          <b-form-group label="Search" label-for="search-card-search">
            <b-form-input id="search-card-search" type="text" v-model="meta.search"/>
          </b-form-group>
        </b-col>
        <b-col md="3" sm="4">
          <b-form-group label="Sort" label-for="search-card-sort">
            <b-form-select id="search-card-sort" v-model="meta.sort" name="sort">
              <option value="updatedAt,desc">Updated (New–Old)</option>
              <option value="updatedAt">Updated (Old–New)</option>
              <option value="createdAt,desc">Created (New–Old)</option>
              <option value="createdAt">Created (Old–New)</option>
              <option value="name">Name</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="2" sm="4">
          <b-form-group label="Page" label-for="search-card-page">
            <b-form-select id="search-card-page" v-model="meta.page">
              <option :key="number" v-for="number in meta.totalPages" :value="number - 1">{{ number }}</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6" md="2" sm="4">
          <b-form-group label="per page" label-for="search-card-page_size">
            <b-form-select id="search-card-page_size" v-model="meta.size">
              <option :key="page_size" v-for="page_size in [10, 25, 50, 100]" v-model="meta.size">
                {{ page_size }}
              </option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col class="d-flex align-items-stretch">
          <b-button class="btn-block mb-3 text-uppercase" type="submit" variant="primary">
            <font-awesome-icon fixed-width icon="search"/>
          </b-button>
        </b-col>
        <b-col class="text-center" v-if="exportUrl">
          <b-button :href="exportFullUrl" class="mb-3 mx-auto text-uppercase" target="_blank" variant="primary">
            <font-awesome-icon fixed-width icon="download"/>
            Export to CSV
          </b-button>
        </b-col>
      </b-form-row>
    </b-form>
  </b-card>
</template>

<script>
  import qs from 'qs'

  export default {
    name: 'Search',
    computed: {
      exportFullUrl: {
        get () {
          const metaParams = qs.stringify({ ...this.meta })
          return `${this.exportUrl}?${metaParams}`
        },
        set (value) {
          //
        },
      },
    },
    props: ['exportUrl', 'meta'],
    methods: {
      search () {
        this.$emit('search')
      },
    },
  }
</script>
