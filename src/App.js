import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import "/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import ItemByCategory from './ItemByCategory';
import SingleItem from './SingleItem';
import Checkout from './Checkout';
import AdminHome from './admin/AdminHome';
import CategoryManage from './admin/CategoryManage';
import ItemManage from './admin/ItemManage';
import UpadateItem from './admin/UpdateItem';
import OrderDetails from './admin/OrderDetails';
import ManageDiscount from './admin/ManageDiscount';
import UserDetails from './admin/UserDetails';
import Register from './Auth/Register';
import AdminRegister from './Auth/AdminRegister';
import Login from './Auth/Login';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Home1 from './Home1';
function App() {
  return (
    <div className='App'>
    <BrowserRouter>
    <Routes>
    <Route index element = {<Home1/>}/>
    <Route  element = {<ProtectedRoutes/>}>
      <Route path='/Home' element = {<Home/>}/>
      <Route path='/category/:id' element = {<ItemByCategory/>}/>
      <Route path='/item/:id' element = {<SingleItem/>}/>
      <Route path='/cart' element ={<Checkout/>}/>
      <Route path='/admin' element ={<AdminHome/>}/>
      <Route path='/admin/categories' element ={<CategoryManage/>}/>
      <Route path='/admin/items' element ={<ItemManage/>}/>
      <Route path='/admin/item/:id' element ={<UpadateItem/>}/>
      <Route path='/admin/order_details' element ={<OrderDetails/>}/>
      <Route path='/admin/manage_discount' element ={<ManageDiscount/>}/>
      <Route path='/admin/user_details' element ={<UserDetails/>}/>
      </Route>
      <Route path='/auth/register_user' element ={<Register/>}/>
      <Route path='/auth/register_admin' element ={<AdminRegister/>}/>
      <Route path='/auth/login' element ={<Login/>}/>
      


     


    </Routes>
    
    
    
    
    
    
    
    
    </BrowserRouter>

    </div>
  );
}

export default App;
