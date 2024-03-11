import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoutes = () => {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    if(!token){
        navigate("//auth/login");
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
    return <Outlet /> // set child eliment

}
export default ProtectedRoutes;