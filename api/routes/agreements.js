const { Router } = require('express')
const router = Router()
const createMatchings = require('../utils/createMatchings')
const gql = require('graphql-tag')
const fetch = require('node-fetch')
const { ApolloClient } = require('apollo-client')
const { HttpLink } = require('apollo-link-http')
const { InMemoryCache } = require('apollo-cache-inmemory')
const _ = require('lodash')

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjj8kjteb6cj40134jhy7vra6',
  fetch: fetch
})
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})
const dataQualityProjectQuery = gql`
  query dataQualityProject($dataQualityProjectId: ID!) {
    DataQualityProject(
      id: $dataQualityProjectId
    )
    { id
      agreement {
        id
      }
      initiation {
        id
        dataSupplierMasterDataStructure
        dataConsumerMasterDataStructure
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
    }
  }
`
const createAgreementMutation = gql`
  mutation createAgreement($dataQualityProjectId: ID!) {
    createAgreement(
      revisionTag: "v1",
      dataQualityProjectId: $dataQualityProjectId
    )
    {
      id
    }
  }
`
const createAgreementProgressMutation = gql`
  mutation createAgreementProgress($agreementId: ID!) {
    createAgreementProgress(
      agreementId: $agreementId
    )
    {
      id
    }
  }
`
const createMasterDataMatchingMutation = gql`
  mutation createMasterDataMatching(
   $matchCode: Float,
   $dataConsumerAttributeId: ID,
   $dataSupplierAttributeId: ID,
   $matchWanted: Boolean,
   $inAgreementId: ID
  ) {
    createMasterDataMatching(
      matchCode: $matchCode,
      dataConsumerAttributeId: $dataConsumerAttributeId,
      dataSupplierAttributeId: $dataSupplierAttributeId, matchWanted: $matchWanted inAgreementId: $inAgreementId
    )
    {
      id
      matchCode
      matchWanted
      dataConsumerAttribute {id label}
      dataSupplierAttribute {id label}
      inAgreement {id}
    }
  }
`
const clearExistingAgreementMatchesMutation = gql`
  mutation updateAgreement($agreementId: ID!) {
    updateAgreement(
      id: $agreementId,
      matches: null
    )
    {
      id
      dataConsumerAttributes {id label}
    }
  }
`
const clearExistingMasterDataAttributesAndMatchesMutation = gql`
  mutation updateAgreement($agreementId: ID!, $dataConsumerAttributesIds: [ID!], $dataSupplierAttributesIds: [ID!] ) {
    updateAgreement(
      id: $agreementId,
      dataConsumerAttributesIds: $dataConsumerAttributesIds,
      dataSupplierAttributesIds: $dataSupplierAttributesIds,
      matches: null
    )
    {
      id
      dataConsumerAttributes {id label}
      dataSupplierAttributes {id label}
      matches {
        dataConsumerAttribute {id label}
        dataSupplierAttribute {id label}
      }
    }
  }
`
const createMasterDataAttributeMutation = gql`
  mutation createMasterDataAttribute(
    $label: String,
    $type: String,
    $maximumLength: String,
    $examples: [String!],
    $dataConsumer: [ID!]
    $dataSupplier: [ID!]
  ) {
    createMasterDataAttribute(
    label: $label,
    type: $type,
    maximumLength: $maximumLength,
    examples: $examples,
    dataConsumersIds: $dataConsumer
    dataSuppliersIds: $dataSupplier
    )
    {
      id
      label
      type
      dataConsumers { id }
      dataSuppliers { id }
    }
  }
`

async function createAgreement (id) {
  try {
    const result = await client.mutate(
      {
        mutation: createAgreementMutation,
        variables: { dataQualityProjectId: id }
      }
    )
    return result
  } catch (e) {
    console.log(e)
  }
}

async function agreementExistsFor (id) {
  try {
    const result = await client.query(
      {
        query: dataQualityProjectQuery,
        variables: {dataQualityProjectId: id}
      }
    )
    return result.data.DataQualityProject
  } catch (e) {
    console.log(e)
  }
}
async function clearExistingMasterDataAttributesAndMatches (id, dataRole) {
  let clearMasterDataAttributesFor = {}
  if (dataRole === 'dataConsumer') {
    clearMasterDataAttributesFor.dataConsumerAttributesIds = null
  } else {
    clearMasterDataAttributesFor.dataSupplierAttributesIds = null
  }
  try {
    const result = await client.mutate(
      {
        mutation: clearExistingMasterDataAttributesAndMatchesMutation,
        variables: {agreementId: id, ...clearMasterDataAttributesFor}
      }
    )
    return result
  } catch (e) {
    console.log(e)
  }
}
async function createMasterDataAttribute (attributes) {
  let results = []
  try {
    results.push(await client.mutate(
      {
        mutation: createMasterDataAttributeMutation,
        variables: {...attributes}
      }
    ))
    return results
  } catch (e) {
    console.log(e)
  }
}
async function createMasterDataAttributes (dataRole, agreementId, dataConsumerMasterDataStructure, dataSupplierMasterDataStructure) {
  let result = []
  let linkWithId = {}
  if (dataRole === 'dataConsumer') {
    linkWithId.dataConsumer = agreementId
    for (let attribute of JSON.parse(dataConsumerMasterDataStructure)) {
      result.push(await createMasterDataAttribute({
        ..._.omitBy(attribute, _.isEmpty), ...linkWithId
      }))
    }
    return result
  }
  linkWithId.dataSupplier = agreementId
  for (let attribute of JSON.parse(dataSupplierMasterDataStructure)) {
    result.push(await createMasterDataAttribute({
      ..._.omitBy(attribute, _.isEmpty), ...linkWithId
    }))
  }
  return result
}
async function populateMasterDataMatching (matching) {
  try {
    const result = await client.mutate(
      {
        mutation: createMasterDataMatchingMutation,
        variables: {...matching}
      }
    )
    return result
  } catch (e) {
    console.log(e)
  }
}

