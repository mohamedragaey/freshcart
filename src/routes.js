import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import Login from "./components/Login/Login";
import Products from "./components/Products/Products";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import NotFound from "./components/NotFound/NotFound";

export const router = createBrowserRouter(
    [{
        path: '/',
        element: <Layout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: '*',
                element: <NotFound />
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/home",
                        element: <Home />,
                    },
                    {
                        path: "/categories",
                        element: <Categories />,
                    },
                    {
                        path: "/product",
                        element: <Products />,
                    },
                    {
                        path: "/productdetails/:id",
                        element: <ProductDetails />,
                    },
                    {
                        path: '/cart',
                        element: <Cart />
                    },
                ],
            },
        ]
    }
    ]
);
