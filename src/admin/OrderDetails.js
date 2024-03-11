import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllOrderDetails();
  }, [])

  const getAllOrderDetails = async () => {
    const response = await axios.get("http://localhost:8080/admin/order");
    setOrderDetails(response.data);
  }

  const handleLogOut = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("items");
    navigate("/");
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
          <a class="navbar-brand fw-bold" href="#">Admin</a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>


          <div class="collapse navbar-collapse" id="navbarNav" onClick={() => window.location.reload()}>
            <ul class="navbar-nav me-3">
              <li class="nav-item mx-3">
                <Link class="nav-link" to={"/admin"}> Home </Link>
              </li>

            </ul>
            <ul class="navbar-nav">
              <li class="nav-item mx-3">
                <Link className="nav-link" to={"/admin/categories"} >Category</Link>
              </li>
              <li class="nav-item mx-3">
                <Link class="nav-link" to={"/admin/items"}> Items </Link>
              </li>
              <li class="nav-item mx-3">
                <Link class="nav-link" to={"/admin/order_details"}> Order Deatils </Link>
              </li>
              <li class="nav-item mx-3">
                <Link class="nav-link" to={"/admin/manage_discount"}> Manage Discount </Link>
              </li>
              <li class="nav-item mx-3">
                <Link class="nav-link" to={"/admin/user_details"}> User Deatils </Link>
              </li>
            </ul>

            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <button class="nav-link" onClick={handleLogOut}>
                  Log Out
                </button>
              </li>

            </ul>
          </div>
        </div>
      </nav>
      <div className="text-center my-4">
        <h2 className="k1">Order Details</h2>
      </div>

      <table className="custom-table table table-success table-striped  mb-4 ">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Total (Rs)</th>
            <th>Tax (%)</th>
            <th>Discount(%)</th>
            <th>Date&Time</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails && orderDetails.map((ord) =>
            <tr>
              <td>{ord.userEntity.userName}</td>
              <td>{ord.total}</td>
              <td>{ord.tax}</td>
              <td>{ord.discount}</td>
              <td>{ord.orderTime}</td>

            </tr>
          )}

        </tbody>
      </table>

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
  )
}

export default OrderDetails;