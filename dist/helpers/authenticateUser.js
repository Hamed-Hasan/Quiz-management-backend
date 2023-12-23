"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jwtHelpers_1 = require("./jwtHelpers");
const authenticateUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('Invalid or missing token');
        }
        const token = authHeader.split(' ')[1];
        const decodedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, 'quiz-app');
        // Log the userId for debugging
        console.log('Authenticated User ID:', decodedToken.userId);
        req.user = decodedToken;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
exports.authenticateUser = authenticateUser;
