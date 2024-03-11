import axios from "axios";
import { event } from "jquery";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const AdminRegister = ()=>{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [addres,setAddres] = useState("");


    const navigate = useNavigate();

    const handleUsername = (event)=>{
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleEmail = (event) => {
       setEmail(event.target.value);
    }
    const hadleAddres = (event)=>{
        setAddres(event.target.value);
    }

    const handleRegister = async(event) => {
        event.preventDefault();
        const data = {
            "userName": username,
            "email": email,
            "password": password,
            "address": addres,
            "userCategoryId":1
        };

        try{

        const response = await axios.post("http://localhost:8080/auth/rgister", data);

        console.log(response);

        if (response.status === 200){
            
            alert("Success Register");
            navigate("/auth/login");
        }else{
            alert("Register Failed");
            window.location.reload();

        }}catch(error){
            alert("Register Faild");
            setUsername(" ");
            setPassword("");
            setEmail(" ");
            setAddres("");
            //window.location.reload();
        }

    }
    return(
        <>
         <nav class="n1 navbar bg-dark border-bottom border-body mb-5" data-bs-theme="dark">
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
    <div className="loging-box mx-auto mt-5" style={{ maxWidth: "400px" }}>
    <div className="text-center mb-4">
        <h1>Admin Register</h1>
    </div>

    <form onSubmit={handleRegister} className="mb-5">
        <div className="form-group mb-3">
            <input
                type="text"
                className="form-control"
                onChange={handleUsername}
                placeholder="Username"
                value={username}
                required
            />
        </div>

        <div className="form-group mb-3">
            <input
                type="password"
                className="form-control"
                onChange={handlePassword}
                placeholder="Password"
                value={password}
                required
            />
        </div>

        <div className="form-group mb-3">
            <input
                type="email"
                className="form-control"
                onChange={handleEmail}
                placeholder="Email Address"
                value={email}
                required
               
            />
        </div>

        <div className="form-group mb-3">
            <textarea
                className="form-control"
                onChange={hadleAddres}
                value={addres}
                placeholder="Address"
                rows="2"
                required
            />
        </div>

        <button type="submit" className="btn btn-primary">
            Register
        </button>
    </form>
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

export default AdminRegister;