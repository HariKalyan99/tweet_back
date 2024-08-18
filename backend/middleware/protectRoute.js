import jwt from 'jsonwebtoken'
import Auth from '../models/auth.models.js';


const protectRoute = async(request, response, next) => {
    try {
        const token = request.cookies.remember_me;

        if(!token){
            return response.status(401).json({error: "Unauthorized: No token provided"})
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        if(!decoded){
            return response.status(401).json({error: "Unauthorized: Invalid Token"})
        }


        const user = await Auth.findById(decoded.userId).select("-password");

        if(!user){
            return response.status(404).json({error: "User not found"})
        }

        request.user = user;

        next();
    } catch (error) {
        console.log("Error in the protectRoute middleware", error.message);
        return response.status(500).json({error: "Internal server error"})
    }
}


export default protectRoute;