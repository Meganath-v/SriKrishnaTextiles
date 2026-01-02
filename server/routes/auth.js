const express = require('express');
const router = express.Router();
// In a real app, use bcrypt and database. For this demo/MVP, we use env or simple check.
// Using simple token generation.

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Simple hardcoded admin for demo purposes as requested in prompt "Special Admin Route"
    if (username === 'admin' && password === 'admin123') {
        // Generate a simple dummy token or use JWT if I had installed jsonwebtoken.
        // I haven't installed jsonwebtoken. I will just return a success flag and "token".
        return res.status(200).json({
            token: 'admin-token-12345',
            user: { role: 'admin' }
        });
    }

    // Customer login (optional based on prompt)
    if (username === 'customer') {
        return res.status(200).json({
            token: 'customer-token-54321',
            user: { role: 'customer' }
        });
    }

    res.status(401).json({ message: 'Invalid Credentials' });
});

module.exports = router;
