const _ = require('lodash')
const leven = require('leven')

/**
   editDistanceStrategy calculates the edit distance between strings x and y.
   @param {string} x
   @param {string} y
   @return {number} represents the distance between strings x and y
*/
const editDistanceStrategy = (x, y) => {
  if (_.isEmpty(x) || _.isEmpty(y)) {
    return 0
  }
  if (leven(JSON.stringify(x), JSON.stringify(y)) === 0) {
    return 1
  }
  if (leven(JSON.stringify(x), JSON.stringify(y)) === 1) {
    return 0.75
  }
  return 1 / leven(JSON.stringify(x), JSON.stringify(y))
}

/**
   calculateConfidence provides the caller with a function that calculates
   a confidence level for the semantic similarity between a data consumer
   attribute and a data supplier attribute using the provided a strategy.
   @param {Function} strategy
   @return {Function}
*/
const calculateConfidence = (strategy) => (dataConsumer, dataSupplier) => {
  return strategy(dataConsumer, dataSupplier)
}


/**
   tallyMatchCodeScore returns a number between 0 and 100 depending on the
   confidence level of an attribute's metadata property. The property
   with the highest confidence level, i.e. the 'first' parameter,
   is assigned the highest weight.
   @param {Object} first is the property with the highest
   confidencel level, second the second highest and
   the property maximumLength has the lowest weight
   @return {number} matchCode indicating
   the overall confidence of the match
*/
const tallyMatchCodeScore = ({ first, second, maximumLength }) => {
  // use a weight ratio of 75:20:5
  return Math.floor(
    (first * 75) +
    (second * 20) +
    (maximumLength * 5)
  )
}

/**
   bestMatchFor iterates through all data supplier attributes and returns a
   data supplier attribute which best matches a data consumer attribute.
   @param {Object} data consumer attribute
   @param {Array} data supplier attribute
   @return {Object} contains the match code and respective data supplier
   attribute data consumer attribute
*/
const bestMatchFor = (dataConsumerAttribute, dataSupplierAttributes) => {
  let confidenceAcrossAllDataSupplierAttributes = []
  let whenUsingEditDistance = calculateConfidence(editDistanceStrategy)
  for (let dataSupplierAttribute of dataSupplierAttributes) {
    let confidenceForAttribute = {}
    confidenceForAttribute.label =
      whenUsingEditDistance(
        dataConsumerAttribute.label,
        dataSupplierAttribute.label
      )
    confidenceForAttribute.type =
      whenUsingEditDistance(
        dataConsumerAttribute.type,
        dataSupplierAttribute.type
      )
    confidenceForAttribute.maximumLength =
      whenUsingEditDistance(
        dataConsumerAttribute.maximumLength,
        dataSupplierAttribute.maximumLength
      )
    const confidenceSortedDescending =
      [ confidenceForAttribute.label, confidenceForAttribute.type ].sort(
        (a, b) => { return b - a }
      )
    confidenceAcrossAllDataSupplierAttributes.push({
      dataSupplier: dataSupplierAttribute,
      matchCode: tallyMatchCodeScore({
        first: confidenceSortedDescending[0],
        second: confidenceSortedDescending[1],
        maximumLength: confidenceForAttribute.maximumLength
      })
    })
  }
  const highestConfidenceDataSupplierAttribute = _.maxBy(
    confidenceAcrossAllDataSupplierAttributes, x => { return x.matchCode }
  )
  const dataSupplierAttributesOmittingBestMatch = _.dropWhile(
    dataSupplierAttributes, x => {
      return x.id === highestConfidenceDataSupplierAttribute.dataSupplier.id
    })
  return {
    matchCode: highestConfidenceDataSupplierAttribute.matchCode,
    dataConsumerAttribute: dataConsumerAttribute,
    dataSupplierAttribute: highestConfidenceDataSupplierAttribute.dataSupplier,
    dataSupplierAttributesRest: dataSupplierAttributesOmittingBestMatch
  }
}

// the function exported to users when importing this module using
// the ES6 syntax `import createMatchings from 'createMatchings'`
module.exports = function (dataConsumerAttributes, dataSupplierAttributes) {
  let matchTriple = [[], [], []]
  let rest = dataSupplierAttributes
  let unsorted = []
  for (let dataConsumer of dataConsumerAttributes) {
    let result = bestMatchFor(dataConsumer, rest)
    rest = result.dataSupplierAttributesRest
    unsorted.push({
      matchCode: result.matchCode,
      dataConsumerAttribute: result.dataConsumerAttribute,
      dataSupplierAttribute: result.dataSupplierAttribute
    })
  }
  let sortedDescending = unsorted.sort((a, b) => b.matchCode - a.matchCode)
  matchTriple[0] = _.map(sortedDescending, 'matchCode')
  matchTriple[1] = _.map(sortedDescending, 'dataConsumerAttribute')
  matchTriple[2] = _.map(sortedDescending, 'dataSupplierAttribute')
  return matchTriple
}
