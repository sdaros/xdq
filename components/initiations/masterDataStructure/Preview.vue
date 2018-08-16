<template>
  <v-flex x12>
    <template v-if="!this.attributes">
      <v-container>
        <v-layout row align-center>
          <v-flex offset-xs1>
            <em class="grey--text">
              Master data structure file not yet uploaded!
            </em>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
    <template v-else>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="attributes"
        :pagination.sync="pagination"
        select-all
        item-key="id"
        class="elevation-1 data-table"
      >
        <template slot="headers" slot-scope="props">
          <tr>
            <th>
              <v-checkbox
                :input-value="props.all"
                :indeterminate="props.indeterminate"
                primary
                hide-details
                @click.native="toggleAll"
              ></v-checkbox>
            </th>
            <th
              v-for="header in props.headers"
              :key="header.text"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.value)"
            >
              <v-icon small>arrow_upward</v-icon>
              {{ header.text }}
            </th>
          </tr>
        </template>
        <template slot="items" slot-scope="props">
          <tr
            :active="props.selected"
            @click="props.selected = !props.selected"
          >
            <td>
              <v-checkbox
                :input-value="props.selected"
                primary
                hide-details
              ></v-checkbox>
            </td>
            <td class="text-xs-center">{{ props.item.label }}</td>
            <td class="text-xs-center">{{ props.item.type }}</td>
            <td class="text-xs-center">{{ props.item.maximumLength }}</td>
            <td class="text-xs-center">{{ props.item.examples }}</td>
          </tr>
        </template>
      </v-data-table>
    </template>
  </v-flex>
</template>

<script>
export default {
  props: {
    structure: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      pagination: {
        sortBy: 'label'
      },
      selected: [],
      loading: false
    }
  },
  computed: {
    attributes: function () {
      return JSON.parse(this.structure)
    },
    headers: function () {
      if (this.attributes != null && this.attributes.length > 0) {
        let result = []
        let attributes = Object.keys(this.attributes[0])
        for (let i = 0; i < attributes.length; i++) {
          result.push(
            { text: attributes[i].charAt(0).toUpperCase() + attributes[i].substr(1),
              value: i
            }
          )
        }
        return result
      }
      return []
    }
  },
  methods: {
    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.attributes.slice()
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    }
  }

}
</script>
