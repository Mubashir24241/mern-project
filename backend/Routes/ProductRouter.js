const express = require('express');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const ensureAuthenticated = require('../Middlewares/Auth');

const router = express.Router();

// Route to generate QR code with user details
router.get('/generate-qr', ensureAuthenticated, async (req, res) => {
    try {
        const user = req.user;
        console.log('---- logged in user detail ---', user);

        // Create a token with user details
        const token = jwt.sign({ name: user.name, email: user.email }, 'your_secret_key');

        // Generate QR code
        const qrCodeDataUrl = await QRCode.toDataURL(token);

        res.status(200).json({
            qrCode: qrCodeDataUrl,
            message: 'QR code generated successfully'
        });
    } catch (error) {
        console.error('Error generating QR code', error);
        res.status(500).json({ message: 'Error generating QR code' });
    }
});

module.exports = router;
