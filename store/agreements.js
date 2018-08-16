import gql from 'graphql-tag'
import fetch from 'node-fetch'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import Vue from 'vue'
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
const agreementFullQuery = gql`
  query Agreement($agreementId: ID!) {
    Agreement(
      id: $agreementId
    )
    { id
      createdAt
      updatedAt
      revisionTag
      dataQualityProject {
        id
        name
        dataSupplier {
          id
          name
          members {
            name
          }
        }
        dataConsumer { id name }
      }
      progress {
        id
        dataConsumer
        dataSupplier
      }
      matches {
        matchCode
        matchWanted
        dataConsumerAttribute {
          id
          label
          type
          maximumLength
          examples
        }
        dataSupplierAttribute {
          id
          label
          type
          maximumLength
          examples
        }
      }
    }
  }
`
const agreementQuery = gql`
  query Agreement($agreementId: ID!) {
    Agreement(
      id: $agreementId
    )
    { id
      dataQualityProject {
        id
        name
        dataSupplier { id name }
        dataConsumer { id name }
      }
      progress {
        id
        dataConsumer
        dataSupplier
      }
      matches {
        matchCode
        matchWanted
        dataConsumerAttribute {
          id
          label
          type
          maximumLength
          examples
        }
        dataSupplierAttribute {
          id
          label
          type
          maximumLength
          examples
        }
      }
    }
  }
`
const getAgreementProgressQuery = gql`
  query AgreementProgress($id: ID!) {
    AgreementProgress(
      id: $id
    )
    {
      id
      dataConsumer
      dataSupplier
    }
  }
`
const updateAgreementProgressDataSupplierMutation = gql`
  mutation updateAgreementProgress($id: ID!, $dataSupplier: Int) {
    updateAgreementProgress(
      id: $id
      dataSupplier: $dataSupplier,
    )
    {
      id
      dataConsumer
      dataSupplier
    }
  }
`
const updateAgreementProgressDataConsumerMutation = gql`
  mutation updateAgreementProgress($id: ID!, $dataConsumer: Int) {
    updateAgreementProgress(
      id: $id
      dataConsumer: $dataConsumer,
    )
    {
      id
      dataConsumer
      dataSupplier
    }
  }
`

