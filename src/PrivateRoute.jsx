import { useContext } from "react";
import { AuthContext } from "./provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { BounceLoader } from "react-spinners";

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location  = useLocation()

    if(user && !user.emailVerified){
        return <Navigate to='/verify-email' replace />
    }
    if(loading){
        return <div className="h-screen w-screen grid place-items-center"><BounceLoader size={100} color="#6d28d9" /></div>
    }
    if(user && user.emailVerified){
        return children
    }
    return <Navigate to='/login' state={location} replace></Navigate>
};

export default PrivateRoute;