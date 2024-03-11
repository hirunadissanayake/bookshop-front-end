import axios from "axios";
import { event } from "jquery";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ManageDiscount = ()=> {
    const[discount,setDiscount] = useState("");
    const[upToAmount,setUpToAmount] = useState("");
    const[tax,setTax] = useState("");
    const[maxDiscountPrice,setMaxDiscountPrice] = useState("");
    const [adjustable, setAdjustable] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
       
        getAdjustable();
        
      }, [])
      useEffect(() => {
        setInput();
    }, [adjustable]);

    const setInput = ()=>{
        {adjustable && adjustable.map((adj)=>
           setDiscount(adj.discount)   
            )}
            {adjustable && adjustable.map((adj)=>
                setUpToAmount(adj.upToAmount)   
                 )}

                 {adjustable && adjustable.map((adj)=>
                    setTax(adj.tax)   
                     )}

                     {adjustable && adjustable.map((adj)=>
                        setMaxDiscountPrice(adj.maxDiscountPrice)   
                         )}
    }



    const getAdjustable = async () => {
        const response = await axios.get("http://localhost:8080/auth/adjusbill");
        setAdjustable(response.data);
       
      }

      const handleLogOut = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("items");
        navigate("/");
      }
      

    const handleDiscount = (event)=>{
        const value = event.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setDiscount(value);
    }
}
    const handleUptoAmunt = (event)=>{
        const value = event.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setUpToAmount(value);
    }
}
    const handleTax = (event)=>{
        const value = event.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setTax(value);
    }
}
    const handleMaxDiscountPrice = (event)=>{
        const value = event.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setMaxDiscountPrice(value);
    }
}

const upadeMangeDiscount = async ()=>{
  
    const data = {
        "discount": discount,
        "upToAmount": upToAmount,
        "tax": tax,  
        "maxDiscountPrice": maxDiscountPrice
    }

    const response = await axios.put(`http://localhost:8080/admin/adjusbill/${1}/update`,data);
    if (response.status === 200) {
        alert("Success Update");
        navigate("/admin");

    }
}

    return(
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
      <h2 className="k1">Manage Discount</h2>
    </div>

    <div class="card mx-5 mb-5 border border-secondary rounded-3">
                <h5 class="card-header card-header text-center fw-bold bg-secondary text-white">Manage</h5>
                <div class="card-body">
                    <form onSubmit={upadeMangeDiscount}>
                        <label className="form-label">
                            Discount(%)
                        </label>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" onChange={handleDiscount} value={discount} placeholder="Discount" required />
                        </div>
                        
                        <label className="form-label">
                            Up to Amount(Rs)
                        </label>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" onChange={handleUptoAmunt} value={upToAmount} placeholder="Up to Amount" required />
                        </div>

                        <label className="form-label">
                            Tax(%) 
                        </label>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" onChange={handleTax} value={tax} placeholder="Tax" required />
                        </div>

                        <label className="form-label">
                            Max Discount(Rs)
                        </label>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" onChange={handleMaxDiscountPrice} value={maxDiscountPrice} placeholder="Max Discount" required />
                        </div>
                        

                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>

                </div>
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
    )
}

export default ManageDiscount;