async function populateMasterDataMatchings (agreementId, matchings) {
  let results = []
  for (let i = 0; i < matchings[0].length; i++) {
    results.push(await populateMasterDataMatching(
      {
        matchCode: matchings[0][i],
        dataConsumerAttributeId: matchings[1][i].id,
        dataSupplierAttributeId: matchings[2][i].id,
        inAgreementId: agreementId
      }
    ))
  }
  return results
}

async function populateProposedMasterDataMatchings (agreementId, matchings) {
  let results = []
  for (let i = 0; i < matchings[0].length; i++) {
    results.push(await populateMasterDataMatching(
      {
        matchCode: matchings[0][i],
        dataConsumerAttributeId: matchings[1][i].id,
        dataSupplierAttributeId: matchings[2][i].id,
        matchesWanted: matchings[3][i],
        inAgreementId: agreementId
      }
    ))
  }
  return results
}

async function updateMatchings (agreement) {
  try {
    let matchings = [
      [...agreement.matchCodes],
      [...agreement.dataConsumerAttributes],
      [...agreement.dataSupplierAttributes],
      [...agreement.matchesWanted]
    ]
    return await populateProposedMasterDataMatchings(agreement.id, matchings)
  } catch (e) {
    console.log(e)
  }
}

async function createNewMatchings (id) {
  try {
    const result = await client.query(
      {
        query: agreementQuery,
        variables: {agreementId: id}
      }
    )
    let agreement = result.data.Agreement
    let matchings = createMatchings(agreement.dataConsumerAttributes, agreement.dataSupplierAttributes)
    return await populateMasterDataMatchings(agreement.id, matchings)
  } catch (e) {
    console.log(e)
  }
}
async function createAgreementIfNotExists (dataQualityProjectId) {
  let dataQualityProject = await agreementExistsFor(dataQualityProjectId)
  if (_.isEmpty(dataQualityProject.agreement)) {
    await createAgreement(dataQualityProjectId)
    return dataQualityProject
  }
  return dataQualityProject
}

async function initializeAgreementProgress (id) {
  try {
    await client.mutate(
      {
        mutation: createAgreementProgressMutation,
        variables: {agreementId: id}
      }
    )
  } catch (e) {
    console.log(e)
  }
}

async function clearExistingAgreementMatches (id) {
  try {
    await client.mutate(
      {
        mutation: clearExistingAgreementMatchesMutation,
        variables: {agreementId: id}
      }
    )
  } catch (e) {
    console.log(e)
  }
}

router.post('/agreements', async function (req, res, next) {
  let dataQualityProject = await createAgreementIfNotExists(req.body.dataQualityProjectId)
  let cleared = await clearExistingMasterDataAttributesAndMatches(dataQualityProject.agreement.id, req.body.dataRole)
  console.log('cleared: ' + JSON.stringify(cleared, null, 2))
  await initializeAgreementProgress(dataQualityProject.agreement.id)
  let attributes = await createMasterDataAttributes(
    req.body.dataRole,
    dataQualityProject.agreement.id,
    dataQualityProject.initiation.dataConsumerMasterDataStructure,
    dataQualityProject.initiation.dataSupplierMasterDataStructure
  )
  console.log('attributes: ' + JSON.stringify(attributes, null, 2))
  let matchings = await createNewMatchings(dataQualityProject.agreement.id)
  console.log('matchings: ' + JSON.stringify(matchings, null, 2))
  res.json({status: 200})
})

router.post('/agreements/:id/matches', async function (req, res, next) {
  await clearExistingAgreementMatches(req.body.agreementId)
  let matchings = await updateMatchings({
    id: req.body.agreementId,
    matchCodes: req.body.matchCodes,
    dataConsumerAttributes: req.body.dataConsumerAttributes,
    dataSupplierAttributes: req.body.dataSupplierAttributes,
    matchesWanted: req.body.matchesWanted
  })
  console.log('matchings: ' + JSON.stringify(matchings, null, 2))
  res.json({status: 200})
})

module.exports = router
