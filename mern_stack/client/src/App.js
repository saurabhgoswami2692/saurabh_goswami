import AddUser from './adduser/AddUser';
import EditUser from './adduser/EditUser';
import User from './getuser/User';
import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';
import Register from './register/Register';
import ProtectedRoute from './ProtectedRoute';
import { useEffect, useState } from 'react';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  },[isAuthenticated]);
  console.log('isAuthenticated' +isAuthenticated);

  const route = createBrowserRouter([
    {
      path:'/dashboard',
      element:(
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Dashboard/>
        </ProtectedRoute>
      )
    },
    {
      path:'/admin',
      element:<Login setIsAuthenticated={setIsAuthenticated}/>
    },
    {
      path:'/register',
      element:<Register/>
    },
    {
      path: '/users',
      element:(
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <User/>
        </ProtectedRoute>
      ) 
    },
   {
    path: '/',
    element:<AddUser/>
   },
   {
    path:'/edit/:id',
    element:(
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <EditUser/>
      </ProtectedRoute>
    )
   },
   {
    path:'/delete/:id',
   },
   {
    path:'/logout'
   }
  ]);
  
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}



export default App;
