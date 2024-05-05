import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootPage from './pages/RootPage'
import ErrorPage from './pages/ErrorPage'
import AuthenticationPage, {action as authAction} from './pages/AuthenticationPage';
import {action as logoutAction} from "./pages/Logout";

const router = createBrowserRouter([
    {
        path:'/',
        id:'root',
        element:<RootPage />,
        errorElement:<ErrorPage />,
        children:[{
          path:'/auth',
          element: <AuthenticationPage />,
          action: authAction,
      },
      {
          path: 'logout',
          action: logoutAction,
      }]
    }
])

function App(){
    return <RouterProvider router={router} />
}

export default App