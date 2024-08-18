import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, response) => {
    try {
        const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
            expiresIn: '15d',
        });

        response.cookie("remember_me", token, {
            maxAge: 15*24*60*60*1000,
            httpOnly: true,
            samesite: "strict",
            secure: process.env.NODE_ENV !== "development"
        })
    } catch (error) {
        console.log("Error in the generateToken utility function")
    }
}

export default generateTokenAndSetCookie;