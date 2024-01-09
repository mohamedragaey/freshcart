import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import Products from './components/Products/Products';
import Register from './components/Register/Register';
import Footer from './components/Footer/Footer';
import ProductDetails from './components/ProductDetails/ProductDetails'
import NotFound from './components/NotFound/NotFound';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import CartContextProvider from './Context/CartContext'
import  { Toaster } from 'react-hot-toast';







function App() {

  const routes = createBrowserRouter([{path:'/' , element:<Layout/> ,children:[
    
    {index:true , element: <ProtectedRoute><Home/></ProtectedRoute>},
    {path:'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'login' , element:<Login/>},
    {path:'product' , element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'register' , element:<Register/>},
    {path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'productdetails/:id' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'*' , element:<NotFound/>},
  
  
  ]}])


  let queryClient = new QueryClient()

  return <> 

      
      <QueryClientProvider client={queryClient}>

        <CartContextProvider>

            <UserContextProvider>
              <RouterProvider router={routes} ></RouterProvider>
          </UserContextProvider>

          <Toaster />

        </CartContextProvider>

     
      

      </QueryClientProvider>
      
    
     
      
       
 
  
  </>
}

export default App;
