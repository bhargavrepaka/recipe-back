import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const authCheck = async (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ success: false, message: 'Authorization token missing' });
    }

    try {
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRECT);
        const user = await User.findById(decodedToken.userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

export default authCheck;
