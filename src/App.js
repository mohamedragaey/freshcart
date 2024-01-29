import { RouterProvider } from 'react-router-dom';
import './App.css';
import { UserContextProvider } from './Context/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CartContextProvider } from './Context/CartContext'
import { Toaster } from 'react-hot-toast';
import { router } from './routes';

function App() {

  let queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <CartContextProvider >
          <RouterProvider router={router} />
          <Toaster />
        </CartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  )
}

export default App;
