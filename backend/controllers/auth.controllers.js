import aliveUsers from "../lib/utils/aliveUsers.js";
import generateTokenAndSetCookie from "../lib/utils/generateTokenAndSetCookie.js";
import Auth from "../models/auth.models.js";
import bcrypt from 'bcryptjs';

export const postSignup =  async(request, response) => {
    try {
        const {username, password, fullname, email} = request.body;
console.log(username, password, fullname, email)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return response.status(400).json({error: "Invalid email format"})
        }
        const usernameExists = await Auth.findOne({username});

        if(usernameExists){
            return response.status(400).json({error: "Username already exists"});
        }



        const emailExists = await Auth.findOne({email});

        if(emailExists){
            return response.json({error: "Email is associated with a differnt account"})
        }

        if(password.length < 6){
            return response.status(400).json({error: "Password must be atleast 6 characters"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new Auth({
            username,
            fullname, 
            email,
            password: hashedPassword
        })

        
        if(newUser){
            await newUser.save();
            return response.status(201).json({
                username: newUser.username,
                password: newUser.password,
                fullname: newUser.fullname,
                email: newUser.fullname
            })
        }else{
            return response.status(400).json({message: "Can't signup with this details"})
        }

    } catch (error) {
        console.log("Error in the postSignup controller", error.message);
        return response.status(500).json({error: "Internal server issue"})
    }
}


export const postLogin =  async(request, response) => {
    try {
        const {username, password} = request.body;
        const availableUsers = await aliveUsers();
        const userExists = availableUsers.find(x => x?.username === username || x?.email === username);
        //need to look into this
        if(!userExists){
            return response.status(401).json({error: "Invalid username or email"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, userExists.password);

        if(!isPasswordCorrect){
            return response.status(400).json({error: "Password is incorrect"})
        }

        generateTokenAndSetCookie(userExists._id, response);

        return response.status(200).json({
            username: userExists.username,
            fullname: userExists.fullname,
            email: userExists.email
        })

    } catch (error) {
        console.log(error);
        return response.status(500).json("Inetrnal server error");        
    }
}


export const postLogout =  (request, response) => {
    try {
        response.cookie("remember_me", "", {maxAge: 0})
        response.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller", error.message)
    }
}

export const getMe = async(request, response) => {
    try {
        const user = await Auth.findById(request.user._id).select("-password");
        return response.status(200).json(user)
    } catch (error) {
        console.log("Error in the getMe controller", error.message);
        return response.status(500).json({error: "Internal server error"})        
    }
}