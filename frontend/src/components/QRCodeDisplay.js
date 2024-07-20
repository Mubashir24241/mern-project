import axios from 'axios';
import React, { useState, useEffect } from 'react';

const QRCodeDisplay = () => {
    const [qrCode, setQrCode] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchQRCode = async () => {
            try {
                const response = await axios.get('/generate-qr', { withCredentials: true });
                setQrCode(response.data.qrCode);
                setMessage(response.data.message);
            } catch (error) {
                console.error('Error fetching QR code', error);
                setMessage('Error fetching QR code');
            }
        };

        fetchQRCode();
    }, []);

    return (
        <div>
            <h1>{message}</h1>
            {qrCode && <img src={qrCode} alt="QR Code" />}
        </div>
    );
};

export default QRCodeDisplay;
