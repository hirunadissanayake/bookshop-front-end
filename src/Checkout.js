import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const storedItems = JSON.parse(localStorage.getItem('items')) || [];
  const userDetails = JSON.parse(localStorage.getItem('user')) || [];
  const [itemsWithQuantity, setItemsWithQuantity] = useState(        // create another item array with new quantity
    storedItems.map((item) => ({ ...item, quantity: 1 }))
  );
  const [total, setTotal] = useState(0);
  const [Category, setCategory] = useState(null);
  const [adjustable, setAdjustable] = useState(null);
  const navigate = useNavigate();



  let calTotal = 0;
  itemsWithQuantity.forEach((item) => {
    calTotal += item.sellingPrice * item.quantity;
  });

  useEffect(() => {
    setTotal(calTotal);
  }, [calTotal])

  useEffect(() => {
    getAllCategory();
    getAdjustable();

  }, [])

  const getAllCategory = async () => {
    const response = await axios.get("http://localhost:8080/auth/category");
    setCategory(response.data);
  }
  const getAdjustable = async () => {
    const response = await axios.get("http://localhost:8080/auth/adjusbill");
    setAdjustable(response.data);
    console.log(response.data);
  }



  const clearCart = () => {
    localStorage.removeItem('items');
    setItemsWithQuantity(storedItems);
    window.location.reload();

  };
  const handleLogOut = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("items");
    navigate("/");
  }
  

  const clearCartItem = (itemId) => {
    const updatedItems = itemsWithQuantity.filter((item) => item.id !== itemId);// remove realted item
    setItemsWithQuantity(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  const handleIncrease = (itemId, qty) => {
    setItemsWithQuantity((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity < qty ? item.quantity + 1 : item.quantity }
          : item
      )
    );
  };


  const handleDecrease = (itemId) => {
    setItemsWithQuantity((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const placeOrder = async () => {
    try {
      const orderItemDtos = itemsWithQuantity.map((item) => ({
        itemId: item.id,
        qty: item.quantity,
      }));
      
      const userId = userDetails.id;

      const data = {
        "userId": userId,
        "orderItemDtos": orderItemDtos
      };

      const response = await axios.post("http://localhost:8080/user/order", data);
      console.log(response);

      if (response.status === 200) {
        clearCart();
        setTotal(0);
        alert("Successful Place Order");
        navigate("/");

      }
// Hiran

    } catch (error) {
      alert("Fail Place Order");
    }
  }


  return (
    <>
      <nav class="n1 navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src='/image/logo.png' alt="Logo" width="300" height="100" class="d-inline-block align-text-top" />

          </a>
          <p className='p1 text-center mx-auto'>A Haven for Book Lovers</p>


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


          <div class="collapse navbar-collapse" id="navbarNav" onClick={() => window.location.reload()}>
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
                <Link class="nav-link" to={"/cart"}>
                  <img src="/image/cart.png" width="30" height="25" class="d-inline-block align-text-top me-2" />
                  My Cart
                </Link>
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

      <div className="d-flex justify-content-between align-items-center mb-3 me-5 ms-3">
        <h2 className='t1'>My Cart</h2>
        {itemsWithQuantity.length > 0 &&
          <button className="btn btn-warning me-5" onClick={clearCart}>
            Clear Cart
          </button>}
      </div>
      <table className="table table-bordered">

        <tbody>
          {itemsWithQuantity.map((item) => (
            <tr key={item.id}>
              <td className="centered-td">{item.name}</td>
              <td className="centered-td">Rs.{item.originalPrice}</td>
              <td className="centered-td">- Rs.{item.discount}</td>
              <td className="centered-td">Rs.{item.sellingPrice}</td>


              <td className="centered-td">
                <div className="quantity">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDecrease(item.id)}
                  >
                    -
                  </button>
                  <span className='mx-2'>{item.quantity}</span>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleIncrease(item.id, item.qty)}
                  >
                    +
                  </button>
                </div>

              </td >
              <td className="centered-td">Rs.{item.sellingPrice * item.quantity}</td>
              <td className="centered-td">
                <button
                  className="btn btn-danger"
                  onClick={() => clearCartItem(item.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
          {itemsWithQuantity.length > 0 &&
            <tr class="table-danger" >
              <td className="centered-td" colSpan="3" style={{ borderRight: 'none', backgroundColor: 'transparent' }}></td>
              <td className="centered-td" colSpan="2">TOTAL</td>
              <td className="centered-td fw-bold" colSpan="2" style={{ borderLeft: 'none' }}>Rs.{total}</td>
            </tr>
          }

          {itemsWithQuantity.length > 0 &&
            <tr class="table-danger" >
              <td className="centered-td" colSpan="3" style={{ borderRight: 'none', backgroundColor: 'transparent' }}></td>
              <td className="centered-td" colSpan="2">Tax</td>
              {adjustable && adjustable.map((adj) =>
                <td className="centered-td fw-bold" colSpan="2" style={{ borderLeft: 'none' }}>Rs.{(total * adj.tax) / 100} ({adj.tax}%)</td>

              )
              }

            </tr>
          }

          {itemsWithQuantity.length == 0 &&
            <div className=" t3 container-center mt-5 mb-5">
              <h3 className="t2">Not Item In Cart</h3>
            </div>
          }

          {adjustable && itemsWithQuantity.length > 0 &&
            adjustable.map((adj) =>
              total < adj.upToAmount && (
                <tr className="table-danger" key={adj.id}>
                  <td className="centered-td" colSpan="3" style={{ borderRight: 'none', backgroundColor: 'transparent' }}></td>
                  <td className="centered-td" colSpan="2">Sub Total</td>
                  <td className="centered-td fw-bold" colSpan="2" style={{ borderLeft: 'none' }}>
                    Rs.{total + ((total * adj.tax) / 100)}
                  </td>
                </tr>
              )
            )
          }

          {adjustable &&
            adjustable.map((adj) =>
              total > adj.upToAmount && (
                <tr className="table-danger" key={adj.id}>
                  <td className="centered-td" colSpan="3" style={{ borderRight: 'none', backgroundColor: 'transparent' }}></td>
                  <td className="centered-td" colSpan="2">Discount</td>
                  <td className="centered-td fw-bold" colSpan="2" style={{ borderLeft: 'none' }}>
                    {adj.discount}%
                  </td>
                </tr>
              )
            )
          }

          {adjustable &&
            adjustable.map((adj) =>
              total > adj.upToAmount && ((total * adj.discount) / 100) > adj.maxDiscountPrice && (
                <tr className="table-danger" key={adj.id}>
                  <td className="centered-td" colSpan="3" style={{ borderRight: 'none', backgroundColor: 'transparent' }}></td>
                  <td className="centered-td" colSpan="2">Discount Price</td>
                  <td className="centered-td fw-bold" colSpan="2" style={{ borderLeft: 'none' }}>
                    Rs. {adj.maxDiscountPrice}(Max discount Price)
                  </td>
                </tr>


              )
            )
          }

          {adjustable &&
            adjustable.map((adj) =>
              total > adj.upToAmount && ((total * adj.discount) / 100) > adj.maxDiscountPrice && (
                <tr className="table-danger" key={adj.id}>
                  <td className="centered-td" colSpan="3" style={{ borderRight: 'none', backgroundColor: 'transparent' }}></td>
                  <td className="centered-td" colSpan="2">Sub Total</td>
                  <td className="centered-td fw-bold" colSpan="2" style={{ borderLeft: 'none' }}>
                    Rs. {total + ((total * adj.tax) / 100) - adj.maxDiscountPrice}
                  </td>
                </tr>


              )
            )
          }

          {adjustable &&
            adjustable.map((adj) =>
              total > adj.upToAmount && ((total * adj.discount) / 100) < adj.maxDiscountPrice && (
                <tr className="table-danger" key={adj.id}>
                  <td className="centered-td" colSpan="3" style={{ borderRight: 'none', backgroundColor: 'transparent' }}></td>
                  <td className="centered-td" colSpan="2">Discount Price</td>
                  <td className="centered-td fw-bold" colSpan="2" style={{ borderLeft: 'none' }}>
                    Rs. {(total * adj.discount) / 100}
                  </td>
                </tr>


              )
            )
          }

          {adjustable &&
            adjustable.map((adj) =>
              total > adj.upToAmount && ((total * adj.discount) / 100) < adj.maxDiscountPrice && (
                <tr className="table-danger" key={adj.id}>
                  <td className="centered-td" colSpan="3" style={{ borderRight: 'none', backgroundColor: 'transparent' }}></td>
                  <td className="centered-td" colSpan="2">Sub Total</td>
                  <td className="centered-td fw-bold" colSpan="2" style={{ borderLeft: 'none' }}>
                    Rs. {total + ((total * adj.tax) / 100) - ((total * adj.discount) / 100)}
                  </td>
                </tr>


              )
            )
          }

        </tbody>
      </table>
      <div className="t4 d-flex justify-content-end me-5 mt-3 mb-5">
        {itemsWithQuantity.length > 0 &&

          <button type="button" className="btn btn-success" onClick={placeOrder}>Place Order</button>
        }

      </div>
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





    </>
  );
};

export default Checkout;
