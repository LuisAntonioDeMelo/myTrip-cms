import { env_url, token } from 'env'
import { GraphQLClient } from 'graphql-request'

const endpoint = env_url

const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: token
  }
})

export default client
