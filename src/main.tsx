import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './i18n.ts';

// const httpLink = createHttpLink({
//   uri: `${process.env.REACT_APP_API_URI}:${process.env.REACT_APP_API_PORT}/graphql`,
//   credentials: 'same-origin',
// });

// const authLink = setContext((_, { headers }) => {
//   // const token = localStorage.getItem(AUTH_TOKEN);
//   return {
//     headers: {
//       ...headers,
//       // authorization: token ? `Bearer ${token}` : '',
//     }
//   }
// })

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_REACT_APP_API_URI}:${import.meta.env.VITE_REACT_APP_API_PORT}/graphql`,
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
