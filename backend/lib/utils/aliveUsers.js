import Auth from "../../models/auth.models.js"

const aliveUsers = async() => {
    try {
        const users = await Auth.find({});
        return users;
    } catch (error) {
        console.log("There are no users yet!, error in the aliveUsers utils", error.message);
    }
}

export default aliveUsers;