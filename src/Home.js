import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Checkout from './Checkout';



const Home = () => {
  const [Category, setCategory] = useState(null);
  const [item, setItems] = useState(null);
  const [adjustable, setAdjustable] = useState(null);
  const navigate = useNavigate();
 
  

  useEffect(() => {
    getAllCategory();
    getAllItems();
    getAdjustable();
    
  }, [])

  const getAllCategory = async () => {
    const response = await axios.get("http://localhost:8080/auth/category");
    setCategory(response.data);
  }

  const getAllItems = async () => {
    const response = await axios.get("http://localhost:8080/auth/item");
    setItems(response.data);
  }
  const getAdjustable = async () => {
    const response = await axios.get("http://localhost:8080/auth/adjusbill");
    setAdjustable(response.data);
   
  }

  const addItemCart = (ite) => {
    const updatedItems = JSON.parse(localStorage.getItem('items')) || [];
    const newItem = { ...ite }; // new item
    updatedItems.push(newItem); // Add the nw item
    localStorage.setItem('items', JSON.stringify(updatedItems)); // Update local storage
    
  };
  
  const handleLogOut = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("items");
    navigate("/");
  }
  

  const navigateCart = () => {
  
    navigate("/cart");
  };
  return (
    <div>
      <title>Home</title>


      <nav class="n1 navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src='/image/logo.png' alt="Logo" width="300" height="100" class="d-inline-block align-text-top" />

          </a>
          <p className='p1'>A Haven for Book Lovers</p>


          {/* <div class="row">

            <div class="col-auto">
              <img src="/image/sign.png" width="50" height="44" class="d-inline-block align-text-top " />
            </div>
            <div class="col-auto">
              <a href="#" class="d-inline-block me-2 zoom-in-out fw-bold">
                Sign in &<br /> Create Account
              </a>
            </div>
          </div> */}


        </div>
      </nav>

      <nav class="navbar navbar-expand-lg bg-body-tertiary mb-5 sticky-top" data-bs-theme="dark">
        <div class="container-fluid">
          <a class="navbar-brand fw-bold" href="#">Category</a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>


          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-3">
              <li class="nav-item">
                <Link class="nav-link" to={"/Home"}> Home </Link>
              </li>

            </ul>
            <ul class="navbar-nav">
              {Category && Category.map((cat) =>
                <li class="nav-item">
                  <Link class="nav-link active" aria-current="page" to={`/category/${cat.id}`}>{cat.name}</Link>
                </li>
              )}
            </ul>
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <button class="nav-link" onClick={handleLogOut}>
                  Log Out
                </button>
              </li>

            </ul>
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <button class="nav-link" onClick={navigateCart}>
                  <img src="/image/cart.png" width="30" height="25" class="d-inline-block align-text-top me-2" />
                  My Cart
                </button>
              </li>

            </ul>

          </div>
        </div>
      </nav>

      <div className='d4 mx-5 mb-5'>
        <div className="container-fluid">
          <div className='row'>
            {adjustable && adjustable.map((adj) => <div className='text-center mt-3 mb-3'>

              <h1 className='zoom-in-out fw-bold'>
                Enjoy a {adj.discount}% OFF on Total bills over Rs.{adj.upToAmount}/=
              </h1>
              <h3>Max Discount up to Rs.{adj.maxDiscountPrice
              }.00</h3>

            </div>)}



          </div>
        </div>
      </div>


      <div className="row mx-3" >

        {item && item.map((ite) => (
          <div className="card  me-4 col-lg-4 col-sm-3 col-md-2 col-12 col-xl-4 mb-4  border-dark" style={{ width: '18rem' }} key={ite.id}>
            <img src="/image/book.jpg" width="100" height="125" className="mx-auto d-block mt-2" />
            <div className="card-body">
              <h5 className="card-title mb-1">{ite.name}</h5>
              <p className="card-text mb-2">({ite.itemCategoryEntity.name})</p>
              <h6 className="card-title mb-1">Discount: {(((ite.originalPrice - ite.sellingPrice) / ite.originalPrice) * 100).toFixed(2)}%</h6>
              <p className="card-text mb-1">Qty: {ite.qty}</p>
              <div className="d-flex justify-content-between mb-2">
                <h6 className="card-title">RS.{ite.sellingPrice}</h6>
                <p className="card-text text-decoration-line-through">RS.{ite.originalPrice}</p>
              </div>
              <Link to={`/item/${ite.id}`} className="btn btn-primary me-5">Details</Link>
              <button type='button' class="btn btn-outline-success" onClick={() => addItemCart(ite)}>
  Add Cart
</button>

            </div>
          </div>
        ))}
      </div>

      {/* {orderItem && orderItem.length > 0 && <Checkout orderItem={orderItem} />} */}
      

      {/* <div>
      {<Checkout nums = {numbers}/>}
      </div> */}
      
      
      


      <div className='d1'>
        <div className="container-fluid">

          <div className='  row ms-2'>

            <div className='c1 col-12 col-md-3  mt-4 '>
              <p><img src="/image/delivery.png" width="50" height="35" class="d-inline-block align-text-top me-2" />Island delivery</p>
            </div>

            <div className='c1 col-12 col-md-3 mt-4'>
              <p><img src="/image/payment.png" width="50" height="35" class="d-inline-block align-text-top me-2" />Secure Payments</p>
            </div>

            <div className='c1 col-12 col-md-3 mt-4'>
              <p><img src="/image/price.png" width="50" height="35" class="d-inline-block align-text-top me-2" />Best Price</p>
            </div>

            <div className='c1 col-12 col-md-3 mt-4'>
              <p><img src="/image/discount.png" width="50" height="35" class="d-inline-block align-text-top me-2" />Best Discount</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className='d2 row'>
          <div className=' text-center'>
            <img src='/image/logo.png' alt="Logo" width="200" height="100" class="d-inline-block align-text-top" />
          </div>
        </div>
        <div className='d3 row'>
          <div className=' text-center'>
            <p className='mt-2'>Copyright © 2024- HS Bookshop - All Rights Reserved. Concept, Design & Development By Hiran</p>
          </div>
        </div>
      </div>
















    </div>
  )

}


export default Home;