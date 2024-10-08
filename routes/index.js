const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const thoughtRoutes = require('./api/thoughtRoutes');

// Add prefix of `/api/users` to user routes
router.use('/api/users', userRoutes);

// Add prefix of `/api/thoughts` to thought routes
router.use('/api/thoughts', thoughtRoutes);

module.exports = router;
