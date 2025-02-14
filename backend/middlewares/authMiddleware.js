const jwt = require('jsonwebtoken');
const User = require('../models/auth');

const protect = async (req, res, next) => {
    let token;

    // Check if the Authorization header is present and starts with "Bearer"
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Extract token from the Authorization header
            token = req.headers.authorization.split(' ')[1];

            // Verify the JWT token using the secret key
            const decoded = jwt.verify(token, '133a889e51573dae5d1f527089e91a3c3c4d547490c4e762bd6a3416905a11c811e8c93bdf9a2cac853ae8c6ed89890deff99826d67b469d758667bc26d9df45');  // Replace with your actual JWT secret key

            // Fetch the user from the database using Sequelize
            const user = await User.findOne({
                where: { id: decoded.id },  // Find user by the decoded ID from the JWT
            });

            // If user is found, attach user details to the request object
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            req.user = user;  // Attach user to request
            next();  // Call next middleware function
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // If there is no token provided
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
