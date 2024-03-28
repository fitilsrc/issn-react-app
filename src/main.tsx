import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './i18n.ts';
import { TokensType } from './lib/types/TokensType.ts';
import secureLocalStorage from 'react-secure-storage';

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_REACT_APP_API_URI}:${import.meta.env.VITE_REACT_APP_API_PORT}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const session = secureLocalStorage.getItem('session') as TokensType;
  const token = session?.access_token;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
          <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
