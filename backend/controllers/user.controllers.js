import Auth from "../models/auth.models.js";

export const getUserProfile = async(request, response) => {
    try {
        const {username} = request.params;

        const user = await Auth.findOne({username}).select('-password');


        if(!user){
            return response.status(404).json({message: "User not found"})
        }

        response.status(200).json(user);
    } catch (error) {
        console.log("Error in the getUserProfile controller", error.message);
        return response.status(500).json({error: "Internal server error"})
    }
}



export const followUnfollowUser = async(request, response) => {
    try {
        const {id} = request.params;

        const userToModify = await Auth.findById(id);
        const currentUser = await UserActivation.findById(request.user._id);


        if(id === request.user._id){
            return response.status(400).json({error: "You can't follow yourself"})
        }
    } catch (error) {
        console.log("Error in the followUnfollowUser controller", error.message);
        return response.status(500).json({error: "Internal server error"})
    }
}