import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import Home from './pages/Home';
import User from './pages/User';

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Home />} path='/'></Route>
          <Route element={<User />} path='/users/:id'></Route>
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div >



  );
}

export default App;
