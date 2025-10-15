import jwt from "jsonwebtoken";

// Generate JWT (stateless auth)
export const generateToken = (userId, res) => {
    // Generate JSON Web Token
    const token = jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    );

    // Send JWT token in cookies
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,    // 7 days
        httpOnly: true,                     // Prevent cross-site scripting (XSS) attacks
        sameSite: "strict",                 // Prevent Cross-Site Request Forgery (CSRF) attacks
        secure: process.env.NODE_ENV !== "development" // Uses HTTPS only in production
    });

    return token;
}