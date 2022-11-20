import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './component/Layout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import { Provider } from 'react-redux';
import { store } from "./store";
import CheckoutPage from './pages/CheckoutPage';
import AuthProvider, { useAuth } from './firebase/Auth';
import { Navigate } from 'react-router-dom';
import Register from './pages/Register';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to={"/login"}/>
  }
  return children;
}

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/checkout' element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            } />
        </Route>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
      </>
    )
  );

  return (
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </AuthProvider>
  )
}

export default App