const allAgreementsQuery = gql`
  query {
    allAgreements {
      id
      revision
      revisionTag
      dataConsumerAttributes {
        id
        label
        type
        maximumLength
        examples
      }
      dataSupplierAttributes {
        id
        label
        type
        maximumLength
        examples
      }
      dataQualityProject {
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
  all: [],
  lastInsertId: '',
  dataSupplierAttributes: [],
  dataConsumerAttributes: [],
  matchesWanted: [],
  matchCodes: [],
  showChatIndex: -1,
  progress: {
    dataSupplier: 1,
    dataConsumer: 1
  },
  messages: [
    {
      id: 1533751850412,
      author: 'Peter',
      dataRole: 'dataSupplier',
      body: 'Donec hendrerit tempor tellus.',
      postDate: 1533751850447
    },
    {
      id: 1533751850447,
      author: 'Klaus',
      dataRole: 'dataConsumer',
      body: 'Nam euismod tellus id erat.',
      postDate: 1533751850447
    }
  ]
})

export const mutations = {
  mergeFromDb (state, initiations) {
    state.all = initiations.all
  },
  appendMessage (state, message) {
    state.messages.push(message)
  },
  setDataSupplierProgress (state, step) {
    state.progress.dataSupplier = step
  },
  setDataConsumerProgress (state, step) {
    state.progress.dataConsumer = step
  },
  setLastInsertId (state, id) {
    state.lastInsertId = id
  },
  setDataSupplierAttributes (state, value) {
    state.dataSupplierAttributes = value
  },
  setDataConsumerAttributes (state, value) {
    state.dataConsumerAttributes = value
  },
  toggleMatchWanted (state, value) {
    Vue.set(state.matchesWanted, value, !state.matchesWanted[value])
  },
  setMatchesWanted (state, value) {
    state.matchesWanted = value
  },
  setShowChatIndex (state, value) {
    state.showChatIndex = value
  },
  setMatchCodes (state, value) {
    state.matchCodes = value
  },
  addAgreement (state, agreement) {
    state[agreement.id] = agreement
  }
}

export const actions = {
  async init ({ commit }) {
    try {
      const result = await client.query({query: allAgreementsQuery})
      commit(
        'mergeFromDb',
        {
          all:
            result.data.allAgreements.map(agreement => ({
              ...agreement
            }))
        }
      )
    } catch (e) {
      console.log(e)
    }
  },
  async updateDataSupplierProgress ({ commit }, { progress, agreementProgressId }) {
    try {
      const result = await client.mutate(
        {
          mutation: updateAgreementProgressDataSupplierMutation,
          variables: {
            id: agreementProgressId,
            dataSupplier: progress
          }
        }
      )
      commit(
        'setDataSupplierProgress',
        result.data.updateAgreementProgress.dataSupplier
      )
    } catch (e) {
      console.log(e)
    }
  },
  async updateMatchings ({ commit }, agreement) {
    const cookie = /auth\._token\.local=Bearer%20[^ ]+/.exec(document.cookie)
    const token = cookie[0].split('=').slice(1).join('').substr(9)
    console.log('state:' + agreement)
    await axios.post(`/api/agreements/${agreement.id}/matches`,
      {
        agreementId: agreement.id,
        matchCodes: agreement.matchCodes,
        dataConsumerAttributes: agreement.dataConsumerAttributes,
        dataSupplierAttributes: agreement.dataSupplierAttributes,
        matchesWanted: agreement.matchesWanted
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  },
  async initProgress ({ commit }, id) {
    try {
      const result = await client.query(
        {
          query: getAgreementProgressQuery,
          variables: {
            id: id
          }
        }
      )
      commit(
        'setDataConsumerProgress',
        result.data.AgreementProgress.dataConsumer
      )
      commit(
        'setDataSupplierProgress',
        result.data.AgreementProgress.dataSupplier
      )
    } catch (e) {
      console.log(e)
    }
  },
  async updateDataConsumerProgress ({ commit }, { progress, agreementProgressId }) {
    try {
      const result = await client.mutate(
        {
          mutation: updateAgreementProgressDataConsumerMutation,
          variables: {
            id: agreementProgressId,
            dataConsumer: progress
          }
        }
      )
      commit(
        'setDataConsumerProgress',
        result.data.updateAgreementProgress.dataConsumer
      )
    } catch (e) {
      console.log(e)
    }
  },
  async generateDataQualityAgreement ({ commit }, id) {
    let result = {foo: 'bar'}
    try {
      const fetched = await client.query(
        {
          query: agreementFullQuery,
          variables: {agreementId: id}
        }
      )
      let agreement = fetched.data.Agreement
      result = {
        projectSpecifics: {
          projectName: agreement.dataQualityProject.name,
          initiator: {
            user: agreement.dataQualityProject.dataSupplier.members[0].name,
            organization: agreement.dataQualityProject.dataSupplier.name
          },
          documentInformation: {
            type: 'Data Quality Agreement',
            xdqId: agreement.id,
            creationDate: agreement.createdAt,
            lastModifiedAt: agreement.updatedAt,
            version: agreement.revisionTag
          },
          organizations: [
            {
              dataSupplier: agreement.dataQualityProject.dataSupplier.name
            },
            {
              dataConsumer: agreement.dataQualityProject.dataConsumer.name
            }
          ]
        },
        masterDataCatalogue: {
          masterDataStrucuture: {
            matchedAttributes: {
              ...agreement.matches
            }
          }
        }
      }
      return result
    } catch (e) {
      console.log(e)
    }
  },
  async initAgreement ({ commit, dispatch }, id) {
    try {
      const result = await client.query(
        {
          query: agreementQuery,
          variables: {agreementId: id}
        }
      )
      console.log('agreement: ' + JSON.stringify(result.data.Agreement))
      commit('addAgreement', result.data.Agreement)
      await dispatch('initProgress', result.data.Agreement.progress.id)
      commit('setDataConsumerAttributes',
        result.data.Agreement.matches.map(match => { return match.dataConsumerAttribute })
      )
      commit('setDataSupplierAttributes',
        result.data.Agreement.matches.map(match => { return match.dataSupplierAttribute })
      )
      commit('setMatchCodes',
        result.data.Agreement.matches.map(match => { return match.matchCode })
      )
      commit('setMatchesWanted',
        result.data.Agreement.matches.map(match => { return match.matchWanted })
      )
    } catch (e) {
      console.log(e)
    }
  },
  async update ({ commit }, { dataQualityProjectId, dataRole }) {
    const cookie = /auth\._token\.local=Bearer%20[^ ]+/.exec(document.cookie)
    const token = cookie[0].split('=').slice(1).join('').substr(9)
    await axios.post('/api/agreements',
      {
        dataQualityProjectId: dataQualityProjectId,
        dataRole: dataRole
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
}
