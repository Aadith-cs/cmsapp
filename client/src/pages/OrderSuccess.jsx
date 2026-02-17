import { useEffect, useState } from 'react';
import { Container, Paper, Typography, Box, CircularProgress, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

const OrderSuccess = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await API.get(`/order/${id}`);
                setOrder(data);
            } catch (error) {
                console.error('Failed to fetch order:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    if (loading) {
        return (
            <Container sx={{ mt: 4, textAlign: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!order) {
        return (
            <Container sx={{ mt: 4, textAlign: 'center' }}>
                <Typography color="error">Order not found.</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h4" color="success.main" gutterBottom>
                    Order Placed Successfully!
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Order ID: {order.orderId}
                </Typography>

                <Box sx={{ my: 4 }}>
                    <img src={order.qrCode} alt="Order QR Code" style={{ width: 250, height: 250 }} />
                    <Typography variant="caption" display="block">
                        Scan this QR code at the counter to collect your order.
                    </Typography>
                </Box>

                <Button variant="outlined" onClick={() => navigate('/')}>
                    Back to Home
                </Button>
            </Paper>
        </Container>
    );
};

export default OrderSuccess;
