import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PullRequest from './PullRequest';

import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Repos from './Repos';
import Home from './Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/prs" element={<PullRequest />}></Route>
          <Route path="/repos" element={<Repos />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
