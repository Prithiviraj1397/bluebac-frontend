import React from "react"
import ReactDOM from "react-dom/client"
import "./index.scss"
import { BrowserRouter } from "react-router-dom"

import Loader from "./components/common/loader/loader.tsx"
import App from "./app.tsx"
import { Provider } from "react-redux"
import store from "./redux/store.tsx"
import { HelmetProvider } from "react-helmet-async"

import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache, ApolloLink, concat } from "@apollo/client"

const httpLink = createHttpLink({
  uri: "http://192.168.7.68:8000/bluebac",
})

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("auth_token")
  // add the authorization to the headers
  operation.setContext(token ? {
    headers: {
      authorization: token,
    },
  } : {})

  return forward(operation)
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Provider store={store}>
          <HelmetProvider>
            <React.Suspense fallback={<Loader />}>
              <App />
            </React.Suspense>
          </HelmetProvider>
        </Provider>
      </BrowserRouter>
    </ApolloProvider>
  </React.Fragment>
)
