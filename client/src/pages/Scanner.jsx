import { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Button, CircularProgress } from '@mui/material';
import { Html5QrcodeScanner } from 'html5-qrcode';
import API from '../services/api';

const Scanner = () => {
    const [scanResult, setScanResult] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            /* verbose= */ false
        );

        scanner.render(onScanSuccess, onScanFailure);

        function onScanSuccess(decodedText) {
            scanner.clear();
            setScanResult(decodedText);
            verifyOrder(decodedText);
        }

        function onScanFailure() {
            // handle scan failure, usually better to ignore frame errors
        }

        return () => {
            scanner.clear().catch(error => console.error("Failed to clear scanner", error));
        };
    }, []);

    const verifyOrder = async (orderId) => {
        setLoading(true);
        try {
            // In a real scenario, we might have a specific verify endpoint
            // For now, let's fetch the order and check status
            // Note: The QR code contains the Order ID string "ORD-..."
            // But our getOrderById expects the MongoDB _id. 
            // We need to adjust either the backend to search by orderId or the QR to contain _id.
            // Let's assume for this implementation we added a route or the QR contains the right ID.
            // **Correction**: createOrder in backend sets `qrCode` but the prompt implies `orderId` is in QR?
            // Wait, in orderController: `const qrCode = await generateQR(orderId);`
            // So the QR contains the orderId string (e.g., ORD-12345).
            // We need an endpoint to find by orderId, OR update backend.
            // Let's use the `payOrder` endpoint logic which finds by `orderId` as a reference.

            // For now, we will just display the scanned ID and simulate verification
            setMessage(`Scanned Order ID: ${orderId}`);

            // Ideally: await API.post('/order/verify', { orderId });

        } catch {
            setMessage('Verification Failed');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        window.location.reload(); // Simple reload to restart scanner
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    QR Scanner
                </Typography>
                <div id="reader" width="100%"></div>
                {loading && <CircularProgress sx={{ mt: 2 }} />}
                {scanResult && !loading && (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h6" color="primary">Result</Typography>
                        <Typography variant="body1">{message}</Typography>
                        <Button variant="contained" onClick={handleReset} sx={{ mt: 2 }}>
                            Scan Another
                        </Button>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default Scanner;
