import { Navigate } from 'react-router-dom';
import { isExpired, decodeToken } from "react-jwt";

export { PrivateRoute };



function PrivateRoute({ children }) {




    const user = localStorage.getItem("token")

if(user){
    const isMyTokenExpired = isExpired(user);
    if(isMyTokenExpired===true){
        localStorage.removeItem("token")
        return <Navigate to="/register"  />
    }else{
        return children;
    }

    
}
    
    if (!user) {
        // not logged in so redirect to login page with the return url
    
        alert("login first")
 

        return <Navigate to="/register"  />

    }

    // authorized so return child components
    return children;
}