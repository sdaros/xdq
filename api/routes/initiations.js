const { Router } = require('express')
const router = Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const parser = require('../utils/csvw.js')
const gql = require('graphql-tag')
const fetch = require('node-fetch')
const { ApolloClient } = require('apollo-client')
const { HttpLink } = require('apollo-link-http')
const { InMemoryCache } = require('apollo-cache-inmemory')

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjj8kjteb6cj40134jhy7vra6',
  fetch: fetch
})
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})
const initiationQuery = gql`
  query Initiation($id: ID!) {
    Initiation(id: $id) {
      dataQualityProject {
        dataConsumer {
          id
        }
        dataSupplier {
          id
        }
      }
    }
  }`
const updateInitiationForDataConsumer = gql`
  mutation updateInitiation($structure: String!, $id: ID!){
    updateInitiation(
      id: $id
      dataConsumerMasterDataStructure: $structure
    )
    {
      id
    }
}`
const updateInitiationForDataSupplier = gql`
  mutation updateInitiation($structure: String!, $id: ID!){
    updateInitiation(
      id: $id
      dataSupplierMasterDataStructure: $structure
    )
    {
      id
    }
}`

router.post('/initiations/:initId/organizations/:orgId/masterDataStructure', upload.single('mdData'), async function (req, res, next) {
  let mutation
  try {
    const result = await client.query(
      {
        query: initiationQuery,
        variables: {
          id: req.params.initId
        }
      }
    )
    if (req.params.orgId === result.data.Initiation.dataQualityProject.dataConsumer.id) {
      mutation = updateInitiationForDataConsumer
    } else {
      mutation = updateInitiationForDataSupplier
    }
  } catch (e) {
    console.log(e)
  }
  try {
    await client.mutate(
      {
        mutation: mutation,
        variables: {
          id: req.params.initId,
          structure: JSON.stringify(parser(req.file.buffer))
        }
      }
    )
  } catch (e) {
    console.log(e)
  }
  res.json({status: 200})
})

module.exports = router
