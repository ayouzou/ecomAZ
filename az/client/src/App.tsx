import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from './context/auth';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';








function App() {
  const queryclient = new QueryClient;

  return (
    <QueryClientProvider client={queryclient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SessionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={  <Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </SessionProvider>     
    </QueryClientProvider>
  )
}

export default App
