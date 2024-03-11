import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { data, event } from "jquery";
import { useEffect, useState } from "react";


const UpadateItem = () => {
    const [name, setname] = useState("");
    const [discriptin, setDiscription] = useState("");
    const [qty, setQty] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [originalPrice, setOriginalPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [category, setCategory] = useState(null);
    const { id } = useParams();
    const [itemById, setItemById] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getItemById();
        getAllCategory();
    }, []);

    useEffect(() => {
        setInput();
    }, [itemById]);


    const setInput = () => {
        if (itemById) {
            setname(itemById.name);
            setDiscription(itemById.discription);
            setQty(itemById.qty);
            setPurchasePrice(itemById.purchasePrice);
            setOriginalPrice(itemById.originalPrice);
            setDiscount(itemById.discount);
            setCategoryId(itemById.itemCategoryEntity.id);
        }
    };





    const getItemById = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/user/item/${id}`)
            setItemById(response.data);



        } catch (error) {

        }
    }


    const getAllCategory = async () => {
        const response = await axios.get("http://localhost:8080/auth/category");
        setCategory(response.data);
    }

    const hadleName = (event) => {

        setname(event.target.value);
    }
    const hadleDiscription = (event) => {
        setDiscription(event.target.value);
    }
    const hadleQty = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {         //hadle int value only
            setQty(value);
        }
    }

    const handleLogOut = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("items");
        navigate("/");
      }
      
    const hadlePurchasePrice = (event) => {
        // Validate if the input is a valid double value
        const value = event.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setPurchasePrice(value);
        }
    }
    const hadleOriginalPrice = (event) => {
        // Validate if the input is a valid double value
        const value = event.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setOriginalPrice(value);
        }
    }
    const hadleDiscount = (event) => {
        // Validate if the input is a valid double value
        const value = event.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setDiscount(value);
        }
    }
    const hadleCategoryId = (event) => {
        setCategoryId(event.target.value);
    }

    const hadleUpdateItem = async (event) => {
        event.preventDefault();
        data = {
            "name": name,
            "discription": discriptin,
            "qty": qty,

            "purchasePrice": purchasePrice,
            "originalPrice": originalPrice,
            "discount": discount,
            "categoryId": categoryId
        };
        const response = await axios.put(`http://localhost:8080/admin/item/${id}/update`, data);
        if (response.status === 200) {
            alert("Success Update Item");
            // setname("");
            // setDiscription("");
            // setQty("");
            // setPurchasePrice("");
            // setOriginalPrice("");
            // setDiscount("");

            navigate("/admin/items");

        }
    }

    const deleteItem = async()=>{

        const response = await axios.delete(`http://localhost:8080/admin/item/${id}/delete`);
        if (response.status === 200) {
            alert("Success Delete Item");
            // setname("");
            // setDiscription("");
            // setQty("");
            // setPurchasePrice("");
            // setOriginalPrice("");
            // setDiscount("");

            navigate("/admin/items");

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
                <h2 className="k1">Manage Items</h2>
            </div>

            <div class="card mx-5 mb-5 border border-secondary rounded-3">
                <h5 class="card-header card-header text-center fw-bold bg-secondary text-white">Update Item</h5>
                <div class="card-body">
                    <form onSubmit={hadleUpdateItem}>
                        <label className="form-label">
                            Name
                        </label>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" onChange={hadleName} value={name} required />
                        </div>
                        <label className="form-label">
                            Description
                        </label>
                        <div className="form-group mb-3">
                            <textarea className="form-control" onChange={hadleDiscription} value={discriptin} placeholder="Item Description" rows="2" required />
                        </div>
                        <label className="form-label">
                            Qty
                        </label>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" onChange={hadleQty} value={qty} placeholder="Quantity" required />
                        </div>
                        <label className="form-label">
                            Purchase Price (Rs)
                        </label>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" onChange={hadlePurchasePrice} value={purchasePrice} placeholder="Purchase Price" required />
                        </div>
                        <label className="form-label">
                            Original Price (Rs)
                        </label>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" onChange={hadleOriginalPrice} value={originalPrice} placeholder="Original Price" required />
                        </div>
                        <label className="form-label">
                            Discount Price (Rs)    
                        </label>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" onChange={hadleDiscount} value={discount} placeholder="Discount Price" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <select className="form-select" onChange={hadleCategoryId} value={categoryId}>
                                <option>Select Category</option>
                                {category &&
                                    category.map((cate) => (
                                        <option key={cate.id} value={cate.id}>
                                            {cate.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="card-body d-flex justify-content-between flex-column">
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>


                    </form>
                    <div className="card-body d-flex justify-content-between flex-column">
                        <button type="button" className="btn btn-danger mt-3" onClick={deleteItem}>Delete</button>
                    </div>



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
export default UpadateItem;