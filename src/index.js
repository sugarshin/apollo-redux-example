import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ReduxCache, apolloReducer } from 'apollo-cache-redux'
// import { InMemoryCache } from 'apollo-cache-inmemory'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { HttpLink } from 'apollo-link-http'
import ApolloClient from 'apollo-client'
import logger from 'redux-logger'
import gql from 'graphql-tag'

const store = createStore(
  combineReducers({
    apollo: apolloReducer
  }),
  applyMiddleware(logger)
)

const cache = new ReduxCache({ store })
// const cache = new InMemoryCache()

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://swapi.graph.cool'
  }),
  cache,
})

ReactDOM.render(
  <Provider store={store}>
    <div>App</div>
  </Provider>,
  document.body.appendChild(
    document.createElement('div')
  )
)

store.dispatch({ type: 'test' })

;(async () => {
  const res = await client.query({
    query: gql`
      query Item {
        allFilms {
          id
          __typename
        }
      }
    `
  })
  console.log(res)
})()
