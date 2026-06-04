const authMiddleware = (req, res, next) => {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized: Please log in' });
    }
};

const adminMiddleware = (req, res, next) => {
    if (req.session && req.session.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
};

const doctorMiddleware = (req, res, next) => {
    if (req.session && req.session.role === 'doctor') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Doctor access required' });
    }
};

const doctorOrAdminMiddleware = (req, res, next) => {
    if (req.session && (req.session.role === 'doctor' || req.session.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Doctor or Admin access required' });
    }
};

module.exports = { authMiddleware, adminMiddleware, doctorMiddleware, doctorOrAdminMiddleware };
