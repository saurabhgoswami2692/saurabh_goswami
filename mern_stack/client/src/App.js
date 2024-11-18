import AddUser from './adduser/AddUser';
import EditUser from './adduser/EditUser';
import User from './getuser/User';
import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';
import Register from './register/Register';

function App() {

  const route = createBrowserRouter([
    {
      path:'/dashboard',
      element:<Dashboard/>
    },
    {
      path:'/admin',
      element:<Login/>
    },
    {
      path:'/register',
      element:<Register/>
    },
    {
      path: '/users',
      element: <User/>
    },
   {
    path: '/',
    element:<AddUser/>
   },
   {
    path:'/edit/:id',
    element:<EditUser/>
   },
   {
    path:'/delete/:id',
   }
  ]);
  
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}



export default App;
