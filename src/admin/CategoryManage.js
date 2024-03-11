import axios from "axios";
import { event } from "jquery";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CategoryManage = ()=>{
    const [catName,setCatnName] = useState("");
    const [category, setCategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getAllCategory();
        
        
      }, [])

    const handleCatName = (event)=>{
        setCatnName(event.target.value);
    }

    const handleLogOut = ()=>{
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("items");
      navigate("/");
    }
    

    const handeleAdd = async(event)=>{
        event.preventDefault();
        const data = { "name":catName};
        const response = await axios.post("http://localhost:8080/admin/category",data);
        console.log(response);
        if(response.status===200){
                alert("Success Add Category");
                setCatnName("");
                window.location.reload();

        }
    }
    const getAllCategory = async () => {
        const response = await axios.get("http://localhost:8080/auth/category");
        setCategory(response.data);
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
      <h2 className="k1">Manage Categories</h2>
    </div>

    <div class="card mx-5 mb-5 border border-secondary rounded-3">
  <h5 class="card-header card-header text-center fw-bold bg-secondary text-white">Add Category</h5>
  <div class="card-body">
    <form onSubmit={handeleAdd}>
    <label  className="form-label">
      Name
    </label>
    <div className="form-group mb-3">
            <input type="text" className="form-control" onChange={handleCatName} value={catName} placeholder="Category Name"  required/>
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
    </form>
  </div>
</div>

<div class="card mx-auto mb-5 w-50 border border-danger rounded-3">
  <div class="card-header text-center fw-bold bg-danger text-white">
    Categories
  </div>
  <div class="card-body bg-light">
    <blockquote class="blockquote mb-0">
      <ul class="list-group">
        {category && category.map((cat) => (
          <li class="list-group-item">{cat.name}</li>
        ))}
      </ul>
    </blockquote>
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

export default CategoryManage;