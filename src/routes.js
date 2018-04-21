const express = require('express');
const router = express.Router();

const firebaseMiddleware = require('express-firebase-middleware');

router.use((req, res, next) => {
    next();
});

router.use('/api', firebaseMiddleware.auth);

router.get('/', (req, res) => {
    res.json({
        message: 'Home'
    });
});


module.exports = router;

