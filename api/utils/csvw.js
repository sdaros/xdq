const parse = require('csv-parse/lib/sync')
const yaml = require('js-yaml')
const _ = require('lodash')

function generateMasterDataAttributes({ schema, csv }) {
  // parse schema and return column headers as array
  try {
    let schemaFromCsv = yaml.safeLoad(schema)
    let examplesFromCsv = parse(csv, {columns: true, escape: '\\'})
    let results = []
    for (let column of schemaFromCsv.tableSchema.columns) {
      results.push({
        label: column.name,
        type: column.seeAlso,
        maximumLength: column.datatype.maximumLength,
        examples: _.map(examplesFromCsv, column.name)
      })
    }
    return results
  } catch (e) {
    console.log(e)
  }
}
function seperateCommentsHeaderFromCsv (text) {
  let input = text.trim().split('\n')

  if (input[0] !== '#---') {
    return { schema: null, csv: text }
  }
  let result = { schema: [], csv: [] }
  for (let i = 0; i < input.length; i++) {
    if (input[i].startsWith('#')) {
      result.schema.push(input[i].slice(1))
    } else {
      result.csv.push(...input.slice(i))
      break
    }
  }
  return { schema: result.schema.join('\n'), csv: result.csv.join('\n') }
}
module.exports = function (buf) {
  const input = buf.toString()
  let masterData = seperateCommentsHeaderFromCsv(input)
  return generateMasterDataAttributes(masterData)
}
