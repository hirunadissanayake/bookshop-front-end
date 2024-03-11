import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const[username,setUsername] = useState(null);
    const[password,setPassword] = useState(null);
    

    const navigate = useNavigate();

    const handleUsername = (event) =>{
        setUsername(event.target.value);
    }

    const handlePassword = (event)=>{
        setPassword(event.target.value);
    }

    
    const handleLogin = async (event) => {
        event.preventDefault();
    
        const data = {
            "userName": username,
            "password": password,
        };
    
        try {
            // After successful login
const response = await axios.post("http://localhost:8080/auth/loging", data);

if (response.status === 200) {
    // Store the token in local storage
    localStorage.setItem("token", response.data);

    // Make a separate request to fetch user information
    const userResponse = await axios.get(`http://localhost:8080/auth/${username}`);
    console.log(userResponse);

    // Store the user information in local storage
    localStorage.setItem("user", JSON.stringify(userResponse.data));

    if (userResponse.data.userCategoryEntity.id === 2) {
        navigate("/Home");
    }

    if (userResponse.data.userCategoryEntity.id === 1) {
        navigate("/admin");
    }

}

             else {
                
                console.log("Failed login");
                alert("Wrong userName or Password")
                window.location.reload();

            }
        } catch (error) {
            console.error("Error during login:", error);
           
            alert("Wrong userName or Password")
            window.location.reload();
        }
    };
    

return(
    <>
     <nav class="n1 navbar bg-dark border-bottom border-body mb-5" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src='/image/logo.png' alt="Logo" width="300" height="100" class="d-inline-block align-text-top" />

                    </a>
                    <p className='p1 text-center mx-auto'>A Haven for Book Lovers</p>

                </div>
            </nav>

    <div className="loging-box">
        <div className="text-center mt-5 mb-5">
            <h1>Login</h1>
        </div>

       <div className="login-box mx-auto mt-5 mb-3" style={{ maxWidth: "400px" }}>
            <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        onChange={handleUsername}
                        placeholder="UserName"
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

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
        
    </div>
    <div className="text-center mb-5 fw-bold">
    <Link className="mx-4 text-decoration-none " to={"/auth/register_user"}>Register For Users</Link>
    <Link className="mx-4 text-decoration-none "to={"/auth/register_admin"}>Register For Admin</Link>
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

export default Login;