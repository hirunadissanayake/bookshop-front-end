import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';


const SingleItem = () => {
    const { id } = useParams();
    const [Category, setCategory] = useState(null);
    const [itemById, setItemById] = useState(null);
    const [adjustable, setAdjustable] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getAllCategory();
        getAdjustable();
        getItemById();
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

    const handleLogOut = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("items");
        navigate("/");
      }
      

    

    const getItemById = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/user/item/${id}`)
            setItemById(response.data);

        } catch (error) {

        }
    }
    return (
        <>

            <title>Category</title>



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

            {itemById &&

                <div className="card mb-5 mx-auto" style={{ maxWidth: '540px' }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src="/image/book.jpg" className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body text-center">
                                <h5 className="card-title">{itemById.name}</h5>
                                <p class="card-text mb-1"><small class="text-body-secondary">({itemById.itemCategoryEntity.name})</small></p>
                                <p className="card-text">{itemById.discription}</p>
                                <h6 className="card-title mb-1">Discount: {(((itemById.originalPrice - itemById.sellingPrice) / itemById.originalPrice) * 100).toFixed(2)}%</h6>
                                <p className="card-text text-decoration-line-through text-center mb-3">RS.{itemById.originalPrice}</p>

                                <h5 className="card-title text-center">RS.{itemById.sellingPrice}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            }
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

export default SingleItem;