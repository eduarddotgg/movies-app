import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import client from './graphql/client';
import MainLayout from './layouts/Main';
import Search from "./pages/Search";
import ThemeConfig from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeConfig>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Search />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </ThemeConfig>
  </React.StrictMode>,
  document.getElementById('root')
);
