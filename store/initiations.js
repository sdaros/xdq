import gql from 'graphql-tag'
import fetch from 'node-fetch'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import axios from 'axios'

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjj8kjteb6cj40134jhy7vra6',
  fetch: fetch
})
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})
const allInitiationsQuery = gql`
query {
  allInitiations {
    id
    dataSupplierMasterDataStructure
    dataConsumerMasterDataStructure
    dataQualityProject {
      id
      name
      dataSupplier {
        id
        name
        email
        phoneNumber
      }
      dataConsumer {
        id
        name
        email
        phoneNumber
      }
    }
  }
}`

export const state = () => ({
  all: []
})

export const mutations = {
  mergeFromDb (state, initiations) {
    state.all = initiations.all
  }
}

export const actions = {
  async init ({ commit }) {
    try {
      const result = await client.query({query: allInitiationsQuery})
      commit(
        'mergeFromDb',
        {
          all:
            result.data.allInitiations.map(initiation => ({
              id: initiation.id,
              name: initiation.dataQualityProject.name,
              dataQualityProjectId: initiation.dataQualityProject.id,
              dataSupplier: {
                ...initiation.dataQualityProject.dataSupplier,
                masterDataStructure: initiation.dataSupplierMasterDataStructure
              },
              dataConsumer: {
                ...initiation.dataQualityProject.dataConsumer,
                masterDataStructure: initiation.dataConsumerMasterDataStructure
              }
            }))
        }
      )
    } catch (e) {
      console.log(e)
    }
  },
  async uploadMasterDataStructureFile ({ commit }, { event, initiationId }) {
    const form = new FormData()
    const cookie = /auth\._token\.local=Bearer%20[^ ]+/.exec(document.cookie)
    const token = cookie[0].split('=').slice(1).join('').substr(9)
    form.append('mdData', event.target.files[0], event.target.files[0].name)
    try {
      await axios.post(
        `http://localhost:3000/api/initiations/${initiationId}/` +
          `organizations/${this.$auth.user.organization}/masterDataStructure`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
    } catch (e) {
      console.log(e)
    }
    window.location.reload(true)
  }
}
