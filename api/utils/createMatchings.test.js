const createMatchings = require('./createMatchings')

let dataSupplierAttributes = [{
  'id': 'cjkd6j7fo05b70133r771kf5d',
  'label': 'ean',
  'type': 'http://schema.org/gtin13',
  'maximumLength': 13,
  'examples': ['28394567890128', '12032323433028'],
  '__typename': 'MasterDataAttribute'
}, {
  'id': 'cjkd6j7l705ax0163fhxgmxwi',
  'label': 'name',
  'type': 'http://schema.org/name',
  'maximumLength': null,
  'examples': ['purple belt', 'red shoes'],
  '__typename': 'MasterDataAttribute'
}, {
  'id': 'cjkd6j7p205ep0187v6ah0aqp',
  'label': 'productSize',
  'type': 'http://schema.org/QuantitativeValue',
  'maximumLength': null,
  'examples': ['150cm x 3cm', '280mm x 53m x 30mm'],
  '__typename': 'MasterDataAttribute'
}]

let dataSupplierAttributesOneMore = [{
  'id': 'cjkd6j7fo05b70133r771kf5d',
  'label': 'ean',
  'type': 'http://schema.org/gtin13',
  'maximumLength': 13,
  'examples': ['28394567890128', '12032323433028'],
  '__typename': 'MasterDataAttribute'
}, {
  'id': 'cjkd6j7l705ax0163fhxgmxwi',
  'label': 'name',
  'type': 'http://schema.org/name',
  'maximumLength': null,
  'examples': ['purple belt', 'red shoes'],
  '__typename': 'MasterDataAttribute'
}, {
  'id': 'cjkd6j7l705ax0163fhxgmxwi',
  'label': 'color',
  'type': 'http://schema.org/color',
  'maximumLength': null,
  'examples': ['purple', 'red'],
  '__typename': 'MasterDataAttribute'
}, {
  'id': 'cjkd6j7p205ep0187v6ah0aqp',
  'label': 'productSize',
  'type': 'http://schema.org/QuantitativeValue',
  'maximumLength': null,
  'examples': ['150cm x 3cm', '280mm x 53m x 30mm'],
  '__typename': 'MasterDataAttribute'
}]

let dataConsumerAttributes = [{
  'id': 'cjkd6j7r105el0175290du7k3',
  'label': 'gtin',
  'type': 'http://schema.org/gtin12',
  'maximumLength': 12,
  'examples': ['01234567890128', '42342812032328'],
  '__typename': 'MasterDataAttribute'
}, {
  'id': 'cjkd6j7us05do0139n7oy1ixt',
  'label': 'label',
  'type': 'http://schema.org/name',
  'maximumLength': null,
  'examples': ['running shoes', 'white dress'],
  '__typename': 'MasterDataAttribute'
}, {
  'id': 'cjkd6j7yp05g40100diaa65ij',
  'label': 'dimensions',
  'type': 'https://gs1.org/voc/SizeDetails',
  'maximumLength': null,
  'examples': ['2x2.3x12', '2mx5.3m'],
  '__typename': 'MasterDataAttribute'
}]

test('initial test works', () => {
  expect(
    createMatchings(
      dataConsumerAttributes,
      dataSupplierAttributes
    )
  ).toEqual([
    [81, 62, 7],
    [{
      'id': 'cjkd6j7us05do0139n7oy1ixt',
      'label': 'label',
      'type': 'http://schema.org/name',
      'maximumLength': null,
      'examples': ['running shoes', 'white dress'],
      '__typename': 'MasterDataAttribute'
    }, {
      'id': 'cjkd6j7r105el0175290du7k3',
      'label': 'gtin',
      'type': 'http://schema.org/gtin12',
      'maximumLength': 12,
      'examples': ['01234567890128', '42342812032328'],
      '__typename': 'MasterDataAttribute'
    }, {
      'id': 'cjkd6j7yp05g40100diaa65ij',
      'label': 'dimensions',
      'type': 'https://gs1.org/voc/SizeDetails',
      'maximumLength': null,
      'examples': ['2x2.3x12', '2mx5.3m'],
      '__typename': 'MasterDataAttribute'
    }],
    [{
      'id': 'cjkd6j7l705ax0163fhxgmxwi',
      'label': 'name',
      'type': 'http://schema.org/name',
      'maximumLength': null,
      'examples': ['purple belt', 'red shoes'],
      '__typename': 'MasterDataAttribute'
    }, {
      'id': 'cjkd6j7fo05b70133r771kf5d',
      'label': 'ean',
      'type': 'http://schema.org/gtin13',
      'maximumLength': 13,
      'examples': ['28394567890128', '12032323433028'],
      '__typename': 'MasterDataAttribute'
    }, {
      'id': 'cjkd6j7p205ep0187v6ah0aqp',
      'label': 'productSize',
      'type': 'http://schema.org/QuantitativeValue',
      'maximumLength': null,
      'examples': ['150cm x 3cm', '280mm x 53m x 30mm'],
      '__typename': 'MasterDataAttribute'
    }]
  ])
})

test('With unequal attributes', () => {
  expect(
    createMatchings(
      dataConsumerAttributes,
      dataSupplierAttributesOneMore
    )
  ).toEqual([
    [81, 62, 7],
    [{
      'id': 'cjkd6j7us05do0139n7oy1ixt',
      'label': 'label',
      'type': 'http://schema.org/name',
      'maximumLength': null,
      'examples': ['running shoes', 'white dress'],
      '__typename': 'MasterDataAttribute'
    }, {
      'id': 'cjkd6j7r105el0175290du7k3',
      'label': 'gtin',
      'type': 'http://schema.org/gtin12',
      'maximumLength': 12,
      'examples': ['01234567890128', '42342812032328'],
      '__typename': 'MasterDataAttribute'
    }, {
      'id': 'cjkd6j7yp05g40100diaa65ij',
      'label': 'dimensions',
      'type': 'https://gs1.org/voc/SizeDetails',
      'maximumLength': null,
      'examples': ['2x2.3x12', '2mx5.3m'],
      '__typename': 'MasterDataAttribute'
    }],
    [{
      'id': 'cjkd6j7l705ax0163fhxgmxwi',
      'label': 'name',
      'type': 'http://schema.org/name',
      'maximumLength': null,
      'examples': ['purple belt', 'red shoes'],
      '__typename': 'MasterDataAttribute'
    }, {
      'id': 'cjkd6j7fo05b70133r771kf5d',
      'label': 'ean',
      'type': 'http://schema.org/gtin13',
      'maximumLength': 13,
      'examples': ['28394567890128', '12032323433028'],
      '__typename': 'MasterDataAttribute'
    }, {
      'id': 'cjkd6j7p205ep0187v6ah0aqp',
      'label': 'productSize',
      'type': 'http://schema.org/QuantitativeValue',
      'maximumLength': null,
      'examples': ['150cm x 3cm', '280mm x 53m x 30mm'],
      '__typename': 'MasterDataAttribute'
    }]
  ])
})
