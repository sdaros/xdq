const { Router } = require('express')
const jsonwebtoken = require('jsonwebtoken')
const router = Router()
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

router.post('/login', async (req, res, next) => {
  const userQuery = gql`
    query User($username: String!) {
      User(username: $username) {
        id
        username
        passwordHash
        organization {
          id
          name
        }
      }
    }
  `
  const { username, password } = req.body
  try {
    const result = await client.query(
      {
        query: userQuery,
        variables: {
          username: username
        }
      }
    )
    const user = result.data.User
    const valid = user.username === username && user.passwordHash === password
    if (!valid) {
      throw new Error('Invalid username or password')
    }
    const accessToken = jsonwebtoken.sign(
      {
        username,
        organization: user.organization.id,
        picture: 'https://github.com/nuxt.png',
        name: username,
        scope: ['test', 'user']
      },
      'dummy'
    )
    res.json({
      token: {
        accessToken
      }
    })
  } catch (e) {
    console.log(e)
  }
})

router.get('/user', (req, res, next) => {
  res.json({ user: req.user })
})

router.post('/logout', (req, res, next) => {
  res.json({ status: 'OK' })
})

module.exports = router